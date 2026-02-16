"use client"

import { useState, useEffect } from "react"
import { 
  ChevronDown, ChevronUp, Plus, Trash2, Edit3, 
  Check, Shirt, Minus, Scissors, Lock, Unlock, X, Upload
} from "lucide-react"

export interface Fabric {
  id: string
  name: string
  price: number
  oldPrice?: number
  description: string
  image?: string
}

interface FabricsSectionProps {
  fabrics: Fabric[]
  onFabricsChange: (fabrics: Fabric[]) => void
  selectedFabric: string | null
  onSelectFabric: (id: string | null) => void
}

export function FabricsSection({
  fabrics,
  onFabricsChange,
  selectedFabric,
  onSelectFabric,
}: FabricsSectionProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [newFabric, setNewFabric] = useState({ name: "", price: "", oldPrice: "", description: "" })
  
  // نظام الحماية (وضع المالك)
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminPin, setAdminPin] = useState("")
  const [showPinInput, setShowPinInput] = useState(false)
  const [clickCount, setClickCount] = useState(0)

  // حالة العميل (الكميات والتفاصيل)
  const [customerOrders, setCustomerOrders] = useState<Record<string, any>>({})

  // تفعيل وضع المالك عند إدخال الرمز الصحيح
  const handleAdminAuth = () => {
    if (adminPin === "2026") {
      setIsAdmin(true)
      setShowPinInput(false)
      setAdminPin("")
    } else {
      alert("الرمز غير صحيح!")
    }
  }

  // وظيفة سرية: اضغط 3 مرات على العنوان لإظهار خانة الرمز
  const handleTitleClick = () => {
    setClickCount(prev => prev + 1)
    if (clickCount + 1 >= 3) {
      setShowPinInput(true)
      setClickCount(0)
    }
  }

  const addFabric = () => {
    if (!newFabric.name || !newFabric.price) return
    const fabric: Fabric = {
      id: Date.now().toString(),
      name: newFabric.name,
      price: Number(newFabric.price),
      oldPrice: Number(newFabric.oldPrice) || undefined,
      description: newFabric.description,
      image: "/logo.jpg"
    }
    onFabricsChange([...fabrics, fabric])
    setNewFabric({ name: "", price: "", oldPrice: "", description: "" })
    setShowAdd(false)
  }

  const updateQty = (id: string, delta: number) => {
    setCustomerOrders(prev => {
      const current = prev[id] || { qty: 0, neck: "عادي", cuff: "سادة", note: "" }
      const newQty = Math.max(0, current.qty + delta)
      return { ...prev, [id]: { ...current, qty: newQty } }
    })
  }

  return (
    <section id="fabrics" className="py-12 px-4 max-w-6xl mx-auto">
      
      {/* رأس القسم مع ميزة الدخول السري */}
      <div className="flex items-center justify-between mb-8 border-b border-primary/20 pb-4">
        <div onClick={handleTitleClick} className="cursor-pointer select-none">
          <h2 className="text-2xl font-bold font-serif text-primary">الأقمشة وتفصيل الثياب</h2>
          <p className="text-sm text-muted-foreground italic">{"اضغط هنا لاختيار نوع القماش وتحديد تفاصيل خياطة ثوبك"}</p>
        </div>
        {isAdmin ? (
          <button onClick={() => setIsAdmin(false)} className="flex items-center gap-2 text-xs bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">
            <Unlock size={14}/> وضع المالك مفعل
          </button>
        ) : (
          <Shirt className="h-8 w-8 text-primary/20" />
        )}
      </div>

      {/* نافذة إدخال الرمز السري (تظهر عند الحاجة فقط) */}
      {showPinInput && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-card border border-primary/30 p-6 rounded-xl w-full max-w-sm shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-primary flex items-center gap-2"><Lock size={18}/> دخول المالك</h3>
              <button onClick={() => setShowPinInput(false)}><X size={20}/></button>
            </div>
            <input 
              type="password" 
              placeholder="أدخل رمز الدخول"
              className="w-full p-3 bg-secondary border rounded-lg mb-4 text-center text-xl tracking-widest outline-none focus:border-primary"
              value={adminPin}
              onChange={(e) => setAdminPin(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdminAuth()}
            />
            <button onClick={handleAdminAuth} className="w-full bg-primary text-white py-3 rounded-lg font-bold">تأكيد</button>
          </div>
        </div>
      )}

      <div className="grid gap-8 md:grid-cols-2">
        {fabrics.map((fabric) => {
          const order = customerOrders[fabric.id] || { qty: 0 }
          
          return (
            <div key={fabric.id} className={`group relative rounded-2xl border bg-card transition-all duration-300 ${order.qty > 0 ? "border-primary ring-1 ring-primary shadow-lg shadow-primary/10" : "border-border shadow-sm"}`}>
              
              {/* أزرار التحكم (تظهر فقط للمالك) */}
              {isAdmin && (
                <div className="absolute left-3 top-3 z-20 flex gap-2">
                  <button onClick={() => setEditingId(fabric.id)} className="p-2 bg-white/90 text-primary rounded-full shadow-md hover:bg-primary hover:text-white transition-colors">
                    <Edit3 size={16} />
                  </button>
                  <button onClick={() => onFabricsChange(fabrics.filter(f => f.id !== fabric.id))} className="p-2 bg-white/90 text-destructive rounded-full shadow-md hover:bg-destructive hover:text-white transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              )}

              {/* صورة القماش */}
              <div className="relative h-56 w-full overflow-hidden rounded-t-2xl bg-muted">
                <img src={fabric.image || "/logo.jpg"} alt={fabric.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {fabric.oldPrice && fabric.oldPrice > fabric.price && (
                  <div className="absolute right-4 top-4 bg-destructive text-white text-xs font-black px-3 py-1.5 rounded-lg shadow-lg">
                    خصم {Math.round(((fabric.oldPrice - fabric.price) / fabric.oldPrice) * 100)}%
                  </div>
                )}
                {isAdmin && (
                   <label className="absolute bottom-3 left-3 cursor-pointer bg-black/50 p-2 rounded-full text-white hover:bg-black/70">
                     <Upload size={16}/>
                     <input type="file" className="hidden" accept="image/*" />
                   </label>
                )}
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-xl text-foreground">{fabric.name}</h3>
                  <div className="text-left">
                    {fabric.oldPrice && <span className="text-sm text-muted-foreground line-through block decoration-destructive/50">{fabric.oldPrice} ر.ي</span>}
                    <span className="text-primary font-black text-2xl">{fabric.price} <small className="text-xs font-normal">ر.ي</small></span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{fabric.description}</p>

                {/* التحكم في الكمية للعميل */}
                <div className="flex items-center justify-between bg-secondary/80 p-3 rounded-xl">
                  <span className="text-sm font-bold flex items-center gap-2">
                    <ShoppingBag size={16} className="text-primary"/> عدد الثياب:
                  </span>
                  <div className="flex items-center gap-4">
                    <button onClick={() => updateQty(fabric.id, -1)} className="p-2 bg-background rounded-lg border border-border shadow-sm hover:text-destructive transition-all active:scale-90"><Minus size={18}/></button>
                    <span className="font-mono text-xl font-bold w-6 text-center">{order.qty}</span>
                    <button onClick={() => updateQty(fabric.id, 1)} className="p-2 bg-primary text-white rounded-lg shadow-md shadow-primary/20 hover:brightness-110 transition-all active:scale-90"><Plus size={18}/></button>
                  </div>
                </div>

                {/* تفاصيل الخياطة (تظهر عند الاختيار) */}
                {order.qty > 0 && (
                  <div className="mt-6 pt-6 border-t border-dashed border-border space-y-5 animate-in fade-in zoom-in-95 duration-300">
                    <h4 className="flex items-center gap-2 text-sm font-bold text-primary">
                      <Scissors size={16} /> تخصيص تفاصيل الثوب
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-muted-foreground uppercase font-bold px-1">نوع الرقبة</label>
                        <select className="w-full bg-background border border-border rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                          <option>عادي (قلاب)</option>
                          <option>سعودي</option>
                          <option>كويتي</option>
                          <option>قطري</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-muted-foreground uppercase font-bold px-1">نوع الكبك</label>
                        <select className="w-full bg-background border border-border rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                          <option>سادة</option>
                          <option>حشوة ثقيلة</option>
                          <option>فرنسي</option>
                          <option>طقطق</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-muted-foreground uppercase font-bold px-1">ملاحظات خاصة بهذا القماش</label>
                      <textarea 
                        placeholder="مثلاً: أريد الخياطة دبل، أو جيب مخفي..."
                        className="w-full bg-background border border-border rounded-lg p-3 text-sm h-24 outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}

        {/* زر إضافة ثوب جديد (للمالك فقط) */}
        {isAdmin && (
          showAdd ? (
            <div className="border-2 border-primary/30 bg-primary/5 rounded-2xl p-8 space-y-4 shadow-xl animate-in slide-in-from-bottom-4">
              <h3 className="font-bold text-xl text-primary flex items-center gap-2"><Plus size={24}/> إضافة ثوب جديد للمحل</h3>
              <input type="text" placeholder="اسم القماش" className="w-full p-3 border rounded-lg bg-background" value={newFabric.name} onChange={e => setNewFabric({...newFabric, name: e.target.value})} />
              <div className="grid grid-cols-2 gap-3">
                <input type="number" placeholder="السعر الجديد (ر.ي)" className="w-full p-3 border rounded-lg bg-background" value={newFabric.price} onChange={e => setNewFabric({...newFabric, price: e.target.value})} />
                <input type="number" placeholder="السعر القديم (اختياري)" className="w-full p-3 border rounded-lg bg-background" value={newFabric.oldPrice} onChange={e => setNewFabric({...newFabric, oldPrice: e.target.value})} />
              </div>
              <textarea placeholder="وصف مميزات هذا القماش..." className="w-full p-3 border rounded-lg bg-background h-24" value={newFabric.description} onChange={e => setNewFabric({...newFabric, description: e.target.value})} />
              <div className="flex gap-3 pt-2">
                <button onClick={addFabric} className="flex-1 bg-primary text-white py-3 rounded-lg font-bold shadow-lg shadow-primary/30 hover:brightness-110">إضافة الثوب للمتجر</button>
                <button onClick={() => setShowAdd(false)} className="px-6 border border-border rounded-lg hover:bg-background">إلغاء</button>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => setShowAdd(true)}
              className="border-2 border-dashed border-primary/20 rounded-2xl flex flex-col items-center justify-center p-12 text-primary/40 hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all group"
            >
              <Plus size={40} className="mb-3 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-lg">إضافة ثوب جديد للمتجر</span>
            </button>
          )
        )}
      </div>
    </section>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, Edit3, Shirt, Minus, Scissors, Lock, Unlock, X, ShoppingBag } from "lucide-react"

export function FabricsSection({ fabrics, onFabricsChange }: any) {
  // حل مشكلة الخطأ في الصورة رقم 7
  const [mounted, setMounted] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [showPin, setShowPin] = useState(false)
  const [pin, setPin] = useState("")
  const [orders, setOrders] = useState<Record<string, any>>({})

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const checkPin = () => {
    if (pin === "2026") {
      setIsAdmin(true)
      setShowPin(false)
      setPin("")
    } else {
      alert("الرمز غير صحيح!")
    }
  }

  const updateQty = (id: string, delta: number) => {
    setOrders(prev => ({
      ...prev,
      [id]: { ...prev[id], qty: Math.max(0, (prev[id]?.qty || 0) + delta) }
    }))
  }

  return (
    <section className="py-10 px-4 max-w-4xl mx-auto">
      {/* العنوان - اضغط عليه لفتح رمز الدخول */}
      <div className="flex justify-between items-center mb-6 border-b pb-4 cursor-pointer" onClick={() => setShowPin(true)}>
        <h2 className="text-xl font-bold text-primary">الأقمشة وتفصيل الثياب</h2>
        {isAdmin && <span className="text-[10px] bg-primary/20 text-primary px-2 py-1 rounded-full border border-primary/30">وضع المالك</span>}
      </div>

      {/* نافذة الرمز السري */}
      {showPin && !isAdmin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-card p-6 rounded-2xl border border-primary/20 w-full max-w-xs shadow-2xl">
            <h3 className="font-bold mb-4 text-center flex items-center justify-center gap-2"><Lock size={18}/> دخول المالك</h3>
            <input 
              type="password" 
              placeholder="الرمز السري" 
              value={pin} 
              onChange={e => setPin(e.target.value)} 
              className="w-full p-3 border rounded-xl mb-4 text-center text-xl tracking-widest bg-secondary"
            />
            <button onClick={checkPin} className="w-full bg-primary text-white py-3 rounded-xl font-bold">تأكيد</button>
            <button onClick={() => setShowPin(false)} className="w-full mt-2 text-xs text-muted-foreground text-center">إلغاء</button>
          </div>
        </div>
      )}

      <div className="grid gap-6">
        {fabrics.map((f: any) => (
          <div key={f.id} className={`bg-card border rounded-2xl p-4 relative transition-all ${orders[f.id]?.qty > 0 ? "border-primary" : "border-border"}`}>
            {isAdmin && (
              <button onClick={() => onFabricsChange(fabrics.filter((x:any) => x.id !== f.id))} className="absolute left-2 top-2 text-destructive p-2 hover:bg-destructive/10 rounded-full"><Trash2 size={16}/></button>
            )}
            
            <div className="flex gap-4">
              <div className="w-24 h-24 bg-muted rounded-xl overflow-hidden border">
                <img src={f.image || "/logo.jpg"} className="w-full h-full object-cover" alt={f.name} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold">{f.name}</h3>
                <p className="text-[10px] text-muted-foreground line-clamp-2 mt-1">{f.description}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-primary font-bold text-lg">{f.price} ر.س</span>
                  {f.oldPrice && <span className="text-xs line-through text-muted-foreground opacity-50">{f.oldPrice}</span>}
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between bg-secondary/30 p-2 rounded-xl border border-border/50">
              <span className="text-xs font-bold px-2">عدد الثياب:</span>
              <div className="flex items-center gap-4">
                <button onClick={() => updateQty(f.id, -1)} className="p-1.5 border rounded-lg bg-background shadow-sm hover:text-destructive"><Minus size={16}/></button>
                <span className="font-bold text-lg">{(orders[f.id]?.qty || 0)}</span>
                <button onClick={() => updateQty(f.id, 1)} className="p-1.5 bg-primary text-white rounded-lg shadow-sm hover:brightness-110"><Plus size={16}/></button>
              </div>
            </div>

            {/* تفاصيل الخياطة لكل قماش */}
            {(orders[f.id]?.qty > 0) && (
              <div className="mt-4 pt-4 border-t border-dashed space-y-4 animate-in fade-in zoom-in-95">
                <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-wider"><Scissors size={14}/> تخصيص الثياب</div>
                <div className="grid grid-cols-2 gap-3">
                  <select className="p-2 border rounded-lg text-xs bg-background outline-none focus:ring-1 focus:ring-primary"><option>رقبة قلاب</option><option>رقبة سعودي</option><option>رقبة كويتي</option></select>
                  <select className="p-2 border rounded-lg text-xs bg-background outline-none focus:ring-1 focus:ring-primary"><option>كبك سادة</option><option>كبك حشوة</option><option>كبك فرنسي</option></select>
                </div>
                <textarea placeholder="ملاحظات إضافية لهذا النوع من القماش..." className="w-full p-3 border rounded-lg text-xs h-20 bg-background outline-none focus:ring-1 focus:ring-primary resize-none" />
              </div>
            )}
          </div>
        ))}

        {isAdmin && (
          <button className="border-2 border-dashed border-primary/30 rounded-2xl p-8 flex flex-col items-center justify-center text-primary/40 hover:bg-primary/5 hover:text-primary transition-all group">
            <Plus size={32} className="group-hover:scale-110 transition-transform" />
            <span className="font-bold mt-2">إضافة ثوب جديد للمتجر</span>
          </button>
        )}
      </div>
    </section>
  )
}

