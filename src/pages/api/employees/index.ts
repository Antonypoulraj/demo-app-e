import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const employees = await prisma.employeedetails_tb.findMany();
      res.status(200).json(employees);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch employees" });
    }
  } else if (req.method === "POST") {
    const { Name, Email, Departrment, Position, Phone, Status } = req.body;

    try {
      const newEmployee = await prisma.employeedetails_tb.create({
        data: { Name, Email, Departrment, Position, Phone, Status },
      });
      res.status(201).json(newEmployee);
    } catch (error) {
      res.status(400).json({ error: "Failed to create employee" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
