import { FileMinus, FilePen } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import ButtonLogout from "./buttonLogout";

const items = [
  {
    title: "Documentos",
    url: "/dashboard",
    icon: FileMinus,
  },
  {
    title: "Assinatura Digital",
    url: "/dashboard/digital-signature",
    icon: FilePen,
  },
];

export async function AppSidebar() {
  const session = await getServerSession();
  const userImage = session?.user.image
    ? session?.user.image
    : "/user-default.png";

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center mb-5 mt-2 justify-between px-2">
            <Image
              className="rounded-full"
              src={userImage}
              width={40}
              height={40}
              alt="Imagem do usuário"
            />
            <p className="text-sm ml-2 mr-1">{session?.user.name}</p>
            <ButtonLogout>Sair</ButtonLogout>
            </div>
          <SidebarGroupLabel>Navegue pelas páginas</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
