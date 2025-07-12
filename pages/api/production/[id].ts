import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { prisma } from "@/lib/prisma";

//const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  const leaveId = parseInt(id);
  if (isNaN(leaveId)) {
    return res.status(400).json({ error: "ID must be a number" });
  }

  if (req.method === "GET") {
    try {
      const leave = await prisma.leavemanagement_tb.findUnique({
        where: { id: leaveId },
      });
      if (!leave) return res.status(404).json({ error: "Leave not found" });
      res.status(200).json(leave);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch leave" });
    }
  } else if (req.method === "PUT") {
    const {
      Employee_Name,
      Employee_ID,
      Leave_Type,
      Start_Date,
      End_Date,
      Reason,
      Manager_Email_ID,
      Status,
    } = req.body;

    try {
      const updatedLeave = await prisma.leavemanagement_tb.update({
        where: { id: leaveId },
        data: {
          Employee_Name,
          Employee_ID,
          Leave_Type,
          Start_Date: new Date(Start_Date),
          End_Date: new Date(End_Date),
          Reason,
          Manager_Email_ID,
          Status,
        },
      });
      res.status(200).json(updatedLeave);
    } catch (error) {
      res.status(400).json({ error: "Failed to update leave record" });
    }
  } else if (req.method === "DELETE") {
    try {
      await prisma.leavemanagement_tb.delete({ where: { id: leaveId } });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete leave" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
