import { join } from "path";
import { readFile } from "fs/promises";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { fileKey: string } }) {
  try {
    const filePath = join(process.cwd(), "uploads", params.fileKey);

    const fileContent = await readFile(filePath);

    return new NextResponse(fileContent, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf", 
        "Content-Disposition": `inline; filename="${params.fileKey}"`,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Arquivo não encontrado" }, { status: 404 });
  }
}
