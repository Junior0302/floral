"use client";

import { memo } from "react";
import { CheckCircle2, Info, XCircle, X } from "lucide-react";
import { useStore } from "@/lib/store/cart";
import { cn } from "@/utils/cn";

const icons = {
  success: CheckCircle2,
  info: Info,
  error: XCircle,
};

const styles = {
  success: "border-flora-coral/30 bg-black/85",
  info: "border-white/15 bg-black/85",
  error: "border-red-400/30 bg-black/85",
};

function ToastContainer() {
  const toasts = useStore((s) => s.toasts);
  const removeToast = useStore((s) => s.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-24 right-4 z-[200] flex w-full max-w-sm flex-col gap-3 px-4 md:right-6 md:px-0">
      {toasts.map((toast) => {
        const Icon = icons[toast.type];
        return (
          <div
            key={toast.id}
            className={cn(
              "toast-animate flex items-start gap-3 rounded-2xl border p-4 shadow-2xl",
              styles[toast.type]
            )}
            role="alert"
          >
            <Icon
              size={20}
              className={cn(
                "mt-0.5 shrink-0",
                toast.type === "success" && "text-flora-coral",
                toast.type === "info" && "text-white/70",
                toast.type === "error" && "text-red-400"
              )}
            />
            <div className="flex-1">
              <p className="flora-title font-poppins text-sm font-medium">{toast.title}</p>
              {toast.message && (
                <p className="flora-muted mt-1 font-poppins text-xs leading-relaxed">
                  {toast.message}
                </p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              aria-label="Fermer"
              className="shrink-0 text-white/40 transition-colors hover:text-white"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default memo(ToastContainer);
