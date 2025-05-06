import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  path: string
  active?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn('flex', className)} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {items.map((item, index) => (
          <li key={item.path} className="inline-flex items-center">
            {index > 0 && <ChevronRight className="mx-1 h-4 w-4 text-muted-foreground" />}
            
            <Link 
              href={item.path}
              className={cn(
                'inline-flex items-center text-sm font-medium',
                item.active 
                  ? 'text-foreground cursor-default' 
                  : 'text-muted-foreground hover:text-foreground'
              )}
              aria-current={item.active ? 'page' : undefined}
            >
              {index === 0 && <Home className="mr-1 h-4 w-4" />}
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
} 