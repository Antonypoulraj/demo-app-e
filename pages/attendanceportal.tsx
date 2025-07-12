"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Badge } from "../components/ui/badge";
import { Plus, Edit } from "lucide-react";
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
  const [activeTab, setActiveTab] = useState(tabParam || "attendance");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([
    {
      id: "1",
      employeeName: "John Doe",
      employeeId: "EMP001",
      date: "2025-07-10",
      status: "Present",
      checkIn: "09:00",
      checkOut: "17:00",
    },
    {
      id: "2",
      employeeName: "Jane Smith",
      employeeId: "EMP002",
      date: "2025-07-10",
      status: "Late",
      checkIn: "10:15",
    },
    {
      id: "3",
      employeeName: "Mike Johnson",
      employeeId: "EMP003",
      date: "2025-07-10",
      status: "Absent",
    },
  ]);

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);

  useEffect(() => {
    if (tabParam === "analytics") {
      setActiveTab("analytics");
    } else if (tabParam === "leave") {
      setActiveTab("leave");
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

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesSearch =
      record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.employeeId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = selectedStatus === "all" || record.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const handleEdit = (record: AttendanceRecord) => {
    const params = new URLSearchParams({ edit: "true", id: record.id });
    router.push(`/attendance/add?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Attendance Portal</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="attendance">Attendance Records</TabsTrigger>
          <TabsTrigger value="leave">Leave Management</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* ATTENDANCE TAB */}
        <TabsContent value="attendance">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div className="flex gap-2 w-full md:w-1/2">
              <Input
                placeholder="Search by name or ID"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Present">Present</SelectItem>
                  <SelectItem value="Absent">Absent</SelectItem>
                  <SelectItem value="Late">Late</SelectItem>
                  <SelectItem value="Half Day">Half Day</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={() => router.push("/attendance/add")} className="w-full md:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Add Attendance
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map(record => (
                <TableRow key={record.id}>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>
                    {record.employeeName} ({record.employeeId})
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        record.status === "Present"
                          ? "default"
                          : record.status === "Late"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{record.checkIn || "-"}</TableCell>
                  <TableCell>{record.checkOut || "-"}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(record)}>
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        {/* LEAVE MANAGEMENT TAB */}
        <TabsContent value="leave">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Leave Requests</h2>
            <Button onClick={() => router.push("/leave/add")}>
              <Plus className="mr-2 h-4 w-4" />
              Submit Leave Request
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee Name</TableHead>
                <TableHead>Employee ID</TableHead>
                <TableHead>Leave Type</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Manager Email</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaveRequests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    No leave requests found.
                  </TableCell>
                </TableRow>
              ) : (
                leaveRequests.map(request => (
                  <TableRow key={request.id}>
                    <TableCell>{request.employeeName}</TableCell>
                    <TableCell>{request.employeeId}</TableCell>
                    <TableCell>{request.leaveType}</TableCell>
                    <TableCell>{request.startDate}</TableCell>
                    <TableCell>{request.endDate}</TableCell>
                    <TableCell>{request.reason}</TableCell>
                    <TableCell>{request.managerEmail}</TableCell>
                    <TableCell>{request.status}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TabsContent>

        {/* ANALYTICS TAB */}
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold mb-2">Attendance Summary</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="percentage" fill="#4F46E5" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold mb-2">Weekly Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="present" stroke="#22C55E" />
                  <Line type="monotone" dataKey="absent" stroke="#EF4444" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AttendancePortal;
