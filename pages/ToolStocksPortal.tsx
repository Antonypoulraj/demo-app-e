import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../src/contexts/AuthContext";
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
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Search,
  BarChart3,
  X,
  PackagePlus,
  PackageSearch,
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
  LineChart,
  Line,
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

  const getTabParam = () => searchParams?.get("tab") || "stocks";

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(getTabParam());

  const [requestFormData, setRequestFormData] = useState({
    toolName: "",
    toolId: "",
    quantity: 0,
    requestDate: "",
  });

  const [toolStockRecords, setToolStockRecords] = useState<ToolStockRecord[]>([]);
  const [stockRequests, setStockRequests] = useState<StockRequest[]>([]);

  useEffect(() => {
    const tab = searchParams?.get("tab");
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const params = new URLSearchParams(searchParams?.toString());
    params.set("tab", value);
    router.replace(`?${params.toString()}`);
  };

  const stockStatusData = [
    { name: "In Stock", count: 120, percentage: 60 },
    { name: "Out of Stock", count: 50, percentage: 25 },
    { name: "Reserved", count: 30, percentage: 15 },
  ];

  const monthlyTrendData = [
    { month: "Jan", inStock: 110, outOfStock: 40 },
    { month: "Feb", inStock: 115, outOfStock: 35 },
    { month: "Mar", inStock: 120, outOfStock: 30 },
    { month: "Apr", inStock: 125, outOfStock: 25 },
    { month: "May", inStock: 130, outOfStock: 20 },
  ];

  const categoryOptions = [
    "Electronics",
    "Hand Tools",
    "Power Tools",
    "Measuring Tools",
    "Safety Gear",
  ];

  const filteredRecords = toolStockRecords.filter(record => {
    const matchesSearch =
      record.toolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.toolId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || record.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const resetRequestForm = () => {
    setRequestFormData({
      toolName: "",
      toolId: "",
      quantity: 0,
      requestDate: "",
    });
  };

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
        title: "Invalid file type",
        description: "Please upload only PDF, DOC, or Excel files.",
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
        quantity: 50,
        location: "Warehouse A",
        status: "In Stock",
        lastUpdated: "2024-06-01",
        notes: "Standard hammer",
      },
      {
        id: "2",
        toolName: "Screwdriver Set",
        toolId: "TOOL002",
        category: "Hand Tools",
        quantity: 30,
        location: "Warehouse A",
        status: "Out of Stock",
        lastUpdated: "2024-06-01",
        notes: "Phillips and flathead screwdrivers",
      },
      {
        id: "3",
        toolName: "Drill Machine",
        toolId: "TOOL003",
        category: "Power Tools",
        quantity: 20,
        location: "Warehouse B",
        status: "In Stock",
        lastUpdated: "2024-06-01",
        notes: "Cordless drill machine",
      },
    ];

    setToolStockRecords(mockData);
    toast({
      title: "File uploaded successfully",
      description: `${file.name} has been processed and data populated.`,
    });

    event.target.value = "";
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newStockRequest: StockRequest = {
      ...requestFormData,
      id: Date.now().toString(),
      requestDate: new Date().toISOString().split("T")[0],
      status: "Pending",
    };
    setStockRequests([...stockRequests, newStockRequest]);
    toast({
      title: "Stock Request Submitted",
      description: "Stock request has been submitted successfully.",
    });

    resetRequestForm();
    setIsRequestDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setToolStockRecords(toolStockRecords.filter(record => record.id !== id));
    toast({
      title: "Record Deleted",
      description: "Tool stock record has been removed.",
    });
  };

  const handleEdit = (record: ToolStockRecord) => {
    const params = new URLSearchParams();
    params.set("edit", "true");
    params.set("id", record.id);
    router.push(`/toolstocks/add?${params.toString()}`);
  };

  const handleRequestAction = (id: string, action: "Approved" | "Rejected") => {
    setStockRequests(
      stockRequests.map(request => (request.id === id ? { ...request, status: action } : request))
    );
    toast({
      title: `Stock Request ${action}`,
      description: `The stock request has been ${action.toLowerCase()}.`,
    });
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return <div className="min-h-screen bg-gray-50">{/* JSX continues below */}</div>;
};

export default ToolStocksPortal;
