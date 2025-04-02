import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs/promises";
import mime from "mime";
import { join } from "path";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("document") as File;
    const userId = formData.get("userId") as string;

    if (!file) {
      return new Response("Nenhum arquivo enviado"), { status: 400 };
    }

    const fileExtension = mime.getExtension(file.type) || "dat";
    const fileKey = `${randomUUID()}.${fileExtension}`;
    const fileName = file.name;
    const filePath = join(process.cwd(), "uploads", fileKey);

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);

    const document = await prisma.document.create({
      data: {
        name: fileName,
        fileKey: fileKey,
        userId: userId,
        status: "PENDING",
      },
    });

    return NextResponse.json({
      message: "Documento enviado com sucesso",
      document,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
}
