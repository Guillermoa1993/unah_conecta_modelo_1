import { Edit, Trash2, Search, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { toast } from "sonner";

const events = [
  {
    id: "1",
    title: "Taller de React",
    tutor: "Dr. Juan Pérez",
    date: "2026-06-01",
    time: "10:00 AM",
    location: "Aula 301, Edificio Principal",
    capacity: 30,
    registered: 25,
    status: "upcoming",
  },
  {
    id: "2",
    title: "Curso de Python",
    tutor: "Dra. María González",
    date: "2026-05-28",
    time: "2:00 PM",
    location: "Lab de Cómputo 5",
    capacity: 30,
    registered: 30,
    status: "active",
  },
  {
    id: "3",
    title: "Workshop de ML",
    tutor: "Mtro. Carlos Ramírez",
    date: "2026-05-25",
    time: "4:00 PM",
    location: "Sala de Conferencias B",
    capacity: 25,
    registered: 23,
    status: "completed",
  },
];

export function EventManagement() {
  const handleEdit = (id: string) => {
    toast.info("Editar evento: " + id);
  };

  const handleDelete = (id: string) => {
    toast.error("Evento eliminado");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#004B87]">Gestión de Eventos</h1>
        <p className="text-muted-foreground mt-1">
          Administra todos los eventos del sistema
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Todos los Eventos</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar eventos..." className="pl-10" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Tutor</TableHead>
                  <TableHead>Fecha y Hora</TableHead>
                  <TableHead>Ubicación</TableHead>
                  <TableHead className="text-center">Inscritos</TableHead>
                  <TableHead className="text-center">Estado</TableHead>
                  <TableHead className="text-center">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.title}</TableCell>
                    <TableCell>{event.tutor}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        {event.date}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <Clock className="h-3 w-3" />
                        {event.time}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3 shrink-0 text-[#004B87]" />
                        {event.location}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {event.registered} / {event.capacity}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        className={
                          event.status === "active"
                            ? "bg-green-500"
                            : event.status === "upcoming"
                            ? "bg-blue-500"
                            : "bg-gray-500"
                        }
                      >
                        {event.status === "active"
                          ? "Activo"
                          : event.status === "upcoming"
                          ? "Próximo"
                          : "Completado"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(event.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(event.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
