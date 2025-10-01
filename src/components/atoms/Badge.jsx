import React from "react";
import { cn } from "@/utils/cn";

const Badge = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-gradient-to-r from-primary-100 to-primary-200 text-primary-800 border border-primary-300",
    secondary: "bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 border border-slate-300",
    success: "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300",
    warning: "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-300",
    destructive: "bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300",
    outline: "border border-slate-300 text-slate-600 bg-white"
  };

  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  );
});

Badge.displayName = "Badge";

export default Badge;