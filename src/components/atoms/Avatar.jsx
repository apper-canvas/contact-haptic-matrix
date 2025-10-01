import React from "react";
import { cn } from "@/utils/cn";

const Avatar = React.forwardRef(({ className, src, alt, fallback, size = "default", ...props }, ref) => {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    default: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-base",
    xl: "w-20 h-20 text-lg"
  };

  const initials = fallback || (alt ? alt.split(" ").map(n => n[0]).join("").toUpperCase() : "?");

  return (
    <div
      ref={ref}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full bg-gradient-to-br from-primary-100 to-primary-200 text-primary-700 font-bold shadow-md",
        sizes[size],
        className
      )}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full rounded-full object-cover"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
      ) : null}
      <span 
        className={cn(
          "flex items-center justify-center w-full h-full rounded-full",
          src ? "hidden" : "flex"
        )}
      >
        {initials}
      </span>
    </div>
  );
});

Avatar.displayName = "Avatar";

export default Avatar;