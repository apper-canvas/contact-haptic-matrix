import React, { useState, useEffect } from "react";
import { cn } from "@/utils/cn";
import { contactService } from "@/services/api/contactService";

const Avatar = React.forwardRef(({ className, src, alt, fallback, size = "default", watermark = false, contactName = "", ...props }, ref) => {
  const [watermarkedSrc, setWatermarkedSrc] = useState(src);
  const [isWatermarking, setIsWatermarking] = useState(false);

  useEffect(() => {
    if (watermark && src && contactName) {
      setIsWatermarking(true);
      contactService.addWatermarkToPhoto(src, contactName)
        .then((watermarkedUrl) => {
          setWatermarkedSrc(watermarkedUrl);
          setIsWatermarking(false);
        })
        .catch(() => {
          setWatermarkedSrc(src);
          setIsWatermarking(false);
        });
    } else {
      setWatermarkedSrc(src);
    }
  }, [src, watermark, contactName]);
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
      {isWatermarking ? (
        <div className="w-full h-full flex items-center justify-center">
          <svg className="animate-spin h-1/2 w-1/2 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : watermarkedSrc ? (
        <img
          src={watermarkedSrc}
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