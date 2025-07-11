import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const records = await prisma.productionsdetails_tb.findMany();
      res.status(200).json(records);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch production records" });
    }
  } else if (req.method === "POST") {
    const {
      Date,
      Shift,
      Project_Name,
      Component_Name,
      Total_Machined_Quantity,
      Total_Finished_Quantity,
      Total_Rejection_Quantity,
      Rejection_Reason,
      Operator_Name,
    } = req.body;

    try {
      const newRecord = await prisma.productionsdetails_tb.create({
        data: {
          Date: new Date(Date),
          Shift,
          Project_Name,
          Component_Name,
          Total_Machined_Quantity,
          Total_Finished_Quantity,
          Total_Rejection_Quantity,
          Rejection_Reason,
          Operator_Name,
        },
      });
      res.status(201).json(newRecord);
    } catch (err) {
      res.status(400).json({ error: "Failed to create production record" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
