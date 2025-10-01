import { toast } from 'react-toastify';

const { ApperClient } = window.ApperSDK;

const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const TABLE_NAME = 'contact_c';

export const contactService = {
  async getAll() {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "company_c"}},
          {"field": {"Name": "position_c"}},
          {"field": {"Name": "photo_c"}},
          {"field": {"Name": "tags_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "updated_at_c"}},
          {"field": {"Name": "Owner"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "CreatedBy"}},
          {"field": {"Name": "ModifiedOn"}},
          {"field": {"Name": "ModifiedBy"}}
        ],
        pagingInfo: {"limit": 1000, "offset": 0}
      };
      
      const response = await apperClient.fetchRecords(TABLE_NAME, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      if (!response?.data?.length) {
        return [];
      }
      
      return response.data.map(contact => ({
        ...contact,
        tags_c: contact.tags_c ? contact.tags_c.split(',').map(t => t.trim()) : []
      }));
    } catch (error) {
      console.error("Error fetching contacts:", error?.response?.data?.message || error.message);
      toast.error("Failed to load contacts");
      return [];
    }
  },

  async getById(id) {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "company_c"}},
          {"field": {"Name": "position_c"}},
          {"field": {"Name": "photo_c"}},
          {"field": {"Name": "tags_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "updated_at_c"}},
          {"field": {"Name": "Owner"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "CreatedBy"}},
          {"field": {"Name": "ModifiedOn"}},
          {"field": {"Name": "ModifiedBy"}}
        ]
      };
      
      const response = await apperClient.getRecordById(TABLE_NAME, parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error("Contact not found");
      }
      
      if (!response?.data) {
        throw new Error("Contact not found");
      }
      
      return {
        ...response.data,
        tags_c: response.data.tags_c ? response.data.tags_c.split(',').map(t => t.trim()) : []
      };
    } catch (error) {
      console.error(`Error fetching contact ${id}:`, error?.response?.data?.message || error.message);
      toast.error("Failed to load contact");
      throw error;
    }
  },

  async create(contactData) {
    try {
      const tags = Array.isArray(contactData.tags_c) ? contactData.tags_c.join(',') : contactData.tags_c || '';
      
      const params = {
        records: [{
          first_name_c: contactData.first_name_c,
          last_name_c: contactData.last_name_c,
          email_c: contactData.email_c,
          phone_c: contactData.phone_c,
          company_c: contactData.company_c,
          position_c: contactData.position_c || '',
          photo_c: contactData.photo_c || '',
          tags_c: tags,
          notes_c: contactData.notes_c || '',
          created_at_c: new Date().toISOString(),
          updated_at_c: new Date().toISOString()
        }]
      };
      
      const response = await apperClient.createRecord(TABLE_NAME, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} records:`, failed);
          failed.forEach(record => {
            if (record.errors) {
              record.errors.forEach(error => toast.error(`${error.fieldLabel}: ${error.message}`));
            }
            if (record.message) toast.error(record.message);
          });
          throw new Error("Failed to create contact");
        }
        
        if (successful.length > 0) {
          const createdContact = successful[0].data;
          return {
            ...createdContact,
            tags_c: createdContact.tags_c ? createdContact.tags_c.split(',').map(t => t.trim()) : []
          };
        }
      }
      
      throw new Error("Failed to create contact");
    } catch (error) {
      console.error("Error creating contact:", error?.response?.data?.message || error.message);
      throw error;
    }
  },

  async update(id, contactData) {
    try {
      const tags = Array.isArray(contactData.tags_c) ? contactData.tags_c.join(',') : contactData.tags_c || '';
      
      const params = {
        records: [{
          Id: parseInt(id),
          first_name_c: contactData.first_name_c,
          last_name_c: contactData.last_name_c,
          email_c: contactData.email_c,
          phone_c: contactData.phone_c,
          company_c: contactData.company_c,
          position_c: contactData.position_c || '',
          photo_c: contactData.photo_c || '',
          tags_c: tags,
          notes_c: contactData.notes_c || '',
          updated_at_c: new Date().toISOString()
        }]
      };
      
      const response = await apperClient.updateRecord(TABLE_NAME, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} records:`, failed);
          failed.forEach(record => {
            if (record.errors) {
              record.errors.forEach(error => toast.error(`${error.fieldLabel}: ${error.message}`));
            }
            if (record.message) toast.error(record.message);
          });
          throw new Error("Failed to update contact");
        }
        
        if (successful.length > 0) {
          const updatedContact = successful[0].data;
          return {
            ...updatedContact,
            tags_c: updatedContact.tags_c ? updatedContact.tags_c.split(',').map(t => t.trim()) : []
          };
        }
      }
      
      throw new Error("Failed to update contact");
    } catch (error) {
      console.error("Error updating contact:", error?.response?.data?.message || error.message);
      throw error;
    }
  },

  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };
      
      const response = await apperClient.deleteRecord(TABLE_NAME, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} records:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          throw new Error("Failed to delete contact");
        }
        
        return successful.length > 0;
      }
      
      throw new Error("Failed to delete contact");
    } catch (error) {
      console.error("Error deleting contact:", error?.response?.data?.message || error.message);
      throw error;
    }
  }
};