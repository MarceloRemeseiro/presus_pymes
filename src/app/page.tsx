import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="py-10">
      <h1 className="text-4xl font-bold mb-8">Bienvenido a Presus Pymes</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Componentes UI</CardTitle>
            <CardDescription>
              Colección de componentes reutilizables con Shadcn UI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Shadcn UI proporciona componentes hermosos y accesibles basados en Radix UI y Tailwind CSS.</p>
          </CardContent>
          <CardFooter>
            <Button>Explorar</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Next.js 15</CardTitle>
            <CardDescription>
              Framework React moderno
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Next.js ofrece renderizado del lado del servidor, generación de sitios estáticos y más.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Aprender más</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
