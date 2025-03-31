import * as React from "react";

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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  return (
    <form>
      <CardHeader>
        <CardTitle>Entre na sua conta</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Email *" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" placeholder="Senha *" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>Entrar</Button>
      </CardFooter>
    </form>
  );
}

function SignUpForm() {
  return (
    <form>
      <CardHeader>
        <CardTitle>Crie uma nova conta</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" placeholder="Nome *" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Email *" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" placeholder="Senha *" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="password">Confirmar Senha</Label>
            <Input id="password" placeholder="Confirmar Senha *" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>Cadastrar</Button>
      </CardFooter>
    </form>
  );
}
