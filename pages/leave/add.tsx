"use client";

import React from "react";
import { useRouter } from "next/router";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useToast } from "../../hooks/use-toast";

const LeaveAddPage = () => {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Leave request submitted!" });
    router.push("/attendanceportal?tab=leave");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow">
      <h1 className="text-xl font-semibold mb-4">Submit Leave Request</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="employeeName" placeholder="Employee Name" required />
        <Input name="employeeId" placeholder="Employee ID" required />
        <Input name="leaveType" placeholder="Leave Type" required />
        <Input type="date" name="startDate" required />
        <Input type="date" name="endDate" required />
        <Input name="reason" placeholder="Reason" required />
        <Input type="email" name="managerEmail" placeholder="Manager Email" required />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default LeaveAddPage;
