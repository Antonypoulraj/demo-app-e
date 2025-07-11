"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";
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
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Search,
  BarChart3,
  X,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  Upload,
} from "lucide-react";
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
  LineChart,
  Line,
} from "recharts";

interface AttendanceRecord {
  id: string;
  employeeName: string;
  employeeId: string;
  date: string;
  status: "Present" | "Absent" | "Late" | "Half Day";
  checkIn?: string;
  checkOut?: string;
  notes?: string;
}

interface LeaveRequest {
  id: string;
  employeeName: string;
  employeeId: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  managerEmail: string;
  status: "Pending" | "Approved" | "Rejected";
}

const AttendancePortal = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const tabParam = typeof router.query.tab === "string" ? router.query.tab : "";
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(tabParam || "attendance");

  const [leaveFormData, setLeaveFormData] = useState({
    employeeName: "",
    employeeId: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
    managerEmail: "",
  });

  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);

  useEffect(() => {
    if (tabParam === "analytics") {
      setActiveTab("analytics");
    }
  }, [tabParam]);

  const attendanceData = [
    { name: "Present", count: 85, percentage: 85 },
    { name: "Late", count: 10, percentage: 10 },
    { name: "Absent", count: 5, percentage: 5 },
  ];

  const weeklyTrendData = [
    { day: "Mon", present: 95, absent: 5 },
    { day: "Tue", present: 92, absent: 8 },
    { day: "Wed", present: 88, absent: 12 },
    { day: "Thu", present: 90, absent: 10 },
    { day: "Fri", present: 87, absent: 13 },
  ];

  const statusOptions = ["Present", "Absent", "Late", "Half Day"];
  const leaveTypes = [
    "Sick Leave",
    "Annual Leave",
    "Emergency Leave",
    "Maternity Leave",
    "Paternity Leave",
  ];

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const handleEdit = (record: AttendanceRecord) => {
    const params = new URLSearchParams({ edit: "true", id: record.id });
    router.push(`/attendance/add?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* You can continue building out your UI using the logic/data defined above */}
      {/* Tabs UI (attendance, leave requests, analytics) can be rendered using `activeTab` */}
      {/* Use filtered attendanceRecords and leaveRequests for rendering respective tables */}
    </div>
  );
};

export default AttendancePortal;
