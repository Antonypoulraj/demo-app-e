import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { prisma } from "@/lib/prisma";

//const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const records = await prisma.leavemanagement_tb.findMany();
      res.status(200).json(records);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch leave records" });
    }
  } else if (req.method === "POST") {
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
      const newLeave = await prisma.leavemanagement_tb.create({
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
      res.status(201).json(newLeave);
    } catch (error) {
      res.status(400).json({ error: "Failed to create leave record" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
