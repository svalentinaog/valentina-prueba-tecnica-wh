import type { PropsWithChildren } from "react";

interface ModalProps extends PropsWithChildren {
  open: boolean;
  onClose: () => void;
  title?: string;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export default function Modal({
  open,
  onClose,
  title,
  footer,
  children,
  size = "md",
}: ModalProps) {
  if (!open) return null;

  const width =
    size === "sm" ? "max-w-md" : size === "lg" ? "max-w-3xl" : "max-w-xl";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        className={`relative z-50 w-full ${width} mx-4 bg-white rounded-2xl shadow-xl ring-1 ring-black/10 max-h-[90vh] overflow-y-auto`}
      >
        <div className="px-4 sm:px-6 py-4 border-b border-gray-100">
          {title && (
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          )}
        </div>
        <div className="px-4 sm:px-6 py-4">{children}</div>
        <div className="px-4 sm:px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
          {footer}
        </div>
      </div>
    </div>
  );
}
