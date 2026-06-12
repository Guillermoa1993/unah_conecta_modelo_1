import { useLocation, Link } from "react-router";
import {
  Home,
  Calendar,
  QrCode,
  History,
  ClipboardList,
  Plus,
  BarChart3,
  Users,
  Settings,
  Shield,
  FileText,
  MessageSquare,
} from "lucide-react";
import logoImg from "../../../imports/image.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "../ui/sidebar";

type UserRole = "student" | "tutor" | "admin" | "voae";

function getUserRole(pathname: string): UserRole | null {
  if (pathname.startsWith("/student")) return "student";
  if (pathname.startsWith("/tutor")) return "tutor";
  if (pathname.startsWith("/admin")) return "admin";
  if (pathname.startsWith("/voae")) return "voae";
  return null;
}

const menuItems = {
  student: [
    { icon: Home, label: "Dashboard", path: "/student" },
    { icon: FileText, label: "Ficha de Estudiante", path: "/student/ficha" },
    { icon: Calendar, label: "Eventos Disponibles", path: "/student/events" },
    { icon: QrCode, label: "Escanear QR", path: "/student/scan" },
    { icon: History, label: "Historial Académico", path: "/student/history" },
  ],
  tutor: [
    { icon: Home, label: "Dashboard", path: "/tutor" },
    { icon: Plus, label: "Crear Evento", path: "/tutor/create-event" },
    { icon: BarChart3, label: "Reportes", path: "/tutor/reports" },
  ],
  admin: [
    { icon: Home, label: "Dashboard", path: "/admin" },
    { icon: Calendar, label: "Gestión de Eventos", path: "/admin/events" },
    { icon: Users, label: "Gestión de Usuarios", path: "/admin/users" },
    { icon: Settings, label: "Configuración", path: "/admin/settings" },
    { icon: MessageSquare, label: "Comentarios", path: "/admin/comments" },
  ],
  voae: [
    { icon: Shield, label: "Panel de Auditoría", path: "/voae" },
    { icon: FileText, label: "Reportes Oficiales", path: "/voae/reports" },
  ],
};

export function AppSidebar() {
  const location = useLocation();
  const role = getUserRole(location.pathname);

  if (!role) return null;

  const items = menuItems[role];

  return (
    <Sidebar className="border-r border-[#003366]">
      <SidebarHeader className="border-b border-[#003366] p-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoImg} alt="VOAE UNAH Eventos" className="h-12 w-12 object-contain rounded" />
          <h2 className="text-lg font-semibold text-white">Conecta Pumas</h2>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[#FFD100]">Menú</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={
                        isActive
                          ? "bg-[#FFD100] text-[#003366] hover:bg-[#FFD100] hover:text-[#003366]"
                          : "text-white hover:bg-[#003366] hover:text-white"
                      }
                    >
                      <Link to={item.path}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
