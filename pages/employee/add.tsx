"use client";

import React from "react";
import { useRouter } from "next/router";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useToast } from "../../hooks/use-toast";
import { Label } from "../../components/ui/label";

const AddEmployee = () => {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({ title: "Employee added successfully" });
    router.push("/employeeportal");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow rounded">
      <h1 className="text-xl font-semibold mb-4">Add New Employee</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" placeholder="Full Name" autoComplete="name" required />
        </div>

        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            required
          />
        </div>

        <div>
          <Label htmlFor="department">Department</Label>
          <Input
            id="department"
            name="department"
            placeholder="Department"
            autoComplete="organization"
            required
          />
        </div>

        <div>
          <Label htmlFor="position">Position</Label>
          <Input
            id="position"
            name="position"
            placeholder="Position"
            autoComplete="organization-title"
            required
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" name="phone" placeholder="Phone Number" autoComplete="tel" required />
        </div>

        <Button type="submit" className="w-full">
          Add Employee
        </Button>
      </form>
    </div>
  );
};

export default AddEmployee;
