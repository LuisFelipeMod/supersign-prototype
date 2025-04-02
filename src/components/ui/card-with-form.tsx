"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";

type CardWithFormProps = {
  type: "signIn" | "signUp";
};

const forms = {
  signIn: <SignInForm />,
  signUp: <SignUpForm />,
};

export function CardWithForm({ type }: CardWithFormProps) {
  return <Card className="w-[350px]">{forms[type]}</Card>;
}

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      toast({
        variant: "destructive",
        title: "Ops!",
        description: "Verifique o email e senha",
        action: (
          <ToastAction altText="Tentar novamente">Tentar novamente</ToastAction>
        ),
      });
      return;
    }
    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardHeader>
        <CardTitle>Entre na sua conta</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Input
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="Email *"
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="Senha *"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap ">
        <div className="flex justify-between size-full justify-between items-center">
          <Button type="submit">Entrar</Button>
          <Button type="button"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="flex items-center bg-slate-100 text-slate-700 border border-slate-700 transition hover:bg-slate-100 hover:text-slate-700 hover:opacity-50"
          >
            <FaGoogle />
            <p className="h-full"> Entrar com o Google</p>
          </Button>
        </div>
        <div className="mt-5 size-full relative flex justify-center align-center">
          <hr className="size-full" />
          <p className="text-sm font-normal mt-[-0.6rem] bg-white w-fit text-slate-400 absolute right-[49%]">
            ou
          </p>
        </div>
        <div className="mt-5 flex justify-center size-full">
          <Link
            className="font-normal text-sm leading-none tracking-tight hover:underline"
            href="/auth/register"
          >
            Criar uma nova conta
          </Link>
        </div>
      </CardFooter>
    </form>
  );
}

function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmitRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Ops!",
        description: "As senhas não coincidem",
        action: (
          <ToastAction altText="Tentar outra vez">Tentar outra vez</ToastAction>
        ),
      });
      return;
    }

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    router.push("/auth/login");

    const data = await response.json();

    if (!response.ok) {
      toast({
        variant: "destructive",
        title: "Ops!",
        description: "Ocorreu um erro",
        action: (
          <ToastAction altText="Tentar novamente">Tentar novamente</ToastAction>
        ),
      });
      return;
    }

  };

  return (
    <form onSubmit={handleSubmitRegister}>
      <CardHeader>
        <CardTitle>Crie uma nova conta</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Input
              id="name"
              placeholder="Nome *"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Input
              id="email"
              type="email"
              placeholder="Email *"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Input
              id="password"
              type="password"
              placeholder="Senha *"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Input
              id="password"
              type="password"
              placeholder="Confirmar Senha *"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>Cadastrar</Button>
      </CardFooter>
    </form>
  );
}
