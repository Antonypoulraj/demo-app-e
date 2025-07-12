"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Search,
  AlertTriangle,
  CheckCircle,
  X,
  Upload,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface RawMaterial {
  id: string;
  materialName: string;
  specification: string;
  grade: string;
  quantity: number;
  unit: string;
  supplierName: string;
  dateReceived: string;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

const RawMaterialsPortal = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [materials, setMaterials] = useState<RawMaterial[]>([]);

  const filteredMaterials = materials.filter(material => {
    const matchesSearch =
      material.materialName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.specification.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.supplierName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || material.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (material: RawMaterial) => {
    sessionStorage.setItem("edit_raw_material", JSON.stringify(material));
    router.push("/addrawmaterial?edit=true");
  };

  const handleDelete = (id: string) => {
    setMaterials(prev => prev.filter(material => material.id !== id));
    toast({
      title: "Material Deleted",
      description: "Raw material has been removed.",
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];

      if (allowedTypes.includes(file.type)) {
        const mockData: RawMaterial[] = [
          {
            id: "1",
            materialName: "Steel Rod",
            specification: "10mm diameter",
            grade: "Grade A",
            quantity: 100,
            unit: "pieces",
            supplierName: "Steel Works Ltd",
            dateReceived: "2024-06-01",
            status: "In Stock",
          },
          {
            id: "2",
            materialName: "Aluminum Sheet",
            specification: "2mm thickness",
            grade: "Grade B",
            quantity: 50,
            unit: "sheets",
            supplierName: "Metal Suppliers Inc",
            dateReceived: "2024-06-02",
            status: "Low Stock",
          },
        ];
        setMaterials(mockData);
        toast({
          title: "File Uploaded",
          description: `${file.name} uploaded successfully and data loaded.`,
        });
      } else {
        toast({
          title: "Invalid File Type",
          description: "Only PDF, Word, or Excel files are allowed.",
          variant: "destructive",
        });
      }
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "In Stock":
        return "default";
      case "Low Stock":
        return "secondary";
      case "Out of Stock":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "In Stock":
        return <CheckCircle className="h-4 w-4" />;
      case "Low Stock":
        return <AlertTriangle className="h-4 w-4" />;
      case "Out of Stock":
        return <X className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const statusChartData = [
    {
      name: "In Stock",
      value: materials.filter(m => m.status === "In Stock").length,
      color: "#10b981",
    },
    {
      name: "Low Stock",
      value: materials.filter(m => m.status === "Low Stock").length,
      color: "#f59e0b",
    },
    {
      name: "Out of Stock",
      value: materials.filter(m => m.status === "Out of Stock").length,
      color: "#ef4444",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.push("/dashboard")} className="p-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-bold text-gray-800 font-times">Raw Materials Portal</h1>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800 font-times">{user?.username}</p>
              <p className="text-xs text-gray-500 capitalize font-times">{user?.role} Account</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs defaultValue="records" className="space-y-6">
          <TabsList className="font-times">
            <TabsTrigger value="records">Inventory</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="records" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name, spec, or supplier"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10 font-times"
                />
              </div>

              <div className="flex gap-2 items-center">
                <Button onClick={() => router.push("/addrawmaterial")} className="font-times">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Material
                </Button>
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <Button variant="outline" size="sm" className="font-times">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload File
                  </Button>
                </Label>
                <Input
                  id="file-upload"
                  type="file"
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="font-times">
                  Raw Materials ({filteredMaterials.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Spec</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Qty</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMaterials.map(material => (
                      <TableRow key={material.id}>
                        <TableCell>{material.materialName}</TableCell>
                        <TableCell>{material.specification}</TableCell>
                        <TableCell>{material.grade}</TableCell>
                        <TableCell>{`${material.quantity} ${material.unit}`}</TableCell>
                        <TableCell>{material.supplierName}</TableCell>
                        <TableCell>
                          <Badge
                            variant={getStatusBadgeVariant(material.status)}
                            className="flex items-center gap-1"
                          >
                            {getStatusIcon(material.status)}
                            {material.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="flex gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(material)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(material.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle className="font-times">Inventory Status Overview</CardTitle>
              </CardHeader>
              <CardContent style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {statusChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default RawMaterialsPortal;
