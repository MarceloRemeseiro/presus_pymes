"use client"

import { useState, useEffect } from "react"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export interface FiltroPeriodoProps {
  onCambio: (filtros: {
    periodo: string;
    año: number;
    trimestre?: number;
    mes?: number;
  }) => void;
}

export function FiltroPeriodo({ onCambio }: FiltroPeriodoProps) {
  const añoActual = new Date().getFullYear();
  const [periodo, setPeriodo] = useState<string>("anual");
  const [año, setAño] = useState<number>(añoActual);
  const [trimestre, setTrimestre] = useState<number>(1);
  const [mes, setMes] = useState<number>(1);

  // Generar los últimos 5 años para seleccionar
  const años = Array.from({ length: 5 }, (_, i) => añoActual - i);
  
  // Meses para seleccionar
  const meses = [
    { valor: 1, nombre: "Enero" },
    { valor: 2, nombre: "Febrero" },
    { valor: 3, nombre: "Marzo" },
    { valor: 4, nombre: "Abril" },
    { valor: 5, nombre: "Mayo" },
    { valor: 6, nombre: "Junio" },
    { valor: 7, nombre: "Julio" },
    { valor: 8, nombre: "Agosto" },
    { valor: 9, nombre: "Septiembre" },
    { valor: 10, nombre: "Octubre" },
    { valor: 11, nombre: "Noviembre" },
    { valor: 12, nombre: "Diciembre" },
  ];

  // Trimestres para seleccionar
  const trimestres = [
    { valor: 1, nombre: "Primer trimestre" },
    { valor: 2, nombre: "Segundo trimestre" },
    { valor: 3, nombre: "Tercer trimestre" },
    { valor: 4, nombre: "Cuarto trimestre" },
  ];

  // Notificar cambios cuando cambie cualquier filtro
  useEffect(() => {
    const filtros = {
      periodo,
      año,
      ...(periodo === "trimestral" && { trimestre }),
      ...(periodo === "mensual" && { mes }),
    };
    onCambio(filtros);
  }, [periodo, año, trimestre, mes, onCambio]);

  return (
    <div className="flex flex-wrap gap-4 items-end mb-6">
      <div>
        <Label htmlFor="periodo">Periodo</Label>
        <Select
          value={periodo}
          onValueChange={(value) => setPeriodo(value)}
        >
          <SelectTrigger id="periodo" className="w-[180px]">
            <SelectValue placeholder="Seleccione periodo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="anual">Anual</SelectItem>
            <SelectItem value="trimestral">Trimestral</SelectItem>
            <SelectItem value="mensual">Mensual</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="año">Año</Label>
        <Select
          value={año.toString()}
          onValueChange={(value) => setAño(parseInt(value))}
        >
          <SelectTrigger id="año" className="w-[120px]">
            <SelectValue placeholder="Seleccione año" />
          </SelectTrigger>
          <SelectContent>
            {años.map((año) => (
              <SelectItem key={año} value={año.toString()}>
                {año}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {periodo === "trimestral" && (
        <div>
          <Label htmlFor="trimestre">Trimestre</Label>
          <Select
            value={trimestre.toString()}
            onValueChange={(value) => setTrimestre(parseInt(value))}
          >
            <SelectTrigger id="trimestre" className="w-[180px]">
              <SelectValue placeholder="Seleccione trimestre" />
            </SelectTrigger>
            <SelectContent>
              {trimestres.map((t) => (
                <SelectItem key={t.valor} value={t.valor.toString()}>
                  {t.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {periodo === "mensual" && (
        <div>
          <Label htmlFor="mes">Mes</Label>
          <Select
            value={mes.toString()}
            onValueChange={(value) => setMes(parseInt(value))}
          >
            <SelectTrigger id="mes" className="w-[180px]">
              <SelectValue placeholder="Seleccione mes" />
            </SelectTrigger>
            <SelectContent>
              {meses.map((m) => (
                <SelectItem key={m.valor} value={m.valor.toString()}>
                  {m.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
} 