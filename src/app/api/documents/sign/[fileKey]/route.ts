import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(
  req: Request,
  { params }: { params: { fileKey: string } }
) {
  try {
    const { fileKey } = params;
    const { userId } = await req.json();

    const document = await prisma.document.findFirst({
      where: { fileKey },
    });

    if (!document) {
      return NextResponse.json(
        { error: "Documento não encontrado" },
        { status: 404 }
      );
    }

    if (document.status === "SIGNED") {
      return NextResponse.json(
        { error: "Documento já assinado" },
        { status: 400 }
      );
    }

    const updatedDocument = await prisma.document.update({
      where: { fileKey: fileKey },
      data: {
        status: "SIGNED",
        signedAt: new Date(),
      },
    });

    return NextResponse.json({
      message: "Documento assinado com sucesso",
      document: updatedDocument,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
