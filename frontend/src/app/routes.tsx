import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/layouts/RootLayout";
import { StudentDashboard } from "./pages/student/StudentDashboard";
import { AvailableEvents } from "./pages/student/AvailableEvents";
import { QRScanner } from "./pages/student/QRScanner";
import { Survey } from "./pages/student/Survey";
import { AcademicHistory } from "./pages/student/AcademicHistory";
import { TutorDashboard } from "./pages/tutor/TutorDashboard";
import { CreateEvent } from "./pages/tutor/CreateEvent";
import { ManageEvent } from "./pages/tutor/ManageEvent";
import { TutorReports } from "./pages/tutor/TutorReports";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { EventManagement } from "./pages/admin/EventManagement";
import { UserManagement } from "./pages/admin/UserManagement";
import { SystemSettings } from "./pages/admin/SystemSettings";
import { VOAEDashboard } from "./pages/voae/VOAEDashboard";
import { OfficialReports } from "./pages/voae/OfficialReports";
import { RoleSelector } from "./pages/RoleSelector";
import { CommentsReview } from "./pages/admin/CommentsReview";
import { Login } from "./pages/Login";
import { FichaEstudiante } from "./pages/student/FichaEstudiante";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Login /> },
      { path: "roles", element: <RoleSelector /> },
      
      // Student Routes
      { path: "student", element: <StudentDashboard /> },
      { path: "student/events", element: <AvailableEvents /> },
      { path: "student/scan", element: <QRScanner /> },
      { path: "student/survey/:eventId", element: <Survey /> },
      { path: "student/history", element: <AcademicHistory /> },
      { path: "student/ficha", element: <FichaEstudiante /> },
      
      // Tutor Routes
      { path: "tutor", element: <TutorDashboard /> },
      { path: "tutor/create-event", element: <CreateEvent /> },
      { path: "tutor/event/:eventId", element: <ManageEvent /> },
      { path: "tutor/reports", element: <TutorReports /> },
      
      // Admin Routes
      { path: "admin", element: <AdminDashboard /> },
      { path: "admin/events", element: <EventManagement /> },
      { path: "admin/users", element: <UserManagement /> },
      { path: "admin/settings", element: <SystemSettings /> },
      { path: "admin/comments", element: <CommentsReview /> },
      
      // VOAE Routes
      { path: "voae", element: <VOAEDashboard /> },
      { path: "voae/reports", element: <OfficialReports /> },
    ],
  },
]);
