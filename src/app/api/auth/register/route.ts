import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const prisma = new PrismaClient();

  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json("Preencha todos os campos", { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json("Usuário já cadastrado", { status: 409 });
    }

    const hashedPassword = await hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json("Usuário registrado com sucesso", { status: 201 });

  } catch (error) {
    return NextResponse.json("Esrro ao registrar o usuário", { status: 500 });
  }
}
