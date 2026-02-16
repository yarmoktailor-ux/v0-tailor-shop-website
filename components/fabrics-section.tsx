"use client"

import Link from "next/link"
import { Scissors, Menu } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        
        {/* جهة الشعار */}
        <Link href="/" className="flex items-center gap-3">
          {/* إضافة صورة الشعار هنا */}
          <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-primary/30">
            <img 
              src="/logo.jpg" // تأكد من رفع صورة الشعار بهذا الاسم في مجلد public
              alt="شعار خياط اليرموك" 
              className="h-full w-full object-cover"
              onError={(e) => {
                // في حال فشل تحميل الصورة يظهر رمز بديل
                e.currentTarget.style.display = 'none';
              }}
            />
            {/* رمز احتياطي يظهر فقط إذا لم تتوفر الصورة */}
            <Scissors className="absolute inset-0 m-auto h-8 w-8 text-primary opacity-20" />
          </div>
          
          <div className="flex flex-col">
            <span className="font-serif text-xl font-bold tracking-wider text-primary">
              خياط اليرموك
            </span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
              Yarmouk Tailor
            </span>
          </div>
        </Link>

        {/* زر القائمة للهواتف */}
        <button className="rounded-md p-2 hover:bg-secondary">
          <Menu className="h-6 w-6 text-primary" />
        </button>
      </div>
    </header>
  )
}
