import { Outlet, useLocation } from "react-router";
import { AppSidebar } from "../navigation/AppSidebar";
import { AppNavbar } from "../navigation/AppNavbar";
import { SidebarProvider } from "../ui/sidebar";
import { Toaster } from "../ui/sonner";

export function RootLayout() {
  const location = useLocation();
  const isRoleSelector = location.pathname === "/";

  if (isRoleSelector) {
    return (
      <>
        <Outlet />
        <Toaster />
      </>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <AppNavbar />
          <main className="flex-1 overflow-y-auto bg-[#F4F6F8] p-6">
            <Outlet />
          </main>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}
