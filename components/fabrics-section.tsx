"use client"

import { useState, useRef } from "react"
import { ChevronDown, ChevronUp, Plus, Trash2, Edit3, Check, Shirt, ImagePlus, X } from "lucide-react"
import Image from "next/image"

export interface Fabric {
  id: string
  name: string
  price: number
  description: string
  image?: string
}

interface FabricsSectionProps {
  fabrics: Fabric[]
  onFabricsChange: (fabrics: Fabric[]) => void
  selectedFabric: string | null
  onSelectFabric: (id: string | null) => void
}

export function FabricsSection({
  fabrics,
  onFabricsChange,
  selectedFabric,
  onSelectFabric,
}: FabricsSectionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newFabric, setNewFabric] = useState({ name: "", price: "", description: "" })
  const [showAdd, setShowAdd] = useState(false)

  const addFabric = () => {
    if (!newFabric.name || !newFabric.price) return
    const fabric: Fabric = {
      id: Date.now().toString(),
      name: newFabric.name,
      price: Number(newFabric.price),
      description: newFabric.description,
    }
    onFabricsChange([...fabrics, fabric])
    setNewFabric({ name: "", price: "", description: "" })
    setShowAdd(false)
  }

  const removeFabric = (id: string) => {
    onFabricsChange(fabrics.filter((f) => f.id !== id))
    if (selectedFabric === id) onSelectFabric(null)
  }

  const updateFabric = (id: string, updates: Partial<Fabric>) => {
    onFabricsChange(fabrics.map((f) => (f.id === id ? { ...f, ...updates } : f)))
  }

  return (
    <section id="fabrics" className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/50"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary bg-primary/10">
              <Shirt className="h-6 w-6 text-primary" />
            </div>
            <div className="text-right">
              <h2 className="font-serif text-2xl font-bold text-foreground">{"عرض الأقمشة"}</h2>
              <p className="text-sm text-muted-foreground">{"استعرض الأقمشة المتاحة وأسعارها"}</p>
            </div>
          </div>
          {isOpen ? (
            <ChevronUp className="h-6 w-6 text-primary" />
          ) : (
            <ChevronDown className="h-6 w-6 text-primary" />
          )}
        </button>

        {isOpen && (
          <div className="mt-4 space-y-4 rounded-lg border border-border bg-card p-6">
            {/* Fabrics List */}
            {fabrics.length === 0 && (
              <p className="py-8 text-center text-muted-foreground">{"لا توجد أقمشة حاليًا. أضف قماشًا جديدًا."}</p>
            )}

            <div className="space-y-3">
              {fabrics.map((fabric) => (
                <div
                  key={fabric.id}
                  className={`rounded-lg border p-4 transition-all ${
                    selectedFabric === fabric.id
                      ? "border-primary bg-primary/10"
                      : "border-border bg-secondary hover:border-primary/30"
                  }`}
                >
                  {editingId === fabric.id ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={fabric.name}
                        onChange={(e) => updateFabric(fabric.id, { name: e.target.value })}
                        className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                        placeholder="اسم القماش"
                      />
                      <input
                        type="number"
                        value={fabric.price}
                        onChange={(e) => updateFabric(fabric.id, { price: Number(e.target.value) })}
                        className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                        placeholder="السعر"
                      />
                      <textarea
                        value={fabric.description}
                        onChange={(e) => updateFabric(fabric.id, { description: e.target.value })}
                        className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                        placeholder="وصف القماش"
                        rows={2}
                      />
                      <button
                        onClick={() => setEditingId(null)}
                        className="flex items-center gap-1 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
                      >
                        <Check className="h-4 w-4" />
                        {"حفظ"}
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-4">
                      <button
                        onClick={() => onSelectFabric(selectedFabric === fabric.id ? null : fabric.id)}
                        className="flex-1 text-right"
                      >
                        <h4 className="text-base font-bold text-foreground">{fabric.name}</h4>
                        <p className="mt-1 text-sm text-muted-foreground">{fabric.description}</p>
                        <p className="mt-2 font-serif text-lg font-bold text-primary">
                          {fabric.price} {"ر.س"}
                        </p>
                      </button>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingId(fabric.id)}
                          className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-background hover:text-primary"
                          aria-label="edit"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => removeFabric(fabric.id)}
                          className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-background hover:text-destructive"
                          aria-label="delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Add Fabric Form */}
            {showAdd ? (
              <div className="space-y-3 rounded-lg border border-primary/30 bg-secondary p-4">
                <h4 className="font-bold text-primary">{"إضافة قماش جديد"}</h4>
                <input
                  type="text"
                  placeholder="اسم القماش"
                  value={newFabric.name}
                  onChange={(e) => setNewFabric({ ...newFabric, name: e.target.value })}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="السعر (ر.س)"
                  value={newFabric.price}
                  onChange={(e) => setNewFabric({ ...newFabric, price: e.target.value })}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
                <textarea
                  placeholder="وصف القماش"
                  value={newFabric.description}
                  onChange={(e) => setNewFabric({ ...newFabric, description: e.target.value })}
                  className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  rows={2}
                />
                <div className="flex gap-3">
                  <button
                    onClick={addFabric}
                    className="rounded-md bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                  >
                    {"إضافة"}
                  </button>
                  <button
                    onClick={() => {
                      setShowAdd(false)
                      setNewFabric({ name: "", price: "", description: "" })
                    }}
                    className="rounded-md border border-border px-6 py-2 text-sm text-foreground hover:bg-background"
                  >
                    {"إلغاء"}
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowAdd(true)}
                className="flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-primary/40 py-3 text-sm text-primary transition-colors hover:bg-primary/5"
              >
                <Plus className="h-4 w-4" />
                {"إضافة قماش جديد"}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
