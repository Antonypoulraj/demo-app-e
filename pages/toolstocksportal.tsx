"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Edit, Trash2, Search, Upload, X } from "lucide-react";

// Recharts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";

interface ToolStockRecord {
  id: string;
  toolName: string;
  toolId: string;
  category: string;
  quantity: number;
  location: string;
  status: "In Stock" | "Out of Stock" | "Reserved";
  lastUpdated: string;
  notes?: string;
}

interface StockRequest {
  id: string;
  toolName: string;
  toolId: string;
  quantity: number;
  requestDate: string;
  status: "Pending" | "Approved" | "Rejected";
}

const ToolStocksPortal = () => {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [toolStockRecords, setToolStockRecords] = useState<ToolStockRecord[]>([]);
  const [stockRequests, setStockRequests] = useState<StockRequest[]>([]);
  const [activeTab, setActiveTab] = useState(searchParams?.get("tab") || "stocks");

  useEffect(() => {
    const tab = searchParams?.get("tab");
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tabValue: string) => {
    setActiveTab(tabValue);
    const params = new URLSearchParams(searchParams?.toString());
    params.set("tab", tabValue);
    router.replace(`?${params.toString()}`);
  };

  const filteredRecords = toolStockRecords.filter(record => {
    const matchSearch =
      record.toolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.toolId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === "all" || record.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const clearSearch = () => setSearchTerm("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid File",
        description: "Please upload a PDF, DOC, or Excel file.",
        variant: "destructive",
      });
      return;
    }

    const mockData: ToolStockRecord[] = [
      {
        id: "1",
        toolName: "Hammer",
        toolId: "TOOL001",
        category: "Hand Tools",
        quantity: 20,
        location: "Warehouse A",
        status: "In Stock",
        lastUpdated: "2025-07-01",
        notes: "Standard hammer",
      },
      {
        id: "2",
        toolName: "Drill",
        toolId: "TOOL002",
        category: "Power Tools",
        quantity: 0,
        location: "Warehouse B",
        status: "Out of Stock",
        lastUpdated: "2025-07-02",
        notes: "Cordless drill",
      },
    ];

    setToolStockRecords(mockData);
    toast({
      title: "Upload Successful",
      description: `${file.name} processed and data populated.`,
    });

    event.target.value = "";
  };

  const handleEdit = (record: ToolStockRecord) => {
    const params = new URLSearchParams();
    params.set("edit", "true");
    params.set("id", record.id);
    router.push(`/addtoolstock?${params.toString()}`);
  };

  const handleDelete = (id: string) => {
    setToolStockRecords(toolStockRecords.filter(r => r.id !== id));
    toast({
      title: "Record Deleted",
      description: "Tool stock record has been removed.",
    });
  };

  const chartData = toolStockRecords.map(record => ({
    name: record.toolName,
    quantity: record.quantity,
  }));

  const pieData = [
    {
      name: "In Stock",
      value: toolStockRecords.filter(r => r.status === "In Stock").length,
    },
    {
      name: "Out of Stock",
      value: toolStockRecords.filter(r => r.status === "Out of Stock").length,
    },
    {
      name: "Reserved",
      value: toolStockRecords.filter(r => r.status === "Reserved").length,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="stocks">Tool Stocks</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="stocks">
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search tools..."
                className="pl-10 pr-10"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSearch}
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button onClick={() => router.push("/addtoolstock")}>Add Tool</Button>
              <Label htmlFor="upload">
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" /> Upload
                </Button>
              </Label>
              <Input id="upload" type="file" onChange={handleFileUpload} className="hidden" />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tool Inventory ({filteredRecords.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tool</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map(tool => (
                    <TableRow key={tool.id}>
                      <TableCell>{tool.toolName}</TableCell>
                      <TableCell>{tool.toolId}</TableCell>
                      <TableCell>{tool.quantity}</TableCell>
                      <TableCell>{tool.status}</TableCell>
                      <TableCell className="flex gap-2">
                        <Button size="sm" onClick={() => handleEdit(tool)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(tool.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests">
          <p>Stock request portal will be displayed here.</p>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Tool Quantity Overview</CardTitle>
              </CardHeader>
              <CardContent>
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="quantity" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-center text-gray-500">No data to display.</p>
                )}
              </CardContent>
            </Card>

            {/* Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                {toolStockRecords.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#6366f1"
                        label
                      />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-center text-gray-500">No status data available.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ToolStocksPortal;
