"use client";

import { memo, useEffect } from "react";
import Image from "next/image";
import { X, Plus, Minus, Trash2, ShoppingBag, Loader2 } from "lucide-react";
import { useStore } from "@/lib/store/cart";
import { formatPrice } from "@/utils/cn";

function CartDrawer() {
  const cartOpen = useStore((s) => s.cartOpen);
  const setCartOpen = useStore((s) => s.setCartOpen);
  const cart = useStore((s) => s.cart);
  const updateQuantity = useStore((s) => s.updateQuantity);
  const removeFromCart = useStore((s) => s.removeFromCart);
  const cartTotal = useStore((s) => s.cartTotal());
  const checkoutLoading = useStore((s) => s.checkoutLoading);
  const simulateCheckout = useStore((s) => s.simulateCheckout);

  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  if (!cartOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm"
        onClick={() => setCartOpen(false)}
        aria-hidden
      />

      <aside
        className="fixed top-0 right-0 z-[160] flex h-full w-full max-w-md flex-col border-l border-white/10 bg-black/90 shadow-2xl backdrop-blur-2xl"
        role="dialog"
        aria-label="Panier"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-flora-coral" />
            <h2 className="flora-title font-playfair text-xl">Votre panier</h2>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            aria-label="Fermer le panier"
            data-cursor="hover"
            className="text-white/60 transition-colors hover:text-white"
          >
            <X size={22} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag size={48} className="text-white/20" strokeWidth={1} />
            <p className="flora-title font-playfair text-lg">Panier vide</p>
            <p className="flora-muted font-poppins text-sm">
              Découvrez nos créations florales et ajoutez vos favorites.
            </p>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-6 py-4">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-4 border-b border-white/8 py-5 last:border-0"
                >
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-xl border border-white/10">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <h3 className="flora-title font-playfair text-sm">{item.name}</h3>
                    <p className="flora-body mt-1 font-poppins text-sm text-flora-coral">
                      {formatPrice(item.price)}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Diminuer la quantité"
                          data-cursor="hover"
                          className="flex h-8 w-8 items-center justify-center text-white/70 hover:text-white"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="flora-body w-6 text-center font-poppins text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Augmenter la quantité"
                          data-cursor="hover"
                          className="flex h-8 w-8 items-center justify-center text-white/70 hover:text-white"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Supprimer"
                        data-cursor="hover"
                        className="text-white/40 transition-colors hover:text-red-400"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-white/10 px-6 py-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="flora-muted font-poppins text-sm uppercase tracking-wider">
                  Total
                </span>
                <span className="flora-title font-playfair text-2xl">
                  {formatPrice(cartTotal)}
                </span>
              </div>
              <p className="flora-muted mb-5 font-poppins text-[11px]">
                Livraison offerte à Paris · Paiement simulé à des fins de démonstration
              </p>
              <button
                onClick={() => simulateCheckout()}
                disabled={checkoutLoading}
                data-cursor="hover"
                className="flora-btn-primary flex w-full items-center justify-center gap-2 py-4 font-poppins text-xs tracking-[0.15em] uppercase disabled:opacity-70"
              >
                {checkoutLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Traitement...
                  </>
                ) : (
                  "Commander maintenant"
                )}
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export default memo(CartDrawer);
