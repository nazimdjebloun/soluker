import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/admin-sidebar";
import { SignIn, SignedIn, SignedOut } from "@clerk/nextjs";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
      <>
        <SignedOut>
          <SignIn fallbackRedirectUrl="/admin" routing="hash" />
        </SignedOut>
        <SignedIn>
          <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
              <SidebarTrigger />
              {children}
            </main>
          </SidebarProvider>
        </SignedIn>
      </>
    );
}
