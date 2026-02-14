"use client"

import { Scissors } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-8">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <Scissors className="h-5 w-5 text-primary" />
          <span className="font-serif text-lg font-bold text-primary">{"خياط اليرموك"}</span>
        </div>
        <p className="text-sm text-muted-foreground">
          {"جميع الحقوق محفوظة"} {"2002 - 2026"} {"خياط اليرموك"}
        </p>
      </div>
    </footer>
  )
}
