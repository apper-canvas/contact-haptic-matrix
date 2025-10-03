import React, { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ContactList from "@/components/organisms/ContactList";
import ContactDetail from "@/components/organisms/ContactDetail";
import ContactModal from "@/components/organisms/ContactModal";
import DeleteContactModal from "@/components/organisms/DeleteContactModal";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { leadService } from "@/services/api/leadService";

const LeadsPage = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.user);
  const [selectedContact, setSelectedContact] = useState(null);
  const [editingContact, setEditingContact] = useState(null);
  const [deletingContact, setDeletingContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMobileDetail, setShowMobileDetail] = useState(false);

  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
    setShowMobileDetail(true);
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setShowModal(true);
  };

  const handleDeleteContact = (contact) => {
    setDeletingContact(contact);
    setShowDeleteModal(true);
  };

  const handleSaveContact = () => {
    setShowModal(false);
    setEditingContact(null);
  };

  const handleContactDeleted = (deletedContact) => {
    if (selectedContact?.Id === deletedContact.Id) {
      setSelectedContact(null);
      setShowMobileDetail(false);
    }
    setShowDeleteModal(false);
    setDeletingContact(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingContact(null);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingContact(null);
  };

  const handleCloseMobileDetail = () => {
    setShowMobileDetail(false);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="w-64 bg-white border-r border-slate-200 flex flex-col shadow-lg"
      >
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-md">
              <ApperIcon name="Mail" className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Lead Hub
              </h1>
              <p className="text-sm text-slate-600">Manage your leads</p>
            </div>
          </div>
        </div>
        
        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2">
          <div className="space-y-1">
            <button 
              onClick={() => navigate('/contacts')}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-green-50 rounded-lg transition-colors duration-200"
            >
              <ApperIcon name="Users" className="w-4 h-4" />
              All Contacts
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm font-medium text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg shadow-sm">
              <ApperIcon name="Mail" className="w-4 h-4" />
              All Leads
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-green-50 rounded-lg transition-colors duration-200">
              <ApperIcon name="Star" className="w-4 h-4" />
              Favorites
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-200">
          <div className="bg-gradient-to-r from-primary-50 to-green-50 rounded-lg p-4">
            <p className="text-xs font-medium text-slate-700 mb-2">Quick Tip</p>
            <p className="text-xs text-slate-600">
              Click on any lead to view details and manage information
            </p>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Lead List */}
        <div className="flex-1 flex flex-col">
          <header className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Leads</h2>
                <p className="text-sm text-slate-600">Manage and track your leads</p>
              </div>
              <Button
                icon="Plus"
                onClick={() => setShowModal(true)}
                className="shadow-md hover:shadow-lg transition-shadow"
              >
                Add Lead
              </Button>
            </div>
          </header>

<ContactList
            selectedContact={selectedContact}
            onSelectContact={handleSelectContact}
            onEditContact={handleEditContact}
            onDeleteContact={handleDeleteContact}
            service={leadService}
            entityType="lead"
            currentUser={currentUser}
          />
        </div>

        {/* Lead Detail Panel - Desktop */}
{selectedContact && (
          <motion.div
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            className="hidden lg:block w-96 bg-white border-l border-slate-200 shadow-xl"
          >
            <ContactDetail
              contact={selectedContact}
              onEdit={handleEditContact}
              onDelete={handleDeleteContact}
              onClose={() => setSelectedContact(null)}
              currentUser={currentUser}
            />
          </motion.div>
        )}

        {/* Lead Detail Panel - Mobile */}
{showMobileDetail && selectedContact && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="lg:hidden fixed inset-0 bg-white z-50"
          >
            <ContactDetail
              contact={selectedContact}
              onEdit={handleEditContact}
              onDelete={handleDeleteContact}
              onClose={handleCloseMobileDetail}
              currentUser={currentUser}
            />
          </motion.div>
        )}
      </div>

{/* Lead Modal */}
      {showModal && (
        <ContactModal
          isOpen={showModal}
          contact={editingContact}
          onClose={handleCloseModal}
          onSave={handleSaveContact}
          isEdit={!!editingContact}
          service={leadService}
          entityType='lead'
        />
      )}

      {/* Delete Confirmation Modal */}
{showDeleteModal && deletingContact && (
        <DeleteContactModal
          contact={deletingContact}
          onClose={handleCloseDeleteModal}
          onDelete={handleContactDeleted}
          service={leadService}
        />
      )}
    </div>
  );
};

export default LeadsPage;