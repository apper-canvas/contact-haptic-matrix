import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No data found", 
  description = "There's nothing to show here yet.",
  actionText,
  onAction,
  icon = "Inbox"
}) => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-white">
      {/* Empty Icon */}
      <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
        <ApperIcon name={icon} className="w-12 h-12 text-slate-500" />
      </div>
      
      {/* Empty Content */}
      <div className="text-center max-w-md mx-auto">
        <h3 className="text-2xl font-bold text-slate-900 mb-3">
          {title}
        </h3>
        
        <p className="text-slate-600 mb-8 leading-relaxed text-lg">
          {description}
        </p>
        
        {/* Action Button */}
        {actionText && onAction && (
          <Button
            onClick={onAction}
            size="lg"
            icon="Plus"
            className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-lg hover:shadow-xl"
          >
            {actionText}
          </Button>
        )}
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-12 right-12 w-40 h-40 bg-gradient-to-br from-primary-100 to-transparent rounded-full opacity-20"></div>
      <div className="absolute bottom-12 left-12 w-32 h-32 bg-gradient-to-tr from-primary-200 to-transparent rounded-full opacity-20"></div>
      <div className="absolute top-1/2 left-8 w-16 h-16 bg-gradient-to-br from-slate-200 to-transparent rounded-full opacity-30"></div>
    </div>
  );
};

export default Empty;