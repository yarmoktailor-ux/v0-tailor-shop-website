"use client"

import { Award, Calendar, Users, Star } from "lucide-react"

const milestones = [
  {
    year: "2002",
    title: "البداية",
    description: "تأسيس محل خياط اليرموك بأيادٍ سعودية وخبرة في فن التفصيل التقليدي",
  },
  {
    year: "2007",
    title: "التوسع",
    description: "توسيع المحل وإضافة قسم الأقمشة الفاخرة المستوردة من أرقى المصانع العالمية",
  },
  {
    year: "2012",
    title: "التميّز",
    description: "حصولنا على ثقة أكثر من ٥٠٠٠ عميل دائم وسمعة مميزة في عالم الخياطة",
  },
  {
    year: "2018",
    title: "التطوير",
    description: "إدخال أحدث تقنيات الخياطة والتفصيل مع الحفاظ على اللمسة اليدوية التقليدية",
  },
  {
    year: "2024",
    title: "الرقمنة",
    description: "إطلاق الموقع الإلكتروني لتسهيل طلبات التفصيل والملابس الجاهزة",
  },
]

const stats = [
  { icon: Calendar, value: "+22", label: "سنة خبرة" },
  { icon: Users, value: "+10,000", label: "عميل سعيد" },
  { icon: Star, value: "+50,000", label: "ثوب مفصّل" },
  { icon: Award, value: "#1", label: "في المنطقة" },
]

export function HistorySection() {
  return (
    <section id="history" className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-12 text-center">
          <span className="mb-2 inline-block text-sm text-primary">{"تاريخنا"}</span>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            {"رحلة "}<span className="text-primary">{"٢٢ عامًا"}</span>{" من التميّز"}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            {"منذ تأسيسنا عام ٢٠٠٢، نسعى لتقديم أفضل خدمات التفصيل والخياطة بحرفية عالية وأقمشة فاخرة"}
          </p>
        </div>

        {/* Stats */}
        <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center rounded-lg border border-border bg-card p-6 text-center"
            >
              <stat.icon className="mb-3 h-8 w-8 text-primary" />
              <span className="font-serif text-3xl font-bold text-primary">{stat.value}</span>
              <span className="mt-1 text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute top-0 bottom-0 right-[19px] w-px bg-border md:right-1/2" />
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className="relative flex gap-6 md:gap-0">
                <div
                  className={`hidden w-1/2 md:block ${
                    index % 2 === 0 ? "pl-8 text-left" : "pr-8 text-right"
                  } ${index % 2 !== 0 ? "order-1" : "order-2"}`}
                >
                  <div className="rounded-lg border border-border bg-card p-5">
                    <h4 className="font-serif text-lg font-bold text-foreground">{milestone.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
                <div className={`relative z-10 flex items-start md:absolute md:right-1/2 md:-translate-x-1/2`}>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background text-xs font-bold text-primary">
                    {milestone.year.slice(2)}
                  </div>
                </div>
                <div className="flex-1 md:hidden">
                  <div className="rounded-lg border border-border bg-card p-4">
                    <h4 className="font-serif text-base font-bold text-foreground">{milestone.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
                <div className={`hidden w-1/2 md:block ${index % 2 === 0 ? "order-2" : "order-1"}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
