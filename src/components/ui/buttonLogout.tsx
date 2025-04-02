"use client";

import { signOut } from "next-auth/react"
import { Button } from "./button"
import { ReactNode } from "react"

type ButtonLogoutProps = {
  children?: ReactNode
}

export default function ButtonLogout({ children }:ButtonLogoutProps){
  return(
    <Button onClick={() => signOut({callbackUrl: "/auth/login"})}>{children}</Button>
  )
}