"use client";

import React from "react";
import { useRouter } from "next/router";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useToast } from "../../hooks/use-toast";

const AddAttendancePage = () => {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Attendance record added successfully" });
    router.push("/attendanceportal?tab=attendance");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-xl font-semibold mb-4">Add Attendance Record</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="employeeName" placeholder="Employee Name" required />
        <Input name="employeeId" placeholder="Employee ID" required />
        <Input type="date" name="date" required />
        <Input name="status" placeholder="Status (Present, Absent, Late, Half Day)" required />
        <Input type="time" name="checkIn" placeholder="Check In (optional)" />
        <Input type="time" name="checkOut" placeholder="Check Out (optional)" />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddAttendancePage;
