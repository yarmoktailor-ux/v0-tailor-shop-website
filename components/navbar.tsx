"use client"

import { useState } from "react"
import { Scissors, Menu, X } from "lucide-react"

interface NavbarProps {
  onNavigate: (section: string) => void
}

export function Navbar({ onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = [
    { label: "الرئيسية", section: "hero" },
    { label: "قسم التفصيل", section: "tailoring" },
    { label: "الأقمشة", section: "fabrics" },
    { label: "ملابس جاهزة", section: "readymade" },
    { label: "تاريخ المحل", section: "history" },
  ]

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <button
          onClick={() => onNavigate("hero")}
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary bg-primary/10">
            <Scissors className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold text-primary">خياط اليرموك</h1>
            <p className="text-[10px] tracking-widest text-muted-foreground">{"YARMOUK TAILOR"}</p>
          </div>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <button
              key={link.section}
              onClick={() => onNavigate(link.section)}
              className="rounded-md px-4 py-2 text-sm text-foreground transition-colors hover:bg-secondary hover:text-primary"
            >
              {link.label}
            </button>
          ))}
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-md border border-border md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background md:hidden">
          {links.map((link) => (
            <button
              key={link.section}
              onClick={() => {
                onNavigate(link.section)
                setMobileOpen(false)
              }}
              className="block w-full px-6 py-3 text-right text-sm text-foreground transition-colors hover:bg-secondary hover:text-primary"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
