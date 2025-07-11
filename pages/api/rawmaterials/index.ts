import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const materials = await prisma.rawmaterialdetails_db.findMany();
      res.status(200).json(materials);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch materials" });
    }
  } else if (req.method === "POST") {
    const { Marterial_Name, Maerial_Grade, Category, Quantity, Supplier, Status, Length, Weight } =
      req.body;

    try {
      const newMaterial = await prisma.rawmaterialdetails_db.create({
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
      res.status(201).json(newMaterial);
    } catch (err) {
      res.status(400).json({ error: "Failed to add material" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
