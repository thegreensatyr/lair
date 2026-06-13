import { useEffect, useState } from 'react';
import { ShoppingCart, Plus, Minus, X, Package, ChevronDown } from 'lucide-react';
import SigilBorder from './SigilBorder';
import SigilSymbol from './SigilSymbol';
import { supabase } from './supabase';
import type { Product } from './index';

```typescript
import SigilBorder from './SigilBorder';
import SigilSymbol from './SigilSymbol';
import { supabase } from './supabase';
import type { Product } from './index';
```

Fix it, commit, then open **`QuizPage.tsx`** — first 5 lines.

const CATEGORIES = ['all', 'apparel', 'posters', 'stickers', 'accessories'];

interface CartItem extends Product {
  qty: number;
}

export default function MerchPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [addedId, setAddedId] = useState<string | null>(null);

  useEffect(() => {
    supabase.from('products').select('*').order('created_at').then(({ data }) => {
      if (data) setProducts(data);
      setLoading(false);
    });
  }, []);

  const filtered = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  function addToCart(product: Product) {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  }

  function updateQty(id: string, delta: number) {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i).filter(i => i.qty > 0));
  }

  return (
    <div className="min-h-screen pt-16" style={{ background: '#020B18' }}>
      {/* Page header */}
      <div
        className="relative py-20 px-4 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #051A2E 0%, #020B18 100%)', borderBottom: '1px solid rgba(57,255,20,0.1)' }}
      >
        <div className="absolute right-0 top-0 bottom-0 w-64 pointer-events-none overflow-hidden hidden lg:block">
          <img src="/fgg.png" alt="" className="absolute right-0 top-0 h-full object-contain object-right" style={{ opacity: 0.25, filter: 'drop-shadow(0 0 20px rgba(57,255,20,0.3))' }} />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <img src="/fgg.png" alt="Green Satyr Merch" className="w-16 h-16 object-cover" style={{ filter: 'drop-shadow(0 0 8px rgba(57,255,20,0.5))' }} />
            <div>
              <p className="font-mono text-xs tracking-[0.3em] uppercase mb-1" style={{ color: '#D4AF37' }}>The Satyr Emporium</p>
              <h1 className="font-display text-3xl sm:text-5xl" style={{ color: '#e8e8e8' }}>
                Green Satyr <span style={{ color: '#39FF14', textShadow: '0 0 12px #39FF14' }}>Merch</span>
              </h1>
            </div>
          </div>
          <p className="font-body text-base" style={{ color: 'rgba(232,232,232,0.5)' }}>
            Carry the mark. Wear the sigil.
          </p>
        </div>
      </div>

      {/* Filter + Cart bar */}
      <div className="sticky top-16 z-30 px-4 py-3 flex items-center justify-between gap-4" style={{ background: 'rgba(2,11,24,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(57,255,20,0.08)' }}>
        <div className="flex items-center gap-2 flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="font-mono text-xs px-4 py-1.5 tracking-wider uppercase transition-all duration-200"
              style={{
                border: `1px solid ${activeCategory === cat ? '#39FF14' : 'rgba(57,255,20,0.2)'}`,
                color: activeCategory === cat ? '#39FF14' : 'rgba(232,232,232,0.5)',
                background: activeCategory === cat ? 'rgba(57,255,20,0.1)' : 'transparent',
                textShadow: activeCategory === cat ? '0 0 6px #39FF14' : 'none',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        <button
          onClick={() => setCartOpen(!cartOpen)}
          className="relative flex items-center gap-2 btn-neon text-xs py-2 px-4"
        >
          <ShoppingCart size={15} />
          Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#39FF14', color: '#020B18' }}>
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Cart panel */}
      {cartOpen && (
        <div
          className="fixed right-0 top-0 h-full w-full max-w-sm z-50 flex flex-col"
          style={{ background: 'rgba(2,11,24,0.98)', backdropFilter: 'blur(16px)', borderLeft: '1px solid rgba(57,255,20,0.2)', boxShadow: '-4px 0 30px rgba(57,255,20,0.1)' }}
        >
          <div className="flex items-center justify-between p-5" style={{ borderBottom: '1px solid rgba(57,255,20,0.12)' }}>
            <h3 className="font-display text-sm" style={{ color: '#39FF14', textShadow: '0 0 8px #39FF14' }}>Your Cart</h3>
            <button onClick={() => setCartOpen(false)} style={{ color: 'rgba(232,232,232,0.6)' }}><X size={20} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 opacity-40">
                <Package size={40} style={{ color: '#D4AF37' }} />
                <p className="font-body text-sm" style={{ color: 'rgba(232,232,232,0.6)' }}>No items yet</p>
              </div>
            ) : cart.map(item => (
              <div key={item.id} className="flex gap-3">
                <img src={`${item.image_url}?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop`} alt={item.name} className="w-16 h-16 object-cover flex-shrink-0" style={{ filter: 'saturate(0.8)' }} />
                <div className="flex-1 min-w-0">
                  <p className="font-body text-sm font-semibold truncate" style={{ color: '#e8e8e8' }}>{item.name}</p>
                  <p className="font-mono text-xs mt-1" style={{ color: '#D4AF37' }}>${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 flex items-center justify-center" style={{ border: '1px solid rgba(57,255,20,0.3)', color: '#39FF14' }}><Minus size={10} /></button>
                    <span className="font-mono text-xs" style={{ color: '#e8e8e8' }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 flex items-center justify-center" style={{ border: '1px solid rgba(57,255,20,0.3)', color: '#39FF14' }}><Plus size={10} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {cart.length > 0 && (
            <div className="p-5" style={{ borderTop: '1px solid rgba(57,255,20,0.12)' }}>
              <div className="flex justify-between mb-4">
                <span className="font-body text-sm" style={{ color: 'rgba(232,232,232,0.6)' }}>Total</span>
                <span className="font-mono font-bold" style={{ color: '#D4AF37', textShadow: '0 0 6px rgba(212,175,55,0.5)' }}>${cartTotal.toFixed(2)}</span>
              </div>
              <button className="btn-gold w-full text-sm">Proceed to Checkout</button>
              <p className="text-center font-mono text-xs mt-3" style={{ color: 'rgba(232,232,232,0.3)' }}>Secure checkout via Stripe</p>
            </div>
          )}
        </div>
      )}

      {/* Products grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center py-24">
            <SigilSymbol variant="pentagram" size={60} color="#39FF14" animate />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map(product => (
              <div key={product.id} className="card-dark group relative overflow-hidden flex flex-col">
                {/* Square image */}
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={`${product.image_url}?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop`}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ filter: 'saturate(0.75) contrast(1.05)' }}
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(to top, rgba(57,255,20,0.15), transparent)' }} />
                  {/* Category badge */}
                  <span
                    className="absolute top-2 left-2 font-mono text-xs px-2 py-0.5 uppercase tracking-wider"
                    style={{ background: 'rgba(2,11,24,0.85)', border: '1px solid rgba(212,175,55,0.4)', color: '#D4AF37' }}
                  >
                    {product.category}
                  </span>
                  {product.inventory < 10 && product.inventory > 0 && (
                    <span
                      className="absolute top-2 right-2 font-mono text-xs px-2 py-0.5 uppercase tracking-wider"
                      style={{ background: 'rgba(192,57,43,0.85)', border: '1px solid rgba(192,57,43,0.6)', color: '#fff' }}
                    >
                      Low Stock
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-xs mb-2 leading-snug" style={{ color: '#e8e8e8' }}>{product.name}</h3>
                    <p className="font-body text-xs mb-3" style={{ color: 'rgba(232,232,232,0.45)', lineHeight: '1.5' }}>{product.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-mono font-bold text-base" style={{ color: '#D4AF37', textShadow: '0 0 6px rgba(212,175,55,0.4)' }}>
                      ${product.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      className="font-mono text-xs px-4 py-2 transition-all duration-200 flex items-center gap-1.5"
                      style={{
                        border: `1px solid ${addedId === product.id ? '#D4AF37' : 'rgba(57,255,20,0.4)'}`,
                        color: addedId === product.id ? '#D4AF37' : '#39FF14',
                        background: addedId === product.id ? 'rgba(212,175,55,0.1)' : 'transparent',
                      }}
                    >
                      {addedId === product.id ? '✓ Added' : <><Plus size={12} /> Add</>}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <SigilSymbol variant="triquetra" size={60} color="#D4AF37" />
            <p className="font-body text-base" style={{ color: 'rgba(232,232,232,0.4)' }}>No items in this category yet.</p>
          </div>
        )}
      </div>

      {/* Scroll indicator for mobile */}
      <div className="flex justify-center pb-6 md:hidden">
        <ChevronDown size={20} style={{ color: 'rgba(57,255,20,0.3)' }} className="animate-float" />
      </div>
    </div>
  );
}
