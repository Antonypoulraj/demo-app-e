"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

import { ArrowLeft, Plus, Edit, Trash2, Search, BarChart3, Factory, X, Upload } from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface ProductionRecord {
  id: string;
  date: string;
  shift: string;
  componentName: string;
  projectName: string;
  totalMachinedQuantity: number;
  totalFinishedQuantity: number;
  totalRejectionQuantity: number;
  rejectionReason: string;
  operatorName: string;
}

const ProductionPortal = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [records, setRecords] = useState<ProductionRecord[]>([]);

  const totalQuantity = records.reduce((sum, r) => sum + r.totalMachinedQuantity, 0);
  const totalFinished = records.reduce((sum, r) => sum + r.totalFinishedQuantity, 0);
  const totalRejected = records.reduce((sum, r) => sum + r.totalRejectionQuantity, 0);

  const shiftData = [
    { name: "Shift 1", machined: 0, finished: 0, rejected: 0 },
    { name: "Shift 2", machined: 0, finished: 0, rejected: 0 },
  ];

  const rejectionData = [
    { name: "Surface finishing", value: 0, color: "#ef4444" },
    { name: "Inner diameter finishing", value: 0, color: "#f59e0b" },
    { name: "Hole chipped", value: 0, color: "#3b82f6" },
    { name: "Tool Broken", value: 0, color: "#10b981" },
  ];

  const productionTrendData = [
    { date: "2024-05-20", machined: 0, finished: 0, rejected: 0 },
    { date: "2024-05-21", machined: 0, finished: 0, rejected: 0 },
    { date: "2024-05-22", machined: 0, finished: 0, rejected: 0 },
    { date: "2024-05-23", machined: 0, finished: 0, rejected: 0 },
    { date: "2024-05-24", machined: 0, finished: 0, rejected: 0 },
  ];

  const filteredRecords = records.filter(
    record =>
      record.componentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.operatorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.shift.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (record: ProductionRecord) => {
    router.push(`/production/add?edit=true&id=${record.id}`);
    // Optional: Store in state or global context if needed
  };

  const handleDelete = (id: string) => {
    setRecords(prev => prev.filter(r => r.id !== id));
    toast({
      title: "Record Deleted",
      description: "Production record has been removed.",
    });
  };

  const clearSearch = () => setSearchTerm("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (allowedTypes.includes(file.type)) {
      toast({
        title: "File Uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });
      console.log("File uploaded:", file);
    } else {
      toast({
        title: "Invalid File Type",
        description: "Please upload only PDF, DOC, or Excel files.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.push("/dashboard")} className="p-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="font-times text-xl font-bold text-gray-800">Production Portal</h1>
            </div>
            <div className="text-right">
              <p className="font-times text-sm font-medium text-gray-800">{user?.username}</p>
              <p className="font-times text-xs text-gray-500 capitalize">{user?.role} Account</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="records" className="space-y-6">
          <TabsList className="font-times">
            <TabsTrigger value="records">Production Records</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Table View */}
          <TabsContent value="records" className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search records..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="pl-10 pr-10 font-times"
                  />
                  {searchTerm && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearSearch}
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              <Button onClick={() => router.push("/production/add")} className="font-times">
                <Plus className="h-4 w-4 mr-2" />
                Add New Record
              </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Reuse your existing cards here */}
              {/* ... */}
            </div>

            {/* Records Table */}
            <Card>
              <CardHeader>
                <CardTitle className="font-times">
                  Production Records ({filteredRecords.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Table rendering logic stays the same */}
                {/* ... */}
                <div className="flex justify-end mt-4">
                  <div className="flex items-center gap-3">
                    <span className="font-times text-sm text-gray-600">Upload File:</span>
                    <Label htmlFor="file-upload" className="cursor-pointer">
                      <Button variant="outline" size="sm" className="font-times">
                        <Upload className="h-4 w-4 mr-2" />
                        Choose File
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
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Charts and trends */}
              {/* ... */}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ProductionPortal;
