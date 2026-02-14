"use client"

import { useState, useCallback, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { TailoringSection, type TailoringData } from "@/components/tailoring-section"
import { FabricsSection, type Fabric } from "@/components/fabrics-section"
import { ReadymadeSection, type CartItem } from "@/components/readymade-section"
import { HistorySection } from "@/components/history-section"
import { OrderSummary } from "@/components/order-summary"
import { Footer } from "@/components/footer"

const defaultFabrics: Fabric[] = [
  {
    id: "f1",
    name: "قماش جوري إنجليزي",
    price: 180,
    description: "قماش إنجليزي فاخر من أجود أنواع الأقمشة، مناسب للثياب الرسمية",
  },
  {
    id: "f2",
    name: "قماش ياباني سوبر",
    price: 220,
    description: "قماش ياباني بجودة عالية ونعومة فائقة، مقاوم للتجعّد",
  },
  {
    id: "f3",
    name: "قماش تركي ممتاز",
    price: 150,
    description: "قماش تركي بسعر مناسب وجودة ممتازة، متعدد الألوان",
  },
  {
    id: "f4",
    name: "قماش إيطالي فاخر",
    price: 350,
    description: "قماش إيطالي من أرقى الماركات العالمية، ملمس حريري فاخر",
  },
]

const WHATSAPP_NUMBER = "966500000000"

export default function HomePage() {
  const [tailoringData, setTailoringData] = useState<TailoringData>({
    measurements: {},
    neckType: "",
    cuffType: "",
    chestType: "",
    tailorType: "",
    notes: "",
  })
  const [fabrics, setFabrics] = useState<Fabric[]>(defaultFabrics)
  const [selectedFabric, setSelectedFabric] = useState<string | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  const handleNavigate = useCallback((section: string) => {
    const el = sectionRefs.current[section]
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [])

  const registerRef = useCallback((section: string, el: HTMLElement | null) => {
    sectionRefs.current[section] = el
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navbar onNavigate={handleNavigate} />

      <div ref={(el) => registerRef("hero", el)}>
        <HeroSection onNavigate={handleNavigate} />
      </div>

      <div ref={(el) => registerRef("tailoring", el)} className="scroll-mt-20">
        <TailoringSection data={tailoringData} onChange={setTailoringData} />
      </div>

      <div ref={(el) => registerRef("fabrics", el)} className="scroll-mt-20">
        <FabricsSection
          fabrics={fabrics}
          onFabricsChange={setFabrics}
          selectedFabric={selectedFabric}
          onSelectFabric={setSelectedFabric}
        />
      </div>

      <div ref={(el) => registerRef("readymade", el)} className="scroll-mt-20">
        <ReadymadeSection cart={cart} onCartChange={setCart} />
      </div>

      <div ref={(el) => registerRef("history", el)} className="scroll-mt-20">
        <HistorySection />
      </div>

      <OrderSummary
        tailoringData={tailoringData}
        selectedFabric={selectedFabric}
        fabrics={fabrics}
        cart={cart}
        whatsappNumber={WHATSAPP_NUMBER}
      />

      <Footer />
    </div>
  )
}
