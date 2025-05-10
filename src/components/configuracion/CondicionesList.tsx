"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle, Trash2, MoveUp, MoveDown, GripVertical } from "lucide-react"
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

interface CondicionesListProps {
  condiciones: string[]
  onChange: (condiciones: string[]) => void
  titulo: string
  placeholder?: string
}

// Componente para cada elemento arrastrable
function SortableItem({id, value, onDelete, onEdit}: { 
  id: string, 
  value: string, 
  onDelete: () => void,
  onEdit: (newValue: string) => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };
  
  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className="flex items-center gap-2 mb-2 group"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab p-1 text-gray-400 hover:text-gray-600"
      >
        <GripVertical size={16} />
      </div>
      <Input
        value={value}
        onChange={(e) => onEdit(e.target.value)}
        className="flex-1"
      />
      <Button 
        type="button" 
        variant="ghost" 
        size="icon" 
        onClick={onDelete}
        className="h-9 w-9 opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-700 hover:bg-red-50"
      >
        <Trash2 size={16} />
      </Button>
    </div>
  );
}

export function CondicionesList({
  condiciones,
  onChange,
  titulo,
  placeholder = "Añadir nueva condición..."
}: CondicionesListProps) {
  const [nuevaCondicion, setNuevaCondicion] = useState("")
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  
  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = condiciones.findIndex(item => `${item}` === active.id);
      const newIndex = condiciones.findIndex(item => `${item}` === over.id);
      
      const newCondiciones = arrayMove(condiciones, oldIndex, newIndex);
      onChange(newCondiciones);
    }
  };
  
  const handleAddCondicion = () => {
    if (nuevaCondicion.trim()) {
      onChange([...condiciones, nuevaCondicion.trim()]);
      setNuevaCondicion("");
    }
  };
  
  const handleDeleteCondicion = (index: number) => {
    const newCondiciones = [...condiciones];
    newCondiciones.splice(index, 1);
    onChange(newCondiciones);
  };
  
  const handleEditCondicion = (index: number, value: string) => {
    const newCondiciones = [...condiciones];
    newCondiciones[index] = value;
    onChange(newCondiciones);
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{titulo}</h3>
      
      <div className="border rounded-md p-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={condiciones.map(item => `${item}`)}
            strategy={verticalListSortingStrategy}
          >
            {condiciones.length === 0 ? (
              <p className="text-sm text-gray-500 py-2">No hay condiciones configuradas. Añade la primera.</p>
            ) : (
              condiciones.map((condicion, index) => (
                <SortableItem
                  key={`${condicion}-${index}`}
                  id={`${condicion}`}
                  value={condicion}
                  onDelete={() => handleDeleteCondicion(index)}
                  onEdit={(newValue) => handleEditCondicion(index, newValue)}
                />
              ))
            )}
          </SortableContext>
        </DndContext>
        
        <div className="flex mt-4">
          <Input
            value={nuevaCondicion}
            onChange={(e) => setNuevaCondicion(e.target.value)}
            placeholder={placeholder}
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddCondicion();
              }
            }}
          />
          <Button
            type="button"
            onClick={handleAddCondicion}
            disabled={!nuevaCondicion.trim()}
            className="ml-2"
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Añadir
          </Button>
        </div>
      </div>
    </div>
  );
} 