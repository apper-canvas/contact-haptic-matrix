import { toast } from "react-toastify";
import React from "react";
import Error from "@/components/ui/Error";

const { ApperClient } = window.ApperSDK;

const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const TABLE_NAME = 'leads_c';

export const leadService = {
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
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "Tags"}},
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
      
      return response.data.map(lead => ({
        ...lead,
        tags_c: lead.Tags ? lead.Tags.split(',').map(t => t.trim()) : []
      }));
    } catch (error) {
      console.error("Error fetching leads:", error?.response?.data?.message || error.message);
      toast.error("Failed to load leads");
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
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "Tags"}},
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
        throw new Error("Lead not found");
      }
      
      if (!response?.data) {
        throw new Error("Lead not found");
      }
      
      return {
        ...response.data,
        tags_c: response.data.Tags ? response.data.Tags.split(',').map(t => t.trim()) : []
      };
    } catch (error) {
      console.error(`Error fetching lead ${id}:`, error?.response?.data?.message || error.message);
      toast.error("Failed to load lead");
      throw error;
    }
  },

  async create(leadData) {
    try {
      const tags = Array.isArray(leadData.tags_c) ? leadData.tags_c.join(',') : leadData.tags_c || '';
      
      const params = {
        records: [{
          first_name_c: leadData.first_name_c,
          last_name_c: leadData.last_name_c,
          email_c: leadData.email_c,
          phone_c: leadData.phone_c,
          company_c: leadData.company_c,
          status_c: leadData.status_c || 'New'
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
          throw new Error("Failed to create lead");
        }
        
        if (successful.length > 0) {
          const createdLead = successful[0].data;
          return {
            ...createdLead,
            tags_c: createdLead.Tags ? createdLead.Tags.split(',').map(t => t.trim()) : []
          };
        }
      }
      
      throw new Error("Failed to create lead");
    } catch (error) {
      console.error("Error creating lead:", error?.response?.data?.message || error.message);
      throw error;
    }
  },

async update(id, leadData) {
    try {
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      // Get current record to check ownership
      const existingRecord = await this.getById(id);
      if (!existingRecord) {
        return { success: false, message: 'Lead not found' };
      }
      
      // Check if current user owns this record
      const currentUserId = apperClient.userId;
      if (currentUserId !== existingRecord.CreatedBy) {
        toast.error('You can only update leads you created');
        return { success: false, message: 'You can only update leads you created' };
      }
      
      // Continue with existing update logic
      const tags = Array.isArray(leadData.tags_c) ? leadData.tags_c.join(',') : leadData.tags_c || '';
      
      const params = {
        records: [{
          Id: parseInt(id),
          first_name_c: leadData.first_name_c,
          last_name_c: leadData.last_name_c,
          email_c: leadData.email_c,
          phone_c: leadData.phone_c,
          company_c: leadData.company_c,
          status_c: leadData.status_c || 'New'
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
          throw new Error("Failed to update lead");
        }
        
        if (successful.length > 0) {
          const updatedLead = successful[0].data;
          return {
            ...updatedLead,
            tags_c: updatedLead.Tags ? updatedLead.Tags.split(',').map(t => t.trim()) : []
          };
        }
      }
      
      throw new Error("Failed to update lead");
    } catch (error) {
      console.error("Error updating lead:", error?.response?.data?.message || error.message);
      throw error;
    }
  },

async delete(id) {
    try {
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      // Get current record to check ownership
      const existingRecord = await this.getById(id);
      if (!existingRecord) {
        return { success: false, message: 'Lead not found' };
      }
      
      // Check if current user owns this record
      const currentUserId = apperClient.userId;
      if (currentUserId !== existingRecord.CreatedBy) {
        toast.error('You can only delete leads you created');
        return { success: false, message: 'You can only delete leads you created' };
      }
      
      // Continue with existing delete logic
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
          throw new Error("Failed to delete lead");
        }
        
        return successful.length > 0;
      }
      
      throw new Error("Failed to delete lead");
    } catch (error) {
      console.error("Error deleting lead:", error?.response?.data?.message || error.message);
      throw error;
    }
  }
};