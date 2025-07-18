import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

import { prisma } from "@/lib/prisma";

//const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  const recordId = parseInt(id);

  if (isNaN(recordId)) {
    return res.status(400).json({ error: "ID must be a number" });
  }

  if (req.method === "GET") {
    try {
      const record = await prisma.attendancedetails_tb.findUnique({
        where: { id: recordId },
      });
      if (!record) return res.status(404).json({ error: "Record not found" });
      res.status(200).json(record);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch record" });
    }
  } else if (req.method === "PUT") {
    const { Employee_Name, Employee_ID, Date, Check_In_Time, Check_Out_TIme, Status } = req.body;

    try {
      const updated = await prisma.attendancedetails_tb.update({
        where: { id: recordId },
        data: {
          Employee_Name,
          Employee_ID,
          Date: new Date(Date),
          Check_In_Time: new Date(Check_In_Time),
          Check_Out_TIme: new Date(Check_Out_TIme),
          Status,
        },
      });
      res.status(200).json(updated);
    } catch (error) {
      res.status(400).json({ error: "Failed to update record" });
    }
  } else if (req.method === "DELETE") {
    try {
      await prisma.attendancedetails_tb.delete({ where: { id: recordId } });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete record" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
