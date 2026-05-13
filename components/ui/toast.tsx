"use client";

import * as React from "react";
import { X, CheckCircle2, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ToastType = "success" | "error" | "info";

interface ToastData {
  id: string;
  message: string;
  description?: string;
  type: ToastType;
}

interface ToastContextValue {
  toasts: ToastData[];
  showToast: (toast: Omit<ToastData, "id">) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = React.useContext(ToastContext);
  // Return no-op when outside provider (e.g., during SSR or before mount)
  if (!context) {
    return {
      toasts: [],
      showToast: () => {},
      dismissToast: () => {},
    };
  }
  return context;
}

function Toast({ toast, onDismiss }: { toast: ToastData; onDismiss: (id: string) => void }) {
  React.useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 7000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const iconMap = {
    success: <CheckCircle2 className="h-5 w-5 text-emerald-600" />,
    error: <X className="h-5 w-5 text-red-500" />,
    info: <Mail className="h-5 w-5 text-blue-500" />,
  };

  const bgMap = {
    success: "border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30 dark:border-emerald-800",
    error: "border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-800",
    info: "border-blue-200 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-800",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-sm ${bgMap[toast.type]}`}
    >
      <div className="flex-shrink-0 pt-0.5">
        {iconMap[toast.type]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-navy dark:text-gray-100">
          {toast.message}
        </p>
        {toast.description && (
          <p className="mt-0.5 text-xs text-muted-foreground">
            {toast.description}
          </p>
        )}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="flex-shrink-0 -mr-1 rounded-lg p-1 text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        aria-label="Cerrar notificación"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

export function ToastContainer({ toasts, onDismiss }: { toasts: ToastData[]; onDismiss: (id: string) => void }) {
  return (
    <div className="fixed right-4 top-4 z-50 flex w-full max-w-sm flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast toast={toast} onDismiss={onDismiss} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  const [toasts, setToasts] = React.useState<ToastData[]>([]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const showToast = React.useCallback((toast: Omit<ToastData, "id">) => {
    const id = Date.now().toString() + Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);

  const dismissToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
}
