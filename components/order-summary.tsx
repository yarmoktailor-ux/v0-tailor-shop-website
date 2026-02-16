"use client"

import { useState, useRef, useEffect } from "react"
import {
  Receipt,
  CreditCard,
  Banknote,
  Upload,
  CheckCircle2,
  X,
  Wallet,
  Building2,
  Calendar,
} from "lucide-react"
import type { TailoringData } from "./tailoring-section"
import type { Fabric } from "./fabrics-section"
import type { CartItem } from "./readymade-section"

interface OrderSummaryProps {
  tailoringData: TailoringData
  selectedFabric: string | null
  fabrics: Fabric[]
  cart: CartItem[]
}

export function OrderSummary({
  tailoringData,
  selectedFabric,
  fabrics,
  cart,
}: OrderSummaryProps) {
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "transfer" | null>(null)
  const [receiptImage, setReceiptImage] = useState<string | null>(null)
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [deliveryDate, setDeliveryDate] = useState("")
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderId, setOrderId] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const myStoreNumber = "967773463560"

  // تحديد أقل تاريخ مسموح (اليوم + 5 أيام)
  const [minDate, setMinDate] = useState("")

  useEffect(() => {
    const today = new Date()
    today.setDate(today.getDate() + 5)
    setMinDate(today.toISOString().split("T")[0])
    // توليد رقم طلب فريد
    setOrderId(`YT-${Date.now().toString().slice(-6)}`)
  }, [])

  const selectedFabricData = fabrics.find((f) => f.id === selectedFabric)
  const tailoringPrice = selectedFabricData ? selectedFabricData.price : 0
  const hasTailoringOrder = Object.values(tailoringData.measurements).some((v) => v)
  const tailoringServiceFee = hasTailoringOrder ? 150 : 0
  const readymadeTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const grandTotal = tailoringPrice + tailoringServiceFee + readymadeTotal

  const buildWhatsAppMessage = () => {
    let msg = `*📦 طلب جديد - خياط اليرموك*\n`
    msg += `*رقم الطلب:* ${orderId}\n`
    msg += `--------------------------\n`
    msg += `*👤 العميل:* ${customerName}\n`
    msg += `*📞 هاتف العميل:* ${customerPhone}\n`
    msg += `*📅 تاريخ الاستلام المطلوب:* ${deliveryDate}\n\n`

    if (hasTailoringOrder) {
      msg += `*✂️ تفاصيل التفصيل:*\n`
      const labels: Record<string, string> = {
        height: "الطول", shoulder: "الكتف", armLength: "اليد", 
        chestWidth: "الصدر", neck: "الرقبة", armWidth: "الوسع"
      }
      Object.entries(tailoringData.measurements).forEach(([key, value]) => {
        if (value) msg += `- ${labels[key] || key}: ${value} إنش\n`
      })
      msg += `- نوع الرقبة: ${tailoringData.neckType || "عادي"}\n`
      msg += `- نوع الكبك: ${tailoringData.cuffType || "عادي"}\n`
      msg += `- نوع الخياطة: ${tailoringData.tailorType || "عادي"}\n`
      if (selectedFabricData) msg += `- القماش: ${selectedFabricData.name}\n`
      msg += `\n`
    }

    if (cart.length > 0) {
      msg += `*🛍️ جاهز:*\n`
      cart.forEach(item => msg += `- ${item.name} × ${item.quantity}\n`)
      msg += `\n`
    }

    msg += `*💰 الإجمالي:* ${grandTotal} ريال يمني\n`
    msg += `*💳 الدفع:* ${paymentMethod === "cash" ? "نقدي (عربون 50%)" : "تحويل بنكي"}\n`
    if (receiptImage) msg += `*📸 ملاحظة:* تم إرفاق صورة الإيصال في الموقع.\n`

    return encodeURIComponent(msg)
  }

  const handleConfirmOrder = () => {
    if (!customerName || !customerPhone || !deliveryDate || !paymentMethod) {
      alert("يرجى إكمال جميع البيانات وتحديد تاريخ الاستلام")
      return
    }
    setIsSubmitting(true)
    window.open(`https://wa.me/${myStoreNumber}?text=${buildWhatsAppMessage()}`, "_blank")
    setTimeout(() => {
      setIsSubmitting(false)
      setIsConfirmed(true)
    }, 1000)
  }

  if (isConfirmed) {
    return (
      <div className="mx-auto max-w-md p-8 text-center bg-card border rounded-lg">
        <CheckCircle2 className="mx-auto h-16 w-16 text-primary mb-4" />
        <h2 className="text-2xl font-bold mb-2">تم استلام طلبك رقم {orderId}</h2>
        <p className="text-muted-foreground mb-4">شكراً لثقتك بخياط اليرموك.</p>
        <button onClick={() => window.location.reload()} className="bg-primary text-white px-6 py-2 rounded">طلب جديد</button>
      </div>
    )
  }

  return (
    <section className="py-12 px-4 max-w-4xl mx-auto">
      <div className="bg-card border rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Receipt className="text-primary" /> ملخص الطلب النهائـي
        </h2>

        {/* بيانات العميل */}
        <div className="grid gap-4 md:grid-cols-2 mb-6">
          <input 
            type="text" placeholder="اسمك الكامل" 
            className="p-3 bg-secondary border rounded-md"
            value={customerName} onChange={e => setCustomerName(e.target.value)}
          />
          <input 
            type="tel" placeholder="رقم جوالك" 
            className="p-3 bg-secondary border rounded-md text-right"
            value={customerPhone} onChange={e => setCustomerPhone(e.target.value)}
          />
          <div className="md:col-span-2">
            <label className="text-sm mb-1 block text-primary">تاريخ الاستلام المطلوب (أقل مدة 5 أيام):</label>
            <input 
              type="date" 
              min={minDate}
              className="w-full p-3 bg-secondary border rounded-md"
              value={deliveryDate} onChange={e => setDeliveryDate(e.target.value)}
            />
          </div>
        </div>

        {/* الدفع */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button 
            onClick={() => setPaymentMethod("cash")}
            className={`p-4 border rounded-lg flex flex-col items-center gap-2 ${paymentMethod === "cash" ? "border-primary bg-primary/10" : "bg-secondary"}`}
          >
            <Banknote /> <span>نقدي (عربون 50%)</span>
          </button>
          <button 
            onClick={() => setPaymentMethod("transfer")}
            className={`p-4 border rounded-lg flex flex-col items-center gap-2 ${paymentMethod === "transfer" ? "border-primary bg-primary/10" : "bg-secondary"}`}
          >
            <CreditCard /> <span>تحويل بنكي</span>
          </button>
        </div>

        {paymentMethod === "transfer" && (
          <div className="p-4 bg-primary/5 border border-dashed border-primary rounded-lg mb-6 space-y-3">
            <div className="flex justify-between items-center">
              <span>بنك الكريمي:</span>
              <span className="font-mono font-bold">123456789</span>
            </div>
            <div className="flex justify-between items-center">
              <span>محفظة جيب (رقم النقطة):</span>
              <span className="font-mono font-bold">777346356</span>
            </div>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-3 border-2 border-dashed rounded-md text-sm flex items-center justify-center gap-2"
            >
              <Upload size={18} /> {receiptImage ? "تم اختيار الصورة" : "رفع إيصال التحويل"}
            </button>
            <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => {
              const file = e.target.files?.[0];
              if(file) setReceiptImage(URL.createObjectURL(file));
            }} />
          </div>
        )}

        <div className="bg-primary text-white p-4 rounded-lg text-center mb-6">
          <span className="text-xs opacity-80">إجمالي المبلغ المطلوب</span>
          <div className="text-3xl font-bold">{grandTotal} ريال يمني</div>
        </div>

        <button 
          onClick={handleConfirmOrder}
          disabled={isSubmitting}
          className="w-full bg-primary text-white py-4 rounded-lg font-bold text-lg hover:brightness-110 transition-all"
        >
          {isSubmitting ? "جاري الإرسال..." : "تأكيد الطلب عبر واتساب"}
        </button>
      </div>
    </section>
  )
}
