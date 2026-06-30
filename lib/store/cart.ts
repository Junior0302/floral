import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Toast {
  id: string;
  type: "success" | "info" | "error";
  title: string;
  message?: string;
}

interface StoreState {
  cart: CartItem[];
  favorites: string[];
  cartOpen: boolean;
  checkoutLoading: boolean;
  toasts: Toast[];

  setCartOpen: (open: boolean) => void;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  cartTotal: () => number;
  cartCount: () => number;
  simulateCheckout: () => Promise<boolean>;
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

let toastCounter = 0;

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      favorites: [],
      cartOpen: false,
      checkoutLoading: false,
      toasts: [],

      setCartOpen: (open) => set({ cartOpen: open }),

      addToCart: (item) => {
        const existing = get().cart.find((c) => c.id === item.id);
        set((state) => {
          if (existing) {
            return {
              cart: state.cart.map((c) =>
                c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
              ),
            };
          }
          return { cart: [...state.cart, { ...item, quantity: 1 }] };
        });

        get().addToast({
          type: "success",
          title: "Ajouté au panier",
          message: `${item.name} a été ajouté à votre panier.`,
        });
      },

      removeFromCart: (id) => {
        const item = get().cart.find((c) => c.id === id);
        set((state) => ({ cart: state.cart.filter((c) => c.id !== id) }));
        if (item) {
          get().addToast({
            type: "info",
            title: "Retiré du panier",
            message: `${item.name} a été retiré.`,
          });
        }
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id);
          return;
        }
        set((state) => ({
          cart: state.cart.map((c) => (c.id === id ? { ...c, quantity } : c)),
        }));
      },

      clearCart: () => set({ cart: [] }),

      toggleFavorite: (id) => {
        const wasFavorite = get().favorites.includes(id);
        set((state) => ({
          favorites: wasFavorite
            ? state.favorites.filter((f) => f !== id)
            : [...state.favorites, id],
        }));
        get().addToast({
          type: "info",
          title: wasFavorite ? "Retiré des favoris" : "Ajouté aux favoris",
        });
      },

      isFavorite: (id) => get().favorites.includes(id),

      cartTotal: () =>
        get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0),

      cartCount: () =>
        get().cart.reduce((sum, item) => sum + item.quantity, 0),

      simulateCheckout: async () => {
        const cart = get().cart;
        if (cart.length === 0) {
          get().addToast({
            type: "error",
            title: "Panier vide",
            message: "Ajoutez des produits avant de commander.",
          });
          return false;
        }

        set({ checkoutLoading: true });
        await new Promise((r) => setTimeout(r, 1800));
        set({ checkoutLoading: false, cart: [], cartOpen: false });
        get().addToast({
          type: "success",
          title: "Commande confirmée !",
          message: "Merci pour votre confiance. Vous recevrez un email de confirmation.",
        });
        return true;
      },

      addToast: (toast) => {
        const id = `toast-${++toastCounter}-${Date.now()}`;
        set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }));
        setTimeout(() => get().removeToast(id), 4000);
      },

      removeToast: (id) =>
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
    }),
    {
      name: "flora-store",
      partialize: (state) => ({
        cart: state.cart,
        favorites: state.favorites,
      }),
    }
  )
);
