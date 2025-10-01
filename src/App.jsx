import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ContactsPage from "@/components/pages/ContactsPage";

function App() {
  return (
    <BrowserRouter>
<div className="min-h-screen bg-green-50">
        <Routes>
          <Route path="/" element={<ContactsPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ zIndex: 9999 }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;