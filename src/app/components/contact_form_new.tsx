import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { FaCheck, FaExclamationTriangle } from 'react-icons/fa';

// Initialize Supabase client with hardcoded values for testing
// In production, these should be loaded from environment variables properly
const supabaseUrl = 'https://mexvjgivsfadabaakqfk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1leHZqZ2l2c2ZhZGFiYWFrcWZrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjA5MDY2OCwiZXhwIjoyMDYxNjY2NjY4fQ.UE9ufO2xI4NfO3gnonUsOA0Ln6_xIide0EAftIRbwi0';
const supabase = createClient(supabaseUrl, supabaseKey);

// Define the database table name as a constant
const CONTACT_MESSAGES_TABLE = 'contact_messages';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (formData: DeliveryFormData) => void;
  isProcessing: boolean;
  total: number;
}

interface DeliveryFormData {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  email: string;
  deliveryOption: string;
  message: string;
}

const ContactUsFormModal: React.FC<ContactFormModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isProcessing,
//   total
}) => {
  const [formData, setFormData] = useState<DeliveryFormData>({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    email: '',
    deliveryOption: 'Standard Delivery (2-5 Days)',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<DeliveryFormData>>({});
  const [submitStatus, setSubmitStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const validateForm = () => {
    const newErrors: Partial<DeliveryFormData> = {};
    
    // Validate first name
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    // Validate last name
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    // Validate address
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    // Validate phone
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s+()-]{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus(null);
    
    if (validateForm()) {
      try {
        // Create contact message data object
        const contactData = {
          first_name: formData.firstName.trim(),
          last_name: formData.lastName.trim(),
          phone_number: formData.phone.trim(),
          email: formData.email.trim(),
          message: formData.message.trim() || null,
          created_at: new Date().toISOString()
        };

        // Insert data into Supabase using the client
        const { error } = await supabase
          .from(CONTACT_MESSAGES_TABLE)
          .insert([contactData]);

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }

        // Show success message
        setSubmitStatus({ 
          success: true, 
          message: 'Your message has been sent successfully! We will get back to you soon.' 
        });
        
        // Reset form after successful submission
        setFormData({
          firstName: '',
          lastName: '',
          address: '',
          phone: '',
          email: '',
          deliveryOption: 'Standard Delivery (2-5 Days)',
          message: ''
        });
        
        // Call the onConfirm callback after a delay to show success message
        setTimeout(() => {
          onConfirm(formData);
        }, 2000);
        
      } catch (error) {
        console.error('Error submitting to Supabase:', error);
        setSubmitStatus({ 
          success: false, 
          message: 'There was an error sending your message. Please check your information and try again.' 
        });
      }
    } else {
      // If validation fails, show an error message
      setSubmitStatus({
        success: false,
        message: 'Please fill in all required fields correctly.'
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof DeliveryFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Clear status message when user starts typing again
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Get In Touch</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <p className="text-gray-600 mb-6">Our friendly team would love to hear from you.</p>
        
    

        {submitStatus && (
          <div className={`p-4 mb-6 rounded-md flex items-start ${
            submitStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {submitStatus.success ? 
              <FaCheck className="mr-2 mt-1 flex-shrink-0" /> : 
              <FaExclamationTriangle className="mr-2 mt-1 flex-shrink-0" />
            }
            <span>{submitStatus.message}</span>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                placeholder="First Name"
                required
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                placeholder="Last Name"
                required
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.address ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              placeholder="Your address"
              required
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number<span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                placeholder="+1 (123) 456-7890"
                required
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                placeholder="you@example.com"
                required
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message (Optional)
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="E.g., leave tank by side gate"
              rows={3}
            />
          </div>

          <div className="border-t pt-4 mt-6">
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-black text-white rounded-md bg-[#0066d6] hover:bg-[#0055b3]"
                disabled={isProcessing}
              >
                {isProcessing ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUsFormModal; 