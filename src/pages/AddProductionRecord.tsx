"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowLeft, CalendarIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const AddProductionRecord = () => {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const isEdit = searchParams?.get("edit") === "true";

  const [date, setDate] = useState<Date>();

  const rejectionReasons = [
    "Surface finishing",
    "Inner diameter finishing",
    "Total Thickness out",
    "Hole chipped",
    "Hole finishing",
    "Setting mistake",
    "Tool Broken",
    "Tapper surface",
    "Slot Over/below size",
  ];

  const [formData, setFormData] = useState({
    shift: "",
    componentName: "",
    projectName: "",
    totalMachinedQuantity: 0,
    totalFinishedQuantity: 0,
    totalRejectionQuantity: 0,
    rejectionReason: "",
    operatorName: "",
  });

  useEffect(() => {
    if (isEdit && typeof window !== "undefined") {
      const stored = sessionStorage.getItem("edit_production_data");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setFormData({
            shift: parsed.shift || "",
            componentName: parsed.componentName || "",
            projectName: parsed.projectName || "",
            totalMachinedQuantity: parsed.totalMachinedQuantity || 0,
            totalFinishedQuantity: parsed.totalFinishedQuantity || 0,
            totalRejectionQuantity: parsed.totalRejectionQuantity || 0,
            rejectionReason: parsed.rejectionReason || "",
            operatorName: parsed.operatorName || "",
          });
          if (parsed.date) {
            setDate(new Date(parsed.date));
          }
        } catch (err) {
          console.error("Failed to parse edit data:", err);
        }
      }
    }
  }, [isEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!date) {
      toast({
        title: "Error",
        description: "Please select a date.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: isEdit ? "Updated" : "Created",
      description: isEdit
        ? "Production record has been updated."
        : "Production record has been created.",
    });

    router.push("/production");
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => router.push("/production")}
                className="font-times p-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="font-times text-xl font-bold text-gray-800">
                {isEdit ? "Edit Production Record" : "Add Production Record"}
              </h1>
            </div>
            <div className="text-right">
              <p className="font-times text-sm font-medium text-gray-800">{user?.username}</p>
              <p className="font-times text-xs text-gray-500 capitalize">{user?.role} Account</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-times">Production Record Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date" className="font-times">
                    Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal font-times",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shift" className="font-times">
                    Shift
                  </Label>
                  <Input
                    id="shift"
                    value={formData.shift}
                    onChange={e => handleInputChange("shift", e.target.value)}
                    placeholder="e.g., Shift 1, Shift 2"
                    className="font-times"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="componentName" className="font-times">
                    Component Name
                  </Label>
                  <Input
                    id="componentName"
                    value={formData.componentName}
                    onChange={e => handleInputChange("componentName", e.target.value)}
                    placeholder="Enter component name"
                    className="font-times"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectName" className="font-times">
                    Project Name
                  </Label>
                  <Input
                    id="projectName"
                    value={formData.projectName}
                    onChange={e => handleInputChange("projectName", e.target.value)}
                    placeholder="Enter project name"
                    className="font-times"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalMachinedQuantity" className="font-times">
                    Total Machined Quantity
                  </Label>
                  <Input
                    id="totalMachinedQuantity"
                    type="number"
                    value={formData.totalMachinedQuantity}
                    onChange={e =>
                      handleInputChange("totalMachinedQuantity", parseInt(e.target.value) || 0)
                    }
                    placeholder="Enter machined quantity"
                    className="font-times"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalFinishedQuantity" className="font-times">
                    Total Finished Quantity
                  </Label>
                  <Input
                    id="totalFinishedQuantity"
                    type="number"
                    value={formData.totalFinishedQuantity}
                    onChange={e =>
                      handleInputChange("totalFinishedQuantity", parseInt(e.target.value) || 0)
                    }
                    placeholder="Enter finished quantity"
                    className="font-times"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalRejectionQuantity" className="font-times">
                    Total Rejection Quantity
                  </Label>
                  <Input
                    id="totalRejectionQuantity"
                    type="number"
                    value={formData.totalRejectionQuantity}
                    onChange={e =>
                      handleInputChange("totalRejectionQuantity", parseInt(e.target.value) || 0)
                    }
                    placeholder="Enter rejection quantity"
                    className="font-times"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rejectionReason" className="font-times">
                    Rejection Reason
                  </Label>
                  <Select
                    value={formData.rejectionReason}
                    onValueChange={value => handleInputChange("rejectionReason", value)}
                  >
                    <SelectTrigger className="font-times">
                      <SelectValue placeholder="Select rejection reason" />
                    </SelectTrigger>
                    <SelectContent>
                      {rejectionReasons.map(reason => (
                        <SelectItem key={reason} value={reason}>
                          {reason}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="operatorName" className="font-times">
                    Operator Name
                  </Label>
                  <Input
                    id="operatorName"
                    value={formData.operatorName}
                    onChange={e => handleInputChange("operatorName", e.target.value)}
                    placeholder="Enter operator name"
                    className="font-times"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button type="submit" className="font-times flex-1">
                  {isEdit ? "Update Record" : "Create Record"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/production")}
                  className="font-times flex-1"
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

export default AddProductionRecord;
