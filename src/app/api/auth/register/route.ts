import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

export async function POST(req: Request) {
  const prisma = new PrismaClient();

  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return new Response("Preencha todos os campos", { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return new Response("Usuário já cadastrado", { status: 409 });
    }

    const hashedPassword = await hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return new Response("Usuário registrado com sucesso", { status: 201 });

  } catch (error) {
    return new Response("Esrro ao registrar o usuário", { status: 500 });
  }
}
