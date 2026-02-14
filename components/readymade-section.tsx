"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown, ChevronUp, Minus, Plus, ShoppingBag } from "lucide-react"

export interface ReadymadeItem {
  id: string
  name: string
  price: number
  description: string
  image: string
  category: "thobes" | "jackets" | "shawls"
}

export interface CartItem extends ReadymadeItem {
  quantity: number
}

interface ReadymadeSectionProps {
  cart: CartItem[]
  onCartChange: (cart: CartItem[]) => void
}

const defaultProducts: ReadymadeItem[] = [
  {
    id: "thobe-1",
    name: "ثوب كلاسيكي أبيض",
    price: 250,
    description: "ثوب أبيض فاخر من أجود أنواع القطن المصري، تصميم كلاسيكي أنيق",
    image: "/images/thobe.jpg",
    category: "thobes",
  },
  {
    id: "thobe-2",
    name: "ثوب سعودي فاخر",
    price: 320,
    description: "ثوب سعودي مميز بقصّة عصرية وخامة ممتازة تناسب جميع المناسبات",
    image: "/images/thobe.jpg",
    category: "thobes",
  },
  {
    id: "jacket-1",
    name: "بشت ملكي مطرّز",
    price: 850,
    description: "بشت فاخر بتطريز ذهبي يدوي، مناسب للمناسبات الرسمية والأعراس",
    image: "/images/jacket.jpg",
    category: "jackets",
  },
  {
    id: "jacket-2",
    name: "جاكيت شتوي أنيق",
    price: 450,
    description: "جاكيت رجالي شتوي من الصوف الفاخر، تصميم عصري وأنيق",
    image: "/images/jacket.jpg",
    category: "jackets",
  },
  {
    id: "shawl-1",
    name: "شيلة حرير ملكية",
    price: 180,
    description: "شيلة حرير طبيعي فاخرة بلمسة ذهبية، ناعمة الملمس",
    image: "/images/shawl.jpg",
    category: "shawls",
  },
  {
    id: "shawl-2",
    name: "شماغ تقليدي فاخر",
    price: 120,
    description: "شماغ تقليدي من أجود الأقمشة، مناسب لجميع الأوقات",
    image: "/images/shawl.jpg",
    category: "shawls",
  },
]

const categories = [
  { key: "thobes" as const, label: "الثياب الجاهزة" },
  { key: "jackets" as const, label: "الأكوات والبشوت" },
  { key: "shawls" as const, label: "الشيلان والأشمغة" },
]

export function ReadymadeSection({ cart, onCartChange }: ReadymadeSectionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<"thobes" | "jackets" | "shawls">("thobes")

  const addToCart = (product: ReadymadeItem) => {
    const existing = cart.find((item) => item.id === product.id)
    if (existing) {
      onCartChange(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      )
    } else {
      onCartChange([...cart, { ...product, quantity: 1 }])
    }
  }

  const updateQuantity = (id: string, delta: number) => {
    onCartChange(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const getQuantity = (id: string) => {
    return cart.find((item) => item.id === id)?.quantity || 0
  }

  const filtered = defaultProducts.filter((p) => p.category === activeCategory)

  return (
    <section id="readymade" className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/50"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary bg-primary/10">
              <ShoppingBag className="h-6 w-6 text-primary" />
            </div>
            <div className="text-right">
              <h2 className="font-serif text-2xl font-bold text-foreground">{"الملابس الجاهزة"}</h2>
              <p className="text-sm text-muted-foreground">{"ثياب، أكوات، وشيلان جاهزة للشراء"}</p>
            </div>
          </div>
          {isOpen ? (
            <ChevronUp className="h-6 w-6 text-primary" />
          ) : (
            <ChevronDown className="h-6 w-6 text-primary" />
          )}
        </button>

        {isOpen && (
          <div className="mt-4 rounded-lg border border-border bg-card p-6">
            {/* Category Tabs */}
            <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`whitespace-nowrap rounded-md px-5 py-2 text-sm font-medium transition-all ${
                    activeCategory === cat.key
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-secondary text-foreground hover:border-primary/50"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid gap-4 md:grid-cols-2">
              {filtered.map((product) => {
                const qty = getQuantity(product.id)
                return (
                  <div
                    key={product.id}
                    className="overflow-hidden rounded-lg border border-border bg-secondary transition-all hover:border-primary/30"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-serif text-lg font-bold text-foreground">{product.name}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="font-serif text-xl font-bold text-primary">
                          {product.price} {"ر.س"}
                        </span>
                        {qty > 0 ? (
                          <div className="flex items-center gap-3 rounded-md border border-primary bg-primary/10 px-2 py-1">
                            <button
                              onClick={() => updateQuantity(product.id, -1)}
                              className="text-primary hover:text-primary/80"
                              aria-label="decrease"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="min-w-[20px] text-center font-bold text-primary">
                              {qty}
                            </span>
                            <button
                              onClick={() => updateQuantity(product.id, 1)}
                              className="text-primary hover:text-primary/80"
                              aria-label="increase"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(product)}
                            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
                          >
                            {"أضف للسلة"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
