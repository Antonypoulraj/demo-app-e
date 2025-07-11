"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AddToolStockHeader from "../components/AddToolStockHeader";
import ToolStockForm from "../components/ToolStockForm";

const AddToolStock = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [editData, setEditData] = useState<any>(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const editFlag = searchParams?.get("edit") === "true";
    setIsEdit(editFlag);

    if (editFlag && typeof window !== "undefined") {
      const stored = sessionStorage.getItem("edit_tool_stock");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setEditData(parsed);
          console.log("Tool data loaded from sessionStorage:", parsed);
        } catch (error) {
          console.error("Failed to parse tool stock edit data:", error);
        }
      }
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50">
      <AddToolStockHeader isEdit={isEdit} />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ToolStockForm isEdit={isEdit} editData={editData} />
      </main>
    </div>
  );
};

export default AddToolStock;
