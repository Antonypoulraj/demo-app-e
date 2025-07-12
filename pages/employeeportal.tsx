"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../hooks/use-toast";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Card } from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

import { Plus, Edit, Trash2, Upload, Search, X } from "lucide-react";

interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  phone: string;
  joinDate: string;
  status: "Active" | "Inactive";
}

const EmployeePortal = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [activeTab, setActiveTab] = useState("employees");

  const departments = [
    "Engineering",
    "Production",
    "Quality Control",
    "Administration",
    "Maintenance",
  ];

  // Mock data (you can replace with API fetch)
  useEffect(() => {
    setEmployees([
      {
        id: "1",
        name: "Alice",
        email: "alice@example.com",
        department: "Engineering",
        position: "Engineer",
        phone: "1234567890",
        joinDate: "2023-01-01",
        status: "Active",
      },
      {
        id: "2",
        name: "Bob",
        email: "bob@example.com",
        department: "Production",
        position: "Technician",
        phone: "9876543210",
        joinDate: "2022-05-15",
        status: "Inactive",
      },
    ]);
  }, []);

  const filteredEmployees = employees.filter(emp => {
    const searchMatch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchTerm.toLowerCase());
    const deptMatch = selectedDepartment === "all" || emp.department === selectedDepartment;
    return searchMatch && deptMatch;
  });

  const chartData = departments.map(dept => {
    const deptEmployees = employees.filter(e => e.department === dept);
    const activeCount = deptEmployees.filter(e => e.status === "Active").length;
    return {
      department: dept,
      total: deptEmployees.length,
      active: activeCount,
    };
  });

  const handleEdit = (emp: Employee) => {
    const query = new URLSearchParams({ id: emp.id, edit: "true" });
    router.push(`/employee/add?${query.toString()}`);
  };

  const handleDelete = (id: string) => {
    setEmployees(employees.filter(e => e.id !== id));
    toast({
      title: "Deleted",
      description: "Employee removed from the record.",
    });
  };

  const handleAddEmployee = () => {
    router.push("/employee/add");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (allowed.includes(file.type)) {
      toast({ title: "Upload Success", description: file.name });
    } else {
      toast({
        title: "Invalid File Type",
        description: "Only PDF, DOCX, and Excel files are allowed.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold font-times text-gray-800">Employee Portal</h2>
        <div className="flex items-center gap-3">
          <Input
            placeholder="Search name, email or role"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-64"
          />
          {searchTerm && (
            <Button variant="ghost" size="icon" onClick={() => setSearchTerm("")}>
              <X className="w-4 h-4" />
            </Button>
          )}
          <Button onClick={handleAddEmployee}>
            <Plus className="w-4 h-4 mr-1" />
            Add Employee
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="employees">Employee List</TabsTrigger>
          <TabsTrigger value="chart">Analytics</TabsTrigger>
          <TabsTrigger value="upload">Upload File</TabsTrigger>
        </TabsList>

        <TabsContent value="employees">
          <div className="overflow-auto border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map(emp => (
                  <TableRow key={emp.id}>
                    <TableCell>{emp.name}</TableCell>
                    <TableCell>{emp.email}</TableCell>
                    <TableCell>{emp.department}</TableCell>
                    <TableCell>{emp.position}</TableCell>
                    <TableCell>
                      <Badge variant={emp.status === "Active" ? "default" : "destructive"}>
                        {emp.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Button size="sm" onClick={() => handleEdit(emp)}>
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(emp.id)}>
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="chart">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#8884d8" name="Total Employees" />
              <Bar dataKey="active" fill="#82ca9d" name="Active Employees" />
            </BarChart>
          </ResponsiveContainer>
        </TabsContent>

        <TabsContent value="upload">
          <div className="flex flex-col items-start gap-4">
            <Label>Upload HR Document (PDF, DOCX, Excel)</Label>
            <Input type="file" onChange={handleFileUpload} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployeePortal;
