import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

//const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const toolId = parseInt(id as string);

  if (isNaN(toolId)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  if (req.method === "GET") {
    try {
      const tool = await prisma.tooldetails_tb.findUnique({
        where: { id: toolId },
      });
      if (!tool) return res.status(404).json({ error: "Tool not found" });
      res.status(200).json(tool);
    } catch (err) {
      res.status(500).json({ error: "Error fetching tool" });
    }
  } else if (req.method === "PUT") {
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
      const updatedTool = await prisma.tooldetails_tb.update({
        where: { id: toolId },
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
      res.status(200).json(updatedTool);
    } catch (err) {
      res.status(400).json({ error: "Failed to update tool" });
    }
  } else if (req.method === "DELETE") {
    try {
      await prisma.tooldetails_tb.delete({
        where: { id: toolId },
      });
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ error: "Failed to delete tool" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
