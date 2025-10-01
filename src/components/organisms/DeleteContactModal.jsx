import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { contactService } from "@/services/api/contactService";
import Button from "@/components/atoms/Button";
import Avatar from "@/components/atoms/Avatar";
import ApperIcon from "@/components/ApperIcon";

const DeleteContactModal = ({ isOpen, onClose, contact, onDelete }) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen || !contact) return null;

  const handleDelete = async () => {
    setLoading(true);
    
    try {
      await contactService.delete(contact.Id);
      toast.success(`${contact.firstName} ${contact.lastName} deleted successfully`);
      onDelete(contact);
      onClose();
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("Failed to delete contact. Please try again.");
    } finally {
      setLoading(false);
    }
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
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
                <ApperIcon name="AlertTriangle" className="w-8 h-8 text-red-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Delete Contact?
              </h2>
              
              <p className="text-slate-600 mb-6">
                This action cannot be undone. The contact will be permanently deleted.
              </p>
              
              {/* Contact Preview */}
              <div className="p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg border border-slate-200 mb-6">
                <div className="flex items-center gap-4">
                  <Avatar
                    src={contact.photo}
                    alt={`${contact.firstName} ${contact.lastName}`}
                    size="default"
                    className="shrink-0"
                  />
                  
                  <div className="text-left flex-1">
                    <h3 className="font-bold text-slate-900">
                      {contact.firstName} {contact.lastName}
                    </h3>
                    <p className="text-sm text-slate-600">{contact.position}</p>
                    <p className="text-sm font-medium text-primary-600">{contact.company}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex gap-3 p-6 pt-0">
              <Button
                variant="outline"
                onClick={onClose}
                disabled={loading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={loading}
                className="flex-1"
                icon={loading ? "Loader2" : "Trash2"}
              >
                {loading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DeleteContactModal;