"use client"

import { useState, useRef } from "react"
import {
  Receipt,
  CreditCard,
  Banknote,
  Upload,
  CheckCircle2,
  X,
  Wallet,
  Building2,
} from "lucide-react"
import type { TailoringData } from "./tailoring-section"
import type { Fabric } from "./fabrics-section"
import type { CartItem } from "./readymade-section"

interface OrderSummaryProps {
  tailoringData: TailoringData
  selectedFabric: string | null
  fabrics: Fabric[]
  cart: CartItem[]
  whatsappNumber: string
}

type PaymentMethod = "cash" | "transfer" | "card"

export function OrderSummary({
  tailoringData,
  selectedFabric,
  fabrics,
  cart,
  whatsappNumber,
}: OrderSummaryProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null)
  const [receiptImage, setReceiptImage] = useState<string | null>(null)
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("0967773463560") // الرقم المحدث
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const selectedFabricData = fabrics.find((f) => f.id === selectedFabric)

  const tailoringPrice = selectedFabricData ? selectedFabricData.price : 0
  const hasTailoringOrder =
    Object.values(tailoringData.measurements).some((v) => v) ||
    tailoringData.neckType ||
    tailoringData.cuffType

  const readymadeTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tailoringServiceFee = hasTailoringOrder ? 150 : 0
  const grandTotal = tailoringPrice + tailoringServiceFee + readymadeTotal
  const depositAmount = grandTotal * 0.5 // حساب العربون 50%

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => {
        setReceiptImage(ev.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const buildWhatsAppMessage = () => {
    let msg = `*طلب جديد - خياط اليرموك*\n\n`
    msg += `*اسم العميل:* ${customerName}\n`
    msg += `*رقم الجوال:* ${customerPhone}\n\n`

    if (hasTailoringOrder) {
      msg += `*--- قسم التفصيل ---*\n`
      const labels: Record<string, string> = {
        height: "الطول",
        shoulder: "الكتف",
        armLength: "طول اليد",
        chestWidth: "وسع الصدر",
        neck: "الرقبة",
        armWidth: "وسط اليد",
        cuffLength: "طول الكبك",
        stepWidth: "وسع الخطوة",
      }
      Object.entries(tailoringData.measurements).forEach(([key, value]) => {
        if (value) msg += `${labels[key] || key}: ${value} إنش\n`
      })
      if (tailoringData.neckType) msg += `نوع الرقبة: ${tailoringData.neckType}\n`
      if (tailoringData.cuffType) msg += `نوع الكبك: ${tailoringData.cuffType}\n`
      if (tailoringData.chestType) msg += `نوع جبزور الصدر: ${tailoringData.chestType}\n`
      if (tailoringData.tailorType) msg += `نوع الخياطة: ${tailoringData.tailorType}\n`
      if (selectedFabricData) msg += `القماش: ${selectedFabricData.name} - ${selectedFabricData.price} ريال\n`
      msg += `أجرة التفصيل: ${tailoringServiceFee} ريال\n\n`
    }

    if (cart.length > 0) {
      msg += `*--- ملابس جاهزة ---*\n`
      cart.forEach((item) => {
        msg += `${item.name} × ${item.quantity} = ${item.price * item.quantity} ريال\n`
      })
      msg += `\n`
    }

    msg += `*الإجمالي: ${grandTotal} ريال يمني*\n`
    msg += `*طريقة الدفع:* ${
      paymentMethod === "cash" ? "نقدي (تم إبلاغ العميل بدفع 50% عربون)" : paymentMethod === "transfer" ? "تحويل بنكي" : "بطاقة"
    }\n`

    return encodeURIComponent(msg)
  }

  const handleConfirmOrder = () => {
    if (!customerName || !customerPhone) {
      alert("يرجى إدخال الاسم ورقم الجوال")
      return
    }
    if (!paymentMethod) {
      alert("يرجى اختيار طريقة الدفع")
      return
    }
    if (grandTotal === 0) {
      alert("السلة فارغة")
      return
    }

    setIsSubmitting(true)
    const msg = buildWhatsAppMessage()
    const cleanNumber = whatsappNumber.replace(/\D/g, "")
    window.open(`https://wa.me/${cleanNumber}?text=${msg}`, "_blank")

    setTimeout(() => {
      setIsSubmitting(false)
      setIsConfirmed(true)
    }, 1000)
  }

  if (isConfirmed) {
    return (
      <section className="py-16">
        <div className="mx-auto max-w-md px-4 text-center">
          <div className="rounded-lg border border-primary/30 bg-card p-8">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/15">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <h2 className="mb-2 font-serif text-2xl font-bold text-foreground">{"تم تأكيد الطلب بنجاح"}</h2>
            <p className="mb-6 text-muted-foreground">{"شكرًا لك! تم إرسال طلبك عبر واتساب، سنتواصل معك فور مراجعة الإيصال."}</p>
            <button
              onClick={() => setIsConfirmed(false)}
              className="mt-6 rounded-md bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              {"طلب جديد"}
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="mb-6 flex items-center gap-3 font-serif text-2xl font-bold text-foreground">
            <Receipt className="h-6 w-6 text-primary" />
            {"ملخص الطلب والإجمالي"}
          </h2>

          <div className="mb-6 grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-muted-foreground">{"اسم العميل"}</label>
              <input
                type="text"
                placeholder="أدخل اسمك الكامل"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full rounded-md border border-border bg-secondary px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-muted-foreground">{"رقم الجوال"}</label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full rounded-md border border-border bg-secondary px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                dir="ltr"
              />
            </div>
          </div>

          <div className="mb-6 space-y-3">
            {hasTailoringOrder && (
              <div className="flex items-center justify-between rounded-md border border-border bg-secondary p-3">
                <span className="text-foreground">{"خدمة التفصيل"}</span>
                <span className="font-bold text-primary">{tailoringServiceFee} {"ريال يمني"}</span>
              </div>
            )}
            {selectedFabricData && (
              <div className="flex items-center justify-between rounded-md border border-border bg-secondary p-3">
                <span className="text-foreground">{"قماش: "}{selectedFabricData.name}</span>
                <span className="font-bold text-primary">{selectedFabricData.price} {"ريال يمني"}</span>
              </div>
            )}
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-md border border-border bg-secondary p-3">
                <span className="text-foreground">{item.name} × {item.quantity}</span>
                <span className="font-bold text-primary">{item.price * item.quantity} {"ريال يمني"}</span>
              </div>
            ))}
          </div>

          <div className="mb-6 rounded-md border-2 border-primary bg-primary/10 p-4 text-center">
            <span className="text-sm text-muted-foreground">{"الإجمالي الكامل"}</span>
            <p className="font-serif text-3xl font-bold text-primary">{grandTotal} {"ريال يمني"}</p>
          </div>

          <div className="mb-6">
            <h3 className="mb-4 font-serif text-lg font-bold text-foreground">{"طريقة الدفع"}</h3>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setPaymentMethod("cash")}
                className={`flex flex-col items-center gap-2 rounded-md border p-4 transition-all ${
                  paymentMethod === "cash" ? "border-primary bg-primary/15 text-primary" : "border-border bg-secondary"
                }`}
              >
                <Banknote className="h-6 w-6" />
                <span className="text-sm">{"نقدي"}</span>
              </button>
              <button
                onClick={() => setPaymentMethod("transfer")}
                className={`flex flex-col items-center gap-2 rounded-md border p-4 transition-all ${
                  paymentMethod === "transfer" ? "border-primary bg-primary/15 text-primary" : "border-border bg-secondary"
                }`}
              >
                <CreditCard className="h-6 w-6" />
                <span className="text-sm">{"تحويل"}</span>
              </button>
              <button
                onClick={() => setPaymentMethod("card")}
                className={`flex flex-col items-center gap-2 rounded-md border p-4 transition-all ${
                  paymentMethod === "card" ? "border-primary bg-primary/15 text-primary" : "border-border bg-secondary"
                }`}
              >
                <CreditCard className="h-6 w-6" />
                <span className="text-sm">{"بطاقة"}</span>
              </button>
            </div>
          </div>

          {/* تنبيه الدفع النقدي */}
          {paymentMethod === "cash" && (
            <div className="mb-6 rounded-md border border-amber-500/50 bg-amber-500/10 p-4">
              <p className="text-sm text-amber-600 font-bold">
                {"* تنبيه: عند اختيار الدفع النقدي، يتوجب عليك دفع 50% من قيمة الفاتورة كعربون ( "}{depositAmount}{" ريال يمني ) لبدء العمل."}
              </p>
            </div>
          )}

          {/* بيانات التحويل البنكي */}
          {paymentMethod === "transfer" && (
            <div className="mb-6 space-y-4">
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-md border border-primary/20 bg-primary/5 p-4">
                  <div className="flex items-center gap-2 mb-2 text-primary">
                    <Building2 className="h-5 w-5" />
                    <span className="font-bold">{"حساب الكريمي"}</span>
                  </div>
                  <p className="text-lg font-mono font-bold tracking-wider">{"123456789"}</p>
                  <p className="text-xs text-muted-foreground mt-1">{"باسم: خياط اليرموك"}</p>
                </div>
                <div className="rounded-md border border-primary/20 bg-primary/5 p-4">
                  <div className="flex items-center gap-2 mb-2 text-primary">
                    <Wallet className="h-5 w-5" />
                    <span className="font-bold">{"محفظة جيب (Jeeb)"}</span>
                  </div>
                  <p className="text-lg font-mono font-bold tracking-wider">{"777346356"}</p>
                  <p className="text-xs text-muted-foreground mt-1">{"رقم الحساب المرتبط بالجوال"}</p>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="mb-3 font-serif text-lg font-bold text-foreground">{"رفع إيصال التحويل"}</h3>
                {receiptImage ? (
                  <div className="relative inline-block">
                    <img src={receiptImage} alt="إيصال" className="h-40 rounded-md border object-contain" />
                    <button onClick={() => setReceiptImage(null)} className="absolute -left-2 -top-2 rounded-full bg-destructive p-1 text-white">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex w-full flex-col items-center gap-2 rounded-md border-2 border-dashed py-8 text-muted-foreground hover:border-primary/50"
                  >
                    <Upload className="h-8 w-8" />
                    <span className="text-sm">{"اضغط لرفع صورة الإيصال لسرعة التأكيد"}</span>
                  </button>
                )}
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </div>
            </div>
          )}

          <button
            onClick={handleConfirmOrder}
            disabled={isSubmitting}
            className="w-full rounded-md bg-primary py-4 text-base font-bold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
          >
            {isSubmitting ? "جاري المعالجة..." : "إرسال الطلب عبر واتساب"}
          </button>
        </div>
      </div>
    </section>
  )
}
