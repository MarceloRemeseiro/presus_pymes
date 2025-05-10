"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FileText, Home, Package, Settings, ShoppingCart, Users, Receipt, UserCircle, ShoppingBag, DollarSign, LogOut } from "lucide-react"
import { toast } from "sonner"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"

export function AppSidebar() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    toast.dismiss();

    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || 'Error al cerrar sesión.');
      } else {
        toast.success(data.message || 'Sesión cerrada exitosamente.');
        router.push('/login');
        router.refresh();
      }
    } catch (error) {
      console.error('Error en el request de logout:', error);
      toast.error('Ocurrió un error inesperado al cerrar sesión.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2 px-4 py-3">
          <span className="font-semibold text-xl">Lumar Solutions Group SL</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="py-2">
        <SidebarGroup>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/">
                    <Home className="w-4 h-4 mr-2" />
                    Inicio
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/inventario">
                    <Package className="w-4 h-4 mr-2" />
                    Inventario
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/personal">
                    <UserCircle className="w-4 h-4 mr-2" />
                    Personal
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/puestos">
                    <UserCircle className="w-4 h-4 mr-2" />
                    Puestos
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/proveedores">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Proveedores
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/clientes">
                    <Users className="w-4 h-4 mr-2" />
                    Clientes
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/presupuestos">
                    <FileText className="w-4 h-4 mr-2" />
                    Presupuestos
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/facturas">
                    <Receipt className="w-4 h-4 mr-2" />
                    Facturas
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/gastos">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Gastos
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Administración</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/configuracion">
                    <Settings className="w-4 h-4 mr-2" />
                    Configuración
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <div className="flex flex-col space-y-2">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-sm" 
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <LogOut className="w-4 h-4 mr-2" />
            {isLoggingOut ? "Cerrando sesión..." : "Cerrar Sesión"}
          </Button>
          <div className="flex items-center justify-between">
            <ThemeToggle />
            <span className="text-xs text-muted-foreground">v1.0.0</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
} 