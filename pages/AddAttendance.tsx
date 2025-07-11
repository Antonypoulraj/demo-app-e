"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
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
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "../src/hooks/use-toast";

interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: "Present" | "Absent" | "Late" | "Half Day";
}

const AddAttendance = () => {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const isEditMode = searchParams?.get("edit") === "true";
  const recordData = searchParams?.get("data");
  const attendanceData: AttendanceRecord | null = recordData
    ? JSON.parse(decodeURIComponent(recordData))
    : null;

  const [formData, setFormData] = useState<AttendanceRecord>({
    id: "",
    employeeId: "",
    employeeName: "",
    date: "",
    checkIn: "",
    checkOut: "",
    status: "Present",
  });

  useEffect(() => {
    if (isEditMode && attendanceData) {
      setFormData(attendanceData);
    }
  }, [isEditMode, attendanceData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast({
      title: isEditMode ? "Attendance Updated" : "Attendance Added",
      description: isEditMode
        ? "Attendance record has been updated successfully."
        : "Attendance record has been added successfully.",
    });

    router.push("/AttendancePortal");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => router.push("/AttendancePortal")}
                className="p-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="font-times text-xl font-bold text-gray-800">
                {isEditMode ? "Edit Attendance Record" : "Add Attendance Record"}
              </h1>
            </div>
            <div className="text-right">
              <p className="font-times text-sm font-medium text-gray-800">{user?.username}</p>
              <p className="font-times text-xs text-gray-500 capitalize">{user?.role} Account</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-times">
              {isEditMode ? "Edit Attendance Information" : "Attendance Information"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="employeeId" className="font-times">
                    Employee ID
                  </Label>
                  <Input
                    id="employeeId"
                    value={formData.employeeId}
                    onChange={e => setFormData({ ...formData, employeeId: e.target.value })}
                    required
                    className="font-times"
                  />
                </div>
                <div>
                  <Label htmlFor="employeeName" className="font-times">
                    Employee Name
                  </Label>
                  <Input
                    id="employeeName"
                    value={formData.employeeName}
                    onChange={e => setFormData({ ...formData, employeeName: e.target.value })}
                    required
                    className="font-times"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="date" className="font-times">
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                  required
                  className="font-times"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="checkIn" className="font-times">
                    Check In Time
                  </Label>
                  <Input
                    id="checkIn"
                    type="time"
                    value={formData.checkIn}
                    onChange={e => setFormData({ ...formData, checkIn: e.target.value })}
                    className="font-times"
                  />
                </div>
                <div>
                  <Label htmlFor="checkOut" className="font-times">
                    Check Out Time
                  </Label>
                  <Input
                    id="checkOut"
                    type="time"
                    value={formData.checkOut}
                    onChange={e => setFormData({ ...formData, checkOut: e.target.value })}
                    className="font-times"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="status" className="font-times">
                  Status
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: "Present" | "Absent" | "Late" | "Half Day") =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger className="font-times">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Present">Present</SelectItem>
                    <SelectItem value="Absent">Absent</SelectItem>
                    <SelectItem value="Late">Late</SelectItem>
                    <SelectItem value="Half Day">Half Day</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1 font-times">
                  {isEditMode ? "Update Attendance" : "Add Attendance"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/AttendancePortal")}
                  className="font-times"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AddAttendance;
