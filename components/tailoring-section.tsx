"use client"

import { useState } from "react"
import { Ruler, ChevronDown, ChevronUp } from "lucide-react"

export interface TailoringData {
  measurements: Record<string, string>
  neckType: string
  cuffType: string
  chestType: string
  tailorType: string
  notes: string
}

interface TailoringSectionProps {
  data: TailoringData
  onChange: (data: TailoringData) => void
}

const measurementFields = [
  { key: "height", label: "الطول" },
  { key: "shoulder", label: "الكتف" },
  { key: "armLength", label: "طول اليد" },
  { key: "chestWidth", label: "وسع الصدر" },
  { key: "neck", label: "الرقبة" },
  { key: "armWidth", label: "وسط اليد" },
  { key: "cuffLength", label: "طول الكبك" },
  { key: "stepWidth", label: "وسع الخطوة (تحت)" },
]

const neckTypes = [
  "قلاب ملكي",
  "قلاب فرنسي",
  "قلاب دائري",
  "سادة مربع",
  "سادة دائري",
  "صيني",
]

const cuffTypes = [
  "كبك قماش",
  "كبك حشو مربع",
  "كبك حشو دائري",
  "سادة بدون زرار",
]

const chestTypes = [
  "كبس ظاهر",
  "كبس مخفي",
  "زرار مخفي",
  "سحاب",
]

const tailorTypes = [
  "قطري",
  "سعودي",
  "حجازي",
  "عماني",
  "كويتي",
]

export function TailoringSection({ data, onChange }: TailoringSectionProps) {
  const [isOpen, setIsOpen] = useState(false)

  const updateMeasurement = (key: string, value: string) => {
    onChange({
      ...data,
      measurements: { ...data.measurements, [key]: value },
    })
  }

  const updateField = (field: keyof TailoringData, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <section id="tailoring" className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/50"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary bg-primary/10">
              <Ruler className="h-6 w-6 text-primary" />
            </div>
            <div className="text-right">
              <h2 className="font-serif text-2xl font-bold text-foreground">{"قسم التفصيل"}</h2>
              <p className="text-sm text-muted-foreground">{"أدخل المقاسات وتفاصيل الخياطة"}</p>
            </div>
          </div>
          {isOpen ? (
            <ChevronUp className="h-6 w-6 text-primary" />
          ) : (
            <ChevronDown className="h-6 w-6 text-primary" />
          )}
        </button>

        {isOpen && (
          <div className="mt-4 space-y-8 rounded-lg border border-border bg-card p-6">
            {/* Measurements Grid */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 font-serif text-lg font-bold text-primary">
                <span className="h-px flex-1 bg-border" />
                {"المقاسات (إنش)"}
                <span className="h-px flex-1 bg-border" />
              </h3>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {measurementFields.map((field) => (
                  <div key={field.key}>
                    <label className="mb-1 block text-sm text-muted-foreground">
                      {field.label}
                    </label>
                    <input
                      type="number"
                      step="0.25"
                      placeholder="0"
                      value={data.measurements[field.key] || ""}
                      onChange={(e) => updateMeasurement(field.key, e.target.value)}
                      className="w-full rounded-md border border-border bg-secondary px-3 py-2 text-center text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Neck Type */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 font-serif text-lg font-bold text-primary">
                <span className="h-px flex-1 bg-border" />
                {"نوع الرقبة"}
                <span className="h-px flex-1 bg-border" />
              </h3>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {neckTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => updateField("neckType", type)}
                    className={`rounded-md border px-4 py-3 text-sm transition-all ${
                      data.neckType === type
                        ? "border-primary bg-primary/15 text-primary"
                        : "border-border bg-secondary text-foreground hover:border-primary/50"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Cuff Type */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 font-serif text-lg font-bold text-primary">
                <span className="h-px flex-1 bg-border" />
                {"نوع الكبك"}
                <span className="h-px flex-1 bg-border" />
              </h3>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {cuffTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => updateField("cuffType", type)}
                    className={`rounded-md border px-4 py-3 text-sm transition-all ${
                      data.cuffType === type
                        ? "border-primary bg-primary/15 text-primary"
                        : "border-border bg-secondary text-foreground hover:border-primary/50"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Chest Type */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 font-serif text-lg font-bold text-primary">
                <span className="h-px flex-1 bg-border" />
                {"نوع جبزور الصدر"}
                <span className="h-px flex-1 bg-border" />
              </h3>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {chestTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => updateField("chestType", type)}
                    className={`rounded-md border px-4 py-3 text-sm transition-all ${
                      data.chestType === type
                        ? "border-primary bg-primary/15 text-primary"
                        : "border-border bg-secondary text-foreground hover:border-primary/50"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Tailor Type */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 font-serif text-lg font-bold text-primary">
                <span className="h-px flex-1 bg-border" />
                {"نوع الخياطة"}
                <span className="h-px flex-1 bg-border" />
              </h3>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
                {tailorTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => updateField("tailorType", type)}
                    className={`rounded-md border px-4 py-3 text-sm transition-all ${
                      data.tailorType === type
                        ? "border-primary bg-primary/15 text-primary"
                        : "border-border bg-secondary text-foreground hover:border-primary/50"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 font-serif text-lg font-bold text-primary">
                <span className="h-px flex-1 bg-border" />
                {"ملاحظات"}
                <span className="h-px flex-1 bg-border" />
              </h3>
              <textarea
                rows={3}
                placeholder="أدخل أي ملاحظات إضافية هنا..."
                value={data.notes}
                onChange={(e) => updateField("notes", e.target.value)}
                className="w-full resize-none rounded-md border border-border bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
