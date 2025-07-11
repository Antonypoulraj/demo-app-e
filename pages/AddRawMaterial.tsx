"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AddRawMaterialHeader from "../components/AddRawMaterialHeader";
import RawMaterialForm from "../components/RawMaterialForm";

const AddRawMaterial = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [editData, setEditData] = useState<any>(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const editFlag = searchParams?.get("edit") === "true";
    setIsEdit(editFlag);

    if (editFlag && typeof window !== "undefined") {
      const stored = sessionStorage.getItem("edit_raw_material");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setEditData(parsed);
          console.log("Raw material edit data loaded from sessionStorage:", parsed);
        } catch (err) {
          console.error("Failed to parse stored edit data:", err);
        }
      }
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50">
      <AddRawMaterialHeader isEdit={isEdit} />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <RawMaterialForm isEdit={isEdit} editData={editData} />
      </main>
    </div>
  );
};

export default AddRawMaterial;
