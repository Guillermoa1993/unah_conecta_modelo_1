import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { toast } from "sonner";
import { User, GraduationCap, Camera, CheckCircle2, Save, FileText } from "lucide-react";

interface StudentFormData {
  nombre: string;
  identidad: string;
  telefono: string;
  genero: string;
  cuenta: string;
  carrera: string;
  centroRegional: string;
  direccion: string;
  foto: string | null;
}

export function FichaEstudiante() {
  const [formData, setFormData] = useState<StudentFormData>({
    nombre: "",
    identidad: "",
    telefono: "",
    genero: "",
    cuenta: "",
    carrera: "",
    centroRegional: "",
    direccion: "",
    foto: null,
  });

  const [enviando, setEnviando] = useState(false);
  const [exito, setExito] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        toast.error("La imagen excede el límite de 2 MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, foto: reader.result as string });
        toast.success("Fotografía cargada correctamente.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    // Simular guardado de base de datos
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Datos enviados a PostgreSQL:", formData);
    setEnviando(false);
    setExito(true);
    toast.success("¡Ficha de estudiante guardada en el sistema!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-sans">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 bg-gradient-to-br from-[#FFD100] to-[#e8920a] rounded-xl flex items-center justify-center text-xl shadow-lg shadow-[#FFD100]/20 text-[#003366]">
          <FileText className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-[#004B87]">
            Ficha de Enrolamiento Estudiantil
          </h2>
          <p className="text-sm text-slate-500">
            Completa tu información institucional de UNAH para la validación automática del Artículo 140.
          </p>
        </div>
      </div>

      {/* Success banner */}
      {exito && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="h-6 w-6 text-emerald-600 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-emerald-800">¡Ficha guardada exitosamente!</h4>
            <p className="text-xs text-emerald-600">
              Tus datos han sido actualizados en la base de datos de PostgreSQL. Puedes seguir navegando en el portal.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Sección 1: Datos Personales */}
        <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 flex flex-row items-center gap-3 py-4 px-6">
            <div className="h-8 w-8 bg-slate-100 text-[#004B87] rounded-full flex items-center justify-center font-bold">
              <User className="h-4 w-4" />
            </div>
            <CardTitle className="text-base font-bold text-[#003366]">
              Datos Personales y de Contacto
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                Nombre Completo
              </label>
              <Input
                type="text"
                name="nombre"
                required
                placeholder="Ej. Juan Carlos Pérez López"
                value={formData.nombre}
                onChange={handleChange}
                className="h-11 rounded-lg bg-slate-50 focus-visible:ring-[#FFD100] border-slate-200 text-[#003366]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                  Número de Identidad
                </label>
                <Input
                  type="text"
                  name="identidad"
                  required
                  placeholder="0801-1999-XXXXX"
                  value={formData.identidad}
                  onChange={handleChange}
                  className="h-11 rounded-lg bg-slate-50 focus-visible:ring-[#FFD100] border-slate-200 text-[#003366]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                  Teléfono Móvil
                </label>
                <Input
                  type="text"
                  name="telefono"
                  required
                  placeholder="9999-9999"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="h-11 rounded-lg bg-slate-50 focus-visible:ring-[#FFD100] border-slate-200 text-[#003366]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                Género
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { value: "masculino", label: "♂ Masculino" },
                  { value: "femenino", label: "♀ Femenino" },
                  { value: "otro", label: "○ Prefiero no especificar" },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer text-sm font-medium transition-all select-none ${
                      formData.genero === opt.value
                        ? "border-[#FFD100] bg-[#FFD100]/5 text-[#e8920a] font-bold"
                        : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600"
                    }`}
                  >
                    <input
                      type="radio"
                      name="genero"
                      value={opt.value}
                      checked={formData.genero === opt.value}
                      onChange={handleChange}
                      required
                      className="accent-[#004B87] h-4 w-4"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sección 2: Información Académica */}
        <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 flex flex-row items-center gap-3 py-4 px-6">
            <div className="h-8 w-8 bg-slate-100 text-[#004B87] rounded-full flex items-center justify-center font-bold">
              <GraduationCap className="h-4 w-4" />
            </div>
            <CardTitle className="text-base font-bold text-[#003366]">
              Información Universitaria (UNAH)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                  Número de Cuenta
                </label>
                <Input
                  type="text"
                  name="cuenta"
                  required
                  placeholder="2020100XXXX"
                  value={formData.cuenta}
                  onChange={handleChange}
                  className="h-11 rounded-lg bg-slate-50 focus-visible:ring-[#FFD100] border-slate-200 text-[#003366]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                  Carrera
                </label>
                <Input
                  type="text"
                  name="carrera"
                  required
                  placeholder="Ej. Ingeniería en Sistemas"
                  value={formData.carrera}
                  onChange={handleChange}
                  className="h-11 rounded-lg bg-slate-50 focus-visible:ring-[#FFD100] border-slate-200 text-[#003366]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                Centro Regional
              </label>
              <select
                name="centroRegional"
                required
                value={formData.centroRegional}
                onChange={handleChange}
                className="w-full h-11 px-3 rounded-lg bg-slate-50 border border-slate-200 text-[#003366] text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD100]/50 focus:border-[#FFD100] font-medium"
              >
                <option value="">Selecciona tu centro regional...</option>
                <option value="CU">Ciudad Universitaria (CU) – Tegucigalpa</option>
                <option value="CURLA">Centro Regional Universitario del Litoral Atlántico (CURLA) – La Ceiba</option>
                <option value="UNAH-VS">UNAH Valle de Sula (UNAH-VS) – San Pedro Sula</option>
                <option value="CURC">Centro Universitario Regional del Centro (CURC) – Comayagua</option>
                <option value="CURLP">Centro Universitario Regional del Litoral Pacífico (CURLP) – Choluteca</option>
                <option value="CURNO">Centro Universitario Regional del Nor-Oriente (CURNO) – Juticalpa</option>
                <option value="CUROC">Centro Universitario Regional de Occidente (CUROC) – Santa Rosa de Copán</option>
                <option value="UNAH-TEC-DANLI">UNAH Tec Danlí</option>
                <option value="UNAH-TEC-AGUAN">UNAH Tec Aguán</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                Dirección Habitual
              </label>
              <textarea
                name="direccion"
                required
                rows={3}
                placeholder="Colonia, Municipio, Departamento..."
                value={formData.direccion}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-slate-50 border border-slate-200 text-[#003366] text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD100]/50 focus:border-[#FFD100] placeholder:text-slate-400 font-medium resize-y min-h-[90px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Sección 3: Carga de Fotografía */}
        <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 flex flex-row items-center gap-3 py-4 px-6">
            <div className="h-8 w-8 bg-slate-100 text-[#004B87] rounded-full flex items-center justify-center font-bold">
              <Camera className="h-4 w-4" />
            </div>
            <CardTitle className="text-base font-bold text-[#003366]">
              Fotografía de Identificación Oficial
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              {/* Preview Box */}
              <div className="h-32 w-28 bg-slate-100 rounded-lg border-2 border-dashed border-slate-200 overflow-hidden flex flex-col items-center justify-center relative flex-shrink-0">
                {formData.foto ? (
                  <img
                    src={formData.foto}
                    alt="Foto de perfil"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-2 text-slate-400">
                    <User className="h-8 w-8 mx-auto opacity-40 mb-1" />
                    <span className="text-[10px] block leading-tight">Sin Foto cargada</span>
                  </div>
                )}
              </div>

              {/* Upload controls */}
              <div className="flex-1 space-y-4">
                <p className="text-xs text-slate-500 leading-relaxed">
                  Carga una fotografía digital reciente de frente, con fondo claro o blanco.
                  Formatos recomendados: JPG o PNG. Tamaño máximo de archivo: 2 MB.
                </p>
                <div className="flex items-center gap-3">
                  <label
                    htmlFor="foto-upload"
                    className="h-10 px-4 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer text-xs font-bold flex items-center justify-center gap-2"
                  >
                    📁 Seleccionar Archivo
                  </label>
                  <input
                    id="foto-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {formData.foto && (
                    <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 animate-pulse">
                      ✓ Foto cargada
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Button */}
        <Button
          type="submit"
          disabled={enviando}
          className="w-full h-12 bg-[#004B87] hover:bg-[#003366] text-white font-bold rounded-xl shadow-lg shadow-[#004B87]/20 transition-all duration-200 flex items-center justify-center gap-2"
        >
          {enviando ? (
            <>
              <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Guardando en base de datos...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Guardar Ficha en Sistema (PostgreSQL)
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
