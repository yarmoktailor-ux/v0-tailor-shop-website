"use client"

import Image from "next/image"
import { ChevronDown } from "lucide-react"

interface HeroSectionProps {
  onNavigate: (section: string) => void
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-tailor.jpg"
          alt="خياط اليرموك - محل خياطة فاخر"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-background/70" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <div className="mb-6 inline-block rounded-full border border-primary/30 bg-primary/10 px-6 py-2">
          <span className="text-sm text-primary">{"منذ عام 2002"}</span>
        </div>

        <h1 className="mb-6 font-serif text-5xl font-bold leading-tight text-foreground md:text-7xl">
          <span className="text-primary">{"خياط"}</span>{" "}
          {"اليرموك"}
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          {"أناقة لا تُضاهى وحرفية عالية في التفصيل والخياطة الرجالية. نقدم لكم أجود الأقمشة وأرقى التصاميم منذ أكثر من ٢٠ عامًا"}
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={() => onNavigate("tailoring")}
            className="rounded-md bg-primary px-8 py-3 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90"
          >
            {"قسم التفصيل"}
          </button>
          <button
            onClick={() => onNavigate("fabrics")}
            className="rounded-md border border-primary bg-transparent px-8 py-3 text-base font-semibold text-primary transition-all hover:bg-primary/10"
          >
            {"عرض الأقمشة"}
          </button>
          <button
            onClick={() => onNavigate("readymade")}
            className="rounded-md border border-border bg-transparent px-8 py-3 text-base font-semibold text-foreground transition-all hover:bg-secondary"
          >
            {"ملابس جاهزة"}
          </button>
        </div>
      </div>

      <button
        onClick={() => onNavigate("tailoring")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        aria-label="scroll down"
      >
        <ChevronDown className="h-8 w-8 text-primary" />
      </button>
    </section>
  )
}
