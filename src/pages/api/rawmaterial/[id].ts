import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const materialId = parseInt(id as string);

  if (isNaN(materialId)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  if (req.method === "GET") {
    try {
      const material = await prisma.rawmaterialdetails_db.findUnique({
        where: { id: materialId },
      });
      if (!material) return res.status(404).json({ error: "Material not found" });
      res.status(200).json(material);
    } catch (err) {
      res.status(500).json({ error: "Error retrieving material" });
    }
  } else if (req.method === "PUT") {
    const { Marterial_Name, Maerial_Grade, Category, Quantity, Supplier, Status, Length, Weight } =
      req.body;

    try {
      const updated = await prisma.rawmaterialdetails_db.update({
        where: { id: materialId },
        data: {
          Marterial_Name,
          Maerial_Grade,
          Category,
          Quantity,
          Supplier,
          Status,
          Length,
          Weight,
        },
      });
      res.status(200).json(updated);
    } catch (err) {
      res.status(400).json({ error: "Update failed" });
    }
  } else if (req.method === "DELETE") {
    try {
      await prisma.rawmaterialdetails_db.delete({
        where: { id: materialId },
      });
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ error: "Deletion failed" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
