"use client";

import { CardWithForm } from "@/components/card-with-form";

export function SignUp() {
  return (
    <section className="flex justify-center items-center h-screen">
      <CardWithForm type="signUp" />
    </section>
  );
}

export default SignUp;
