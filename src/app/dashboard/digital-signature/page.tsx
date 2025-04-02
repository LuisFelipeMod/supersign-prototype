import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import DigitalSignature from "@/components/ui/digital-signature";
import { getServerSession } from "next-auth";

export default async function DigitalSignaturePage(){

  const session = await getServerSession();
  const userEmail = session?.user.email as string;

  return(
    <SidebarProvider>
      <AppSidebar />
      <section className="w-full mt-5">
        <DigitalSignature userEmail={userEmail}/>
      </section>
    </SidebarProvider>
  )
}