"use client";

import React from "react";
import { useRouter } from "next/router";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useToast } from "../../hooks/use-toast";

const AddEmployee = () => {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Employee added successfully" });
    router.push("/employeeportal");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow rounded">
      <h1 className="text-xl font-semibold mb-4">Add New Employee</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="name" placeholder="Full Name" required />
        <Input name="email" placeholder="Email Address" type="email" required />
        <Input name="department" placeholder="Department" required />
        <Input name="position" placeholder="Position" required />
        <Input name="phone" placeholder="Phone Number" required />
        <Button type="submit" className="w-full">
          Add Employee
        </Button>
      </form>
    </div>
  );
};

export default AddEmployee;
