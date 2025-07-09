import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const productionId = parseInt(id as string);

  if (isNaN(productionId)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  if (req.method === "GET") {
    try {
      const record = await prisma.productionsdetails_tb.findUnique({
        where: { id: productionId },
      });
      if (!record) return res.status(404).json({ error: "Not found" });
      res.status(200).json(record);
    } catch (err) {
      res.status(500).json({ error: "Error retrieving record" });
    }
  } else if (req.method === "PUT") {
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
      const updated = await prisma.productionsdetails_tb.update({
        where: { id: productionId },
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
      res.status(200).json(updated);
    } catch (err) {
      res.status(400).json({ error: "Update failed" });
    }
  } else if (req.method === "DELETE") {
    try {
      await prisma.productionsdetails_tb.delete({
        where: { id: productionId },
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
