import React from "react";
import { cn } from "@/utils/cn";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const SearchBar = ({ 
  value, 
  onChange, 
  onClear,
  placeholder = "Search contacts...",
  className,
  ...props 
}) => {
  return (
    <div className={cn("relative flex items-center", className)} {...props}>
      <div className="relative flex-1">
        <ApperIcon 
          name="Search" 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" 
        />
        <Input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="pl-10 pr-10 bg-white shadow-sm border-slate-300 focus:border-primary-500 focus:shadow-lg transition-all duration-200"
        />
        {value && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1 h-auto hover:bg-slate-100 rounded-md"
          >
            <ApperIcon name="X" className="w-4 h-4 text-slate-500" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;