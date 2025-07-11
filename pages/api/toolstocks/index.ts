import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const tools = await prisma.tooldetails_tb.findMany();
      res.status(200).json(tools);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch tools" });
    }
  } else if (req.method === "POST") {
    const {
      Tool_Name,
      Tool_ID,
      Category,
      Quantity,
      Location,
      Status,
      Minimum_Stock,
      Maximum_Stock,
      Supplier,
    } = req.body;

    try {
      const newTool = await prisma.tooldetails_tb.create({
        data: {
          Tool_Name,
          Tool_ID,
          Category,
          Quantity,
          Location,
          Status,
          Minimum_Stock,
          Maximum_Stock,
          Supplier,
        },
      });
      res.status(201).json(newTool);
    } catch (err) {
      res.status(400).json({ error: "Failed to add tool" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
