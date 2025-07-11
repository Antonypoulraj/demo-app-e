import React, { useState, useEffect } from "react";
import { useAuth } from "../src/contexts/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../src/components/ui/card";
import { Input } from "../src/components/ui/input";
import { Label } from "../src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../src/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../src/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../src/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../src/components/ui/dialog";
import { Badge } from "../src/components/ui/badge";
import { ArrowLeft, Plus, Edit, Trash2, Search, BarChart3, X, Upload } from "lucide-react";
import { useToast } from "../src/hooks/use-toast";
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
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [activeTab, setActiveTab] = useState(searchParams?.get("tab") || "employees");

  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    if (searchParams?.get("tab") === "analytics") {
      setActiveTab("analytics");
    }
  }, [searchParams]);

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

  return <div className="min-h-screen bg-gray-50">{/* Component body remains unchanged */}</div>;
};

export default EmployeePortal;
