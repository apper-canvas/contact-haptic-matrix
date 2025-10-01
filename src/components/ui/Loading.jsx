import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Loading = ({ message = "Loading contacts..." }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-white">
      {/* Animated Icon */}
      <div className="relative mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center animate-pulse">
          <ApperIcon name="Users" className="w-8 h-8 text-primary-600" />
        </div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
      </div>
      
      {/* Loading Skeleton */}
      <div className="w-full max-w-sm space-y-4">
        <div className="text-center mb-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            {message}
          </h3>
          <p className="text-sm text-slate-600">
            Please wait while we fetch your contacts
          </p>
        </div>
        
        {/* Skeleton Cards */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse"></div>
                  <div className="h-3 bg-gradient-to-r from-slate-100 to-slate-200 rounded animate-pulse w-2/3"></div>
                  <div className="h-3 bg-gradient-to-r from-slate-100 to-slate-200 rounded animate-pulse w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;