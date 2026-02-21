// components/Modal.tsx
import { X } from "lucide-react";
import React, { useEffect, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  showCloseButton?: boolean;
  className?: string;
  contentClassName?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  closeOnOverlayClick = true,
  closeOnEsc = true,
  showCloseButton = true,
  className = "",
  contentClassName = "",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const prevFocusedRef = useRef<HTMLElement | null>(null);

  // Size → width mapping (responsive-friendly)
  const sizeStyles = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
  };

  // ESC key handling
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, closeOnEsc, onClose]);

  // Focus trap + body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    prevFocusedRef.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";
    modalRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      prevFocusedRef.current?.focus?.();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const modalContent = (
    // Overlay
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
      onClick={closeOnOverlayClick ? onClose : undefined}
      aria-modal="true"
      role="dialog">
      {/* Modal panel */}
      <div
        ref={modalRef}
        className={`relative w-full ${sizeStyles[size]} mx-4 scale-100 transform rounded-2xl bg-white opacity-100 shadow-2xl transition-all duration-200 focus:outline-none sm:mx-6 ${contentClassName} `}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}>
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            {title && (
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
            )}
            {showCloseButton && (
              <button
                type="button"
                className="ml-auto rounded-full p-1 text-gray-500 hover:text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:text-gray-400 dark:hover:text-gray-200"
                onClick={onClose}
                aria-label="Close modal">
                <span className="text-2xl leading-none">
                  <X size={24} />
                </span>
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="max-h-[80vh] overflow-y-auto px-6 py-5">{children}</div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
