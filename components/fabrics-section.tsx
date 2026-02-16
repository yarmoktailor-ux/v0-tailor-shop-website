"use client"

import Link from "next/link"
import { Menu, Scissors } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        
        {/* منطقة الشعار والاسم */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-primary shadow-[0_0_10px_rgba(var(--primary),0.3)]">
            <img 
              src="/logo.jpg" 
              alt="شعار خياط اليرموك" 
              className="h-full w-full object-cover"
              onError={(e) => {
                // في حال عدم توفر الصورة يظهر أيقونة المقص كبديل
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-secondary/10 pointer-events-none">
              <Scissors className="h-6 w-6 text-primary/20" />
            </div>
          </div>
          
          <div className="flex flex-col">
            <h1 className="font-serif text-xl font-bold tracking-tight text-primary">
              خياط اليرموك
            </h1>
            <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] leading-none">
              Yarmouk Tailor
            </span>
          </div>
        </Link>

        {/* زر القائمة الجانبية */}
        <button className="rounded-full p-2 hover:bg-secondary transition-colors text-primary">
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </header>
  )
}
