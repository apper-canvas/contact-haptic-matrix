import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ContactForm from "@/components/organisms/ContactForm";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const ContactModal = ({ isOpen, onClose, contact, onSave, isEdit = false, service, entityType = 'contact' }) => {
  if (!isOpen) return null;

  const handleSave = (savedContact) => {
    onSave(savedContact);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
<div className="flex items-center justify-between p-6 border-b border-green-200 bg-gradient-to-r from-green-50 to-white rounded-t-2xl">
              <h2 className="text-2xl font-bold text-slate-900">
                {isEdit ? `Edit ${entityType === 'lead' ? 'Lead' : 'Contact'}` : `Add New ${entityType === 'lead' ? 'Lead' : 'Contact'}`}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <ApperIcon name="X" className="w-5 h-5" />
              </Button>
            </div>
            
            {/* Content */}
            <div className="p-6">
<ContactForm
                contact={contact}
                onSave={handleSave}
                onCancel={onClose}
                isEdit={isEdit}
                service={service}
                entityType={entityType}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;