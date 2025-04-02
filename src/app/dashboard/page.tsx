import { AppSidebar } from "@/components/ui/app-sidebar";
import ButtonLogout from "@/components/ui/buttonLogout";
import DocumentUploadTable from "@/components/ui/document-upload-table";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getServerSession } from "next-auth";

export default async function Dashboard() {
  const session = await getServerSession();
  const userEmail = session?.user.email as string;

  return (
    <SidebarProvider>
      <AppSidebar />
      <section className="mt-5">
        <DocumentUploadTable userEmail={userEmail} />
      </section>
    </SidebarProvider>
  );
}
