import { AppSidebar } from "@/components/ui/app-sidebar";
import { Button } from "@/components/ui/button";
import ButtonLogout from "@/components/ui/buttonLogout";
import DocumentUpload from "@/components/ui/document-upload";
import Header from "@/components/ui/header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession();

  return (
    <SidebarProvider>
      <AppSidebar />
      <section>
        <SidebarTrigger />

        <p>Bem vindo, {session?.user.name}</p>
        <DocumentUpload />
        <ButtonLogout>Sair</ButtonLogout>
      </section>
    </SidebarProvider>
  );
}
