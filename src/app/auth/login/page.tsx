"use client";

import { CardWithForm } from "@/components/card-with-form";

export function Login() {
  return (
    <section className="flex justify-center items-center h-screen">
      <CardWithForm type="signIn" />
    </section>
  );
}

export default Login;
