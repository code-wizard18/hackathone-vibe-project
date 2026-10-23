import React from 'react';
import { useDisaster } from '../context/DisasterContext';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useDisaster();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        let borderClass = 'border-[#393027]';
        let glowClass = '';
        let Icon = Info;
        let iconColor = 'text-[#D99055]';

        if (toast.type === 'success') {
          borderClass = 'border-[#35C98A]/50';
          glowClass = 'shadow-emerald-glow';
          Icon = CheckCircle2;
          iconColor = 'text-[#35C98A]';
        } else if (toast.type === 'error') {
          borderClass = 'border-[#F05252]/60';
          glowClass = 'shadow-critical-glow';
          Icon = XCircle;
          iconColor = 'text-[#F05252]';
        } else if (toast.type === 'warning') {
          borderClass = 'border-amber-500/60';
          glowClass = 'shadow-copper-sm';
          Icon = AlertTriangle;
          iconColor = 'text-amber-400';
        } else {
          borderClass = 'border-[#D99055]/50';
          glowClass = 'shadow-copper-sm';
          Icon = Info;
          iconColor = 'text-[#D99055]';
        }

        return (
          <div
            key={toast.id}
            className={`
              pointer-events-auto w-full bg-[#191512] border ${borderClass} ${glowClass}
              rounded-xl p-3.5 shadow-2xl transition-all duration-300 animate-slide-in backdrop-blur-md
              flex items-start gap-3 relative overflow-hidden
            `}
          >
            <div className="mt-0.5 flex-shrink-0">
              <Icon size={18} className={iconColor} />
            </div>

            <div className="flex-1 min-w-0 pr-4">
              <h5 className="text-xs font-bold text-[#F5F0E8] font-mono tracking-wide">
                {toast.title}
              </h5>
              <p className="text-xs text-[#A89F91] mt-0.5 leading-relaxed break-words font-sans">
                {toast.message}
              </p>
              <span className="text-[10px] text-[#A89F91]/60 font-mono mt-1 block">
                {toast.timestamp}
              </span>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#A89F91] hover:text-[#F5F0E8] p-1 rounded-md hover:bg-[#221C18] transition-colors focus:outline-none"
              aria-label="Dismiss notification"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
