"use client";

import { CardWithForm } from "@/components/ui/card-with-form";

export function Register() {
  return (
    <section className="flex justify-center items-center h-screen">
      <CardWithForm type="signUp" />
    </section>
  );
}

export default Register;
