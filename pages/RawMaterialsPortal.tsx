"use client";

import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
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
import { Badge } from "../src/components/ui/badge";
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Search,
  Package,
  AlertTriangle,
  CheckCircle,
  X,
  Upload,
} from "lucide-react";
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
  PieChart,
  Pie,
  Cell,
} from "recharts";

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

  const statuses = ["In Stock", "Low Stock", "Out of Stock"];

  const filteredMaterials = materials.filter(material => {
    const matchesSearch =
      material.materialName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.specification.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.supplierName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || material.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (material: RawMaterial) => {
    router.push(`/rawmaterials/add?edit=true&id=${material.id}`);
  };

  const handleDelete = (id: string) => {
    setMaterials(materials.filter(material => material.id !== id));
    toast({
      title: "Material Deleted",
      description: "Raw material has been removed from inventory.",
    });
  };

  const clearSearch = () => {
    setSearchTerm("");
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
          description: `${file.name} has been uploaded successfully and data populated.`,
        });
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload only PDF, DOC, or Excel files.",
          variant: "destructive",
        });
      }
    }
  };

  const statusData = [
    {
      name: "In Stock",
      count: materials.filter(m => m.status === "In Stock").length,
      color: "#10b981",
    },
    {
      name: "Low Stock",
      count: materials.filter(m => m.status === "Low Stock").length,
      color: "#f59e0b",
    },
    {
      name: "Out of Stock",
      count: materials.filter(m => m.status === "Out of Stock").length,
      color: "#ef4444",
    },
  ];

  const supplierData = materials.reduce(
    (acc, material) => {
      const existing = acc.find(item => item.name === material.supplierName);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({ name: material.supplierName, count: 1 });
      }
      return acc;
    },
    [] as { name: string; count: number }[]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.push("/dashboard")} className="p-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="font-times text-xl font-bold text-gray-800">Raw Materials Portal</h1>
            </div>
            <div className="text-right">
              <p className="font-times text-sm font-medium text-gray-800">{user?.username}</p>
              <p className="font-times text-xs text-gray-500 capitalize">{user?.role} Account</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {/* ...keep all UI content the same as your original, no changes needed... */}
    </div>
  );
};

export default RawMaterialsPortal;
