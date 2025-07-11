"use client";

import React, { useState } from "react";
import { useRouter } from "next/router"; // ✅ Fixed: use next/router for Pages Router
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

import { ArrowLeft, Plus, Search, X, Upload } from "lucide-react";

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

  const filteredRecords = records.filter(
    record =>
      record.componentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.operatorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.shift.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (record: ProductionRecord) => {
    router.push(`/production/add?edit=true&id=${record.id}`);
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

          {/* Production Records Tab */}
          <TabsContent value="records" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
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
              <Button onClick={() => router.push("/production/add")} className="font-times">
                <Plus className="h-4 w-4 mr-2" />
                Add New Record
              </Button>
            </div>

            {/* File Upload */}
            <div className="flex justify-end">
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

            {/* Production Table Placeholder */}
            {/* Replace with your <Table> component using filteredRecords */}
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-times">Production Trend</CardTitle>
                </CardHeader>
                <CardContent className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[]} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="machined" stroke="#8884d8" />
                      <Line type="monotone" dataKey="finished" stroke="#82ca9d" />
                      <Line type="monotone" dataKey="rejected" stroke="#ff6961" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-times">Rejection Reasons</CardTitle>
                </CardHeader>
                <CardContent className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={[]} dataKey="value" nameKey="name" outerRadius={80}>
                        {/* You can loop colors if needed */}
                        {/* <Cell fill="#ef4444" /> */}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ProductionPortal;
