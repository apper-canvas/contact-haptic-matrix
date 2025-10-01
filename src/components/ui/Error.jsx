import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  message = "Something went wrong", 
  description = "We encountered an error while loading your contacts. Please try again.",
  onRetry 
}) => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-red-50 to-white">
      {/* Error Icon */}
      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
        <ApperIcon name="AlertCircle" className="w-10 h-10 text-red-600" />
      </div>
      
      {/* Error Content */}
      <div className="text-center max-w-md mx-auto">
        <h3 className="text-xl font-bold text-slate-900 mb-3">
          {message}
        </h3>
        
        <p className="text-slate-600 mb-8 leading-relaxed">
          {description}
        </p>
        
        {/* Actions */}
        <div className="space-y-3">
          {onRetry && (
            <Button
              onClick={onRetry}
              icon="RefreshCw"
              className="w-full sm:w-auto"
            >
              Try Again
            </Button>
          )}
          
          <div className="text-sm text-slate-500">
            If the problem persists, please contact support
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-8 right-8 w-32 h-32 bg-gradient-to-br from-red-100 to-transparent rounded-full opacity-20"></div>
      <div className="absolute bottom-8 left-8 w-24 h-24 bg-gradient-to-tr from-red-200 to-transparent rounded-full opacity-20"></div>
    </div>
  );
};

export default Error;