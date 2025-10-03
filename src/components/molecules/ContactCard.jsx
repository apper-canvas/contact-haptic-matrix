import React from "react";
import { cn } from "@/utils/cn";
import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const ContactCard = ({ 
  contact, 
  isSelected = false,
  onSelect, 
  onEdit, 
  onDelete,
  className 
}) => {
  const tagColors = {
    "lead": "default",
    "client": "success",
    "prospect": "warning",
    "enterprise": "secondary",
    "priority": "destructive",
    "startup": "outline",
    "decision-maker": "default",
    "creative": "secondary",
    "retail": "outline",
    "healthcare": "success",
    "finance": "warning"
  };

  return (
    <div
className={cn(
        "p-6 bg-white rounded-xl border border-green-200 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer group",
        isSelected && "ring-2 ring-primary-500 border-primary-300 shadow-lg bg-gradient-to-br from-primary-50 to-white",
        "transform hover:scale-[1.02]",
        className
      )}
      onClick={() => onSelect?.(contact)}
    >
      <div className="flex items-start gap-4">
        <Avatar
src={contact.photo_c}
          alt={`${contact.first_name_c} ${contact.last_name_c}`}
          size="lg"
          className="ring-2 ring-primary-200"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-bold text-slate-900 text-lg truncate">
              {contact.first_name_c} {contact.last_name_c}
            </h3>
<div className="flex items-center gap-1 opacity-100 transition-opacity duration-200 shrink-0 ml-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.(contact);
                }}
                className="p-2 h-auto hover:bg-primary-50 hover:text-primary-600 border border-green-200"
                title="Edit Contact"
              >
                <ApperIcon name="Edit2" className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.(contact);
                }}
                className="p-2 h-auto hover:bg-red-50 hover:text-red-600 border border-green-200"
                title="Delete Contact"
              >
                <ApperIcon name="Trash2" className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
<div className="space-y-1 mb-3">
            <p className="text-sm font-medium text-slate-700 truncate">
              {contact.position}
            </p>
<p className="text-sm font-semibold text-primary-600 truncate">
              {contact.company_c}
            </p>
          </div>
          
          {contact.email_send_c && (
            <div className="mb-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border
                {contact.email_send_c === 'Send' ? 'bg-gradient-to-r from-green-50 to-green-100 text-green-700 border-green-300' : 
                 contact.email_send_c === 'New' ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-blue-300' : 
                 'bg-gray-100 text-gray-700 border-gray-300'}">
                <ApperIcon name="Send" className="w-3 h-3" />
                <span>{contact.email_send_c}</span>
              </div>
            </div>
          )}
          
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <ApperIcon name="Mail" className="w-3.5 h-3.5" />
              <span className="truncate">{contact.email_c}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <ApperIcon name="Phone" className="w-3.5 h-3.5" />
              <span className="truncate">{contact.phone_c}</span>
            </div>
          </div>
          
{contact.tags_c && contact.tags_c.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {contact.tags_c.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant={tagColors[tag] || "outline"}
                  className="text-xs"
                >
                  {tag}
                </Badge>
              ))}
              {contact.tags_c.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{contact.tags_c.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactCard;