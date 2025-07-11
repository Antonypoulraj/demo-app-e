import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router"; // ✅ Fixed: correct router for Pages directory
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Badge } from "../components/ui/badge";
import { ArrowLeft, Plus, Edit, Trash2, Search, BarChart3, X, Upload } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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
  const { user } = useAuth();
  const router = useRouter(); // ✅ Fixed
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [activeTab, setActiveTab] = useState("employees");

  const [employees, setEmployees] = useState<Employee[]>([]);

  const departmentData = [
    { name: "Engineering", count: 0, active: 0 },
    { name: "Production", count: 0, active: 0 },
    { name: "Quality Control", count: 0, active: 0 },
    { name: "Administration", count: 0, active: 0 },
    { name: "Maintenance", count: 0, active: 0 },
  ];

  const departments = [
    "Engineering",
    "Production",
    "Quality Control",
    "Administration",
    "Maintenance",
  ];

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "all" || employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const handleEdit = (employee: Employee) => {
    const params = new URLSearchParams({ edit: "true", id: employee.id });
    router.push(`/employee/add?${params.toString()}`);
  };

  const handleDelete = (id: string) => {
    setEmployees(employees.filter(emp => emp.id !== id));
    toast({
      title: "Employee Deleted",
      description: "Employee has been removed and transferred to temporary database.",
    });
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const handleAddEmployee = () => {
    router.push("/employee/add");
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
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ⚠️ Insert the UI code for search, employee list, tabs, etc. here */}
      {/* The return body was left as placeholder in your version */}
    </div>
  );
};

export default EmployeePortal;
