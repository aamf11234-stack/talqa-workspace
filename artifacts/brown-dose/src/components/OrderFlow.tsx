import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bike, Package, MapPin, ChevronRight, Apple, CreditCard, CheckCircle2, Loader2, Wallet } from 'lucide-react';
import { useAppContext } from '../context/AppProvider';

export function OrderFlow() {
  const { 
    isOrderFlowOpen, setOrderFlowOpen, 
    orderFlowStep, setOrderFlowStep,
    orderType, setOrderType,
    cart, updateQuantity, clearCart,
    addOrder, addPoints
  } = useAppContext();

  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'apple'|'stc'|'card'|null>(null);
  const [isPaying, setIsPaying] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + (item.item.price * item.quantity), 0);
  const deliveryFee = orderType === 'delivery' ? 5 : 0;
  const total = subtotal + deliveryFee;

  const closeFlow = () => {
    setOrderFlowOpen(false);
    setTimeout(() => setOrderFlowStep('type'), 300);
  };

  const handlePay = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      const newOrder = {
        id: `ORD-${Math.floor(Math.random() * 9000) + 1000}`,
        items: [...cart],
        type: orderType,
        date: 'الآن',
        status: 'قيد التحضير' as const,
        total
      };
      addOrder(newOrder);
      clearCart();
      addPoints(15);
      setOrderFlowStep('success');
    }, 1500);
  };

  if (!isOrderFlowOpen) return null;

  return (
    <AnimatePresence>
      <div className="absolute inset-0 z-50 flex flex-col justify-end">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeFlow}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative bg-background rounded-t-[32px] w-full max-h-[90%] flex flex-col border-t border-card-border overflow-hidden pb-8"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-5 border-b border-card-border">
            {orderFlowStep !== 'type' && orderFlowStep !== 'success' ? (
              <button 
                onClick={() => setOrderFlowStep(orderFlowStep === 'payment' ? 'cart' : 'type')}
                className="w-8 h-8 flex items-center justify-center bg-card rounded-full"
              >
                <ChevronRight size={20} />
              </button>
            ) : (
              <div className="w-8" />
            )}
            
            <h2 className="text-lg font-bold">
              {orderFlowStep === 'type' && 'طريقة الاستلام'}
              {orderFlowStep === 'cart' && 'سلة المشتريات'}
              {orderFlowStep === 'payment' && 'الدفع'}
              {orderFlowStep === 'success' && 'تم الطلب'}
            </h2>

            {orderFlowStep !== 'success' ? (
              <button onClick={closeFlow} className="w-8 h-8 flex items-center justify-center bg-card rounded-full text-muted-foreground">
                <X size={20} />
              </button>
            ) : <div className="w-8" />}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto hide-scrollbar p-5">
            {/* --- STEP 1: TYPE --- */}
            {orderFlowStep === 'type' && (
              <div className="flex flex-col gap-4 h-full">
                <button
                  onClick={() => setOrderType('pickup')}
                  className={`p-5 rounded-2xl border-2 transition-colors flex items-center gap-4 ${
                    orderType === 'pickup' ? 'border-primary bg-primary/5' : 'border-card-border bg-card'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${orderType === 'pickup' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                    <Package size={24} />
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">استلام 🧳</div>
                    <div className="text-sm text-muted-foreground">خذها معك بعد دقيقتين</div>
                  </div>
                </button>

                <button
                  onClick={() => setOrderType('delivery')}
                  className={`p-5 rounded-2xl border-2 transition-colors flex items-center gap-4 ${
                    orderType === 'delivery' ? 'border-primary bg-primary/5' : 'border-card-border bg-card'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${orderType === 'delivery' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                    <Bike size={24} />
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">توصيل 🛵</div>
                    <div className="text-sm text-muted-foreground">لحين موقعك خلال ٤٠ دقيقة</div>
                  </div>
                </button>

                <AnimatePresence>
                  {orderType === 'delivery' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 p-4 bg-card rounded-2xl border border-card-border">
                        <label className="text-xs text-muted-foreground mb-2 block">عنوان التوصيل</label>
                        <div className="flex items-center gap-3 bg-background border border-card-border p-3 rounded-xl">
                          <MapPin size={18} className="text-primary" />
                          <input 
                            type="text" 
                            placeholder="مثال: ضمد — حي الورود"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="bg-transparent border-none outline-none text-sm w-full font-sans"
                            dir="rtl"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-auto pt-6">
                  <button 
                    onClick={() => setOrderFlowStep('cart')}
                    className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 disabled:opacity-50"
                    disabled={orderType === 'delivery' && address.trim() === ''}
                  >
                    متابعة
                  </button>
                </div>
              </div>
            )}

            {/* --- STEP 2: CART --- */}
            {orderFlowStep === 'cart' && (
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto mb-6">
                  {cart.map((c) => (
                    <div key={c.item.id} className="flex justify-between items-center py-4 border-b border-card-border last:border-0">
                      <div>
                        <div className="font-bold mb-1">{c.item.name}</div>
                        <div className="text-sm text-muted-foreground">{c.item.price} ر.س</div>
                      </div>
                      <div className="flex items-center gap-3 bg-card p-1 rounded-full border border-card-border">
                        <button onClick={() => updateQuantity(c.item.id, -1)} className="w-8 h-8 flex items-center justify-center bg-background rounded-full">-</button>
                        <span className="font-bold w-4 text-center">{c.quantity}</span>
                        <button onClick={() => updateQuantity(c.item.id, 1)} className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full">+</button>
                      </div>
                    </div>
                  ))}
                  {cart.length === 0 && (
                    <div className="text-center text-muted-foreground py-10">السلة فارغة</div>
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="bg-card p-5 rounded-2xl border border-card-border">
                    <div className="flex justify-between text-sm mb-2 text-muted-foreground">
                      <span>المجموع الفرعي</span>
                      <span className="font-sans">{subtotal} ر.س</span>
                    </div>
                    <div className="flex justify-between text-sm mb-4 text-muted-foreground">
                      <span>رسوم {orderType === 'delivery' ? 'التوصيل' : 'الاستلام'}</span>
                      <span className="font-sans">{deliveryFee === 0 ? 'مجاناً' : `${deliveryFee} ر.س`}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t border-card-border pt-4">
                      <span>الإجمالي</span>
                      <span className="font-sans text-primary">{total} ر.س</span>
                    </div>
                    
                    <button 
                      onClick={() => setOrderFlowStep('payment')}
                      className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg mt-6 shadow-lg shadow-primary/20"
                    >
                      ادفع الآن
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* --- STEP 3: PAYMENT --- */}
            {orderFlowStep === 'payment' && (
              <div className="flex flex-col h-full">
                <div className="text-center mb-8">
                  <div className="text-sm text-muted-foreground mb-1">المبلغ المطلوب</div>
                  <div className="text-3xl font-bold text-primary font-sans">{total} ر.س</div>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => setPaymentMethod('apple')}
                    className={`p-4 rounded-xl border flex items-center justify-between ${paymentMethod === 'apple' ? 'border-primary bg-primary/10 text-white' : 'border-card-border bg-card'}`}
                  >
                    <div className="flex items-center gap-3">
                      <Apple size={24} />
                      <span className="font-bold">Apple Pay</span>
                    </div>
                    {paymentMethod === 'apple' && <div className="w-3 h-3 rounded-full bg-primary" />}
                  </button>

                  <button
                    onClick={() => setPaymentMethod('stc')}
                    className={`p-4 rounded-xl border flex items-center justify-between ${paymentMethod === 'stc' ? 'border-primary bg-primary/10 text-white' : 'border-card-border bg-card'}`}
                  >
                    <div className="flex items-center gap-3">
                      <Wallet size={24} className="text-[#4C007F]" />
                      <span className="font-bold">STC Pay</span>
                    </div>
                    {paymentMethod === 'stc' && <div className="w-3 h-3 rounded-full bg-primary" />}
                  </button>

                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-xl border flex items-center justify-between ${paymentMethod === 'card' ? 'border-primary bg-primary/10 text-white' : 'border-card-border bg-card'}`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard size={24} className="text-blue-400" />
                      <span className="font-bold">بطاقة بنكية</span>
                    </div>
                    {paymentMethod === 'card' && <div className="w-3 h-3 rounded-full bg-primary" />}
                  </button>
                </div>

                <div className="mt-auto pt-8">
                  <button 
                    onClick={handlePay}
                    disabled={!paymentMethod || isPaying}
                    className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 flex justify-center items-center gap-2 disabled:opacity-50"
                  >
                    {isPaying ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        جاري الدفع...
                      </>
                    ) : 'تأكيد الدفع'}
                  </button>
                </div>
              </div>
            )}

            {/* --- STEP 4: SUCCESS --- */}
            {orderFlowStep === 'success' && (
              <div className="flex flex-col items-center text-center py-10 h-full justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15 }}
                  className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6"
                >
                  <CheckCircle2 size={48} strokeWidth={2.5} />
                </motion.div>
                <h3 className="text-2xl font-bold mb-2">تم الطلب! 🎉</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  الوقت المتوقع: {orderType === 'pickup' ? '٥ دقائق' : '٣٠ دقيقة'}
                </p>
                <div className="bg-card px-4 py-2 rounded-full border border-card-border text-sm flex gap-2 items-center mb-8">
                  <span className="text-secondary font-bold font-sans">+15</span>
                  <span>نقطة مكتسبة</span>
                </div>
                
                <button 
                  onClick={() => {
                    closeFlow();
                    setTimeout(() => window.location.reload(), 300); // Reset app conceptually or just go home
                  }}
                  className="w-full bg-card border border-card-border text-foreground py-4 rounded-xl font-bold text-lg"
                >
                  العودة للرئيسية
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
