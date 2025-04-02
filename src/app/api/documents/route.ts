import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const documents = await prisma.document.findMany();
    return NextResponse.json(documents);
  } catch (error) {
    return NextResponse.json(
      { error: "Falha ao buscar documentos" },
      { status: 500 }
    );
  }
}
