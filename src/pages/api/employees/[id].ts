import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  const employeeId = parseInt(id);

  if (isNaN(employeeId)) {
    return res.status(400).json({ error: "ID must be a number" });
  }

  if (req.method === "GET") {
    try {
      const employee = await prisma.employeedetails_tb.findUnique({
        where: { id: employeeId },
      });
      if (!employee) return res.status(404).json({ error: "Employee not found" });
      res.status(200).json(employee);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch employee" });
    }
  } else if (req.method === "PUT") {
    const { Name, Email, Departrment, Position, Phone, Status } = req.body;
    try {
      const updated = await prisma.employeedetails_tb.update({
        where: { id: employeeId },
        data: { Name, Email, Departrment, Position, Phone, Status },
      });
      res.status(200).json(updated);
    } catch (error) {
      res.status(400).json({ error: "Failed to update employee" });
    }
  } else if (req.method === "DELETE") {
    try {
      await prisma.employeedetails_tb.delete({ where: { id: employeeId } });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete employee" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
