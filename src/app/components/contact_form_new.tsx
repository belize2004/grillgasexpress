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

interface Address {
  addressLine1: string;
  addressLine2: string;
  locality: string;           // City
  administrativeDistrictLevel1: string;  // State
  postalCode: string;         // ZIP code
}

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
  address: Address;
  phone: string;
  email: string;
  deliveryOption: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  address?: {
    addressLine1?: string;
    addressLine2?: string;
    locality?: string;
    administrativeDistrictLevel1?: string;
    postalCode?: string;
  };
  phone?: string;
  email?: string;
  message?: string;
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
    address: {
      addressLine1: '',
      addressLine2: '',
      locality: '',
      administrativeDistrictLevel1: '',
      postalCode: ''
    },
    phone: '',
    email: '',
    deliveryOption: 'Standard Delivery (2-5 Days)',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    // Validate first name
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    // Validate last name
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    // Validate address fields
    const addressErrors: FormErrors['address'] = {};
    
    if (!formData.address.addressLine1.trim()) {
      addressErrors.addressLine1 = 'Address line 1 is required';
    }
    
    if (!formData.address.locality.trim()) {
      addressErrors.locality = 'City is required';
    }
    
    if (!formData.address.administrativeDistrictLevel1.trim()) {
      addressErrors.administrativeDistrictLevel1 = 'State is required';
    }
    
    if (!formData.address.postalCode.trim()) {
      addressErrors.postalCode = 'ZIP code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.address.postalCode.trim())) {
      addressErrors.postalCode = 'Please enter a valid ZIP code';
    }
    
    if (Object.keys(addressErrors).length > 0) {
      newErrors.address = addressErrors;
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
          address_line1: formData.address.addressLine1.trim(),
          address_line2: formData.address.addressLine2.trim() || null,
          city: formData.address.locality.trim(),
          state: formData.address.administrativeDistrictLevel1.trim(),
          postal_code: formData.address.postalCode.trim(),
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
          address: {
            addressLine1: '',
            addressLine2: '',
            locality: '',
            administrativeDistrictLevel1: '',
            postalCode: ''
          },
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
    
    // Handle address fields separately
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
      
      // Clear error for this address field if it exists
      if (errors.address && errors.address[addressField as keyof Address]) {
        setErrors(prev => ({
          ...prev,
          address: {
            ...prev.address,
            [addressField]: undefined
          }
        }));
      }
    } else {
      // Handle other fields
      setFormData(prev => ({ ...prev, [name]: value }));
      // if (errors[name as keyof DeliveryFormData]) {
      //   setErrors(prev => ({ ...prev, [name]: undefined }));
      // }
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

          {/* Address Section */}
          <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
            <h3 className="text-md font-medium text-gray-700 mb-3">Address Information</h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 1<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address.addressLine1"
                  value={formData.address.addressLine1}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md ${errors.address?.addressLine1 ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                  placeholder="Street address"
                  required
                />
                {errors.address?.addressLine1 && <p className="text-red-500 text-sm mt-1">{errors.address.addressLine1}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 2
                </label>
                <input
                  type="text"
                  name="address.addressLine2"
                  value={formData.address.addressLine2}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Apartment, suite, unit, etc. (optional)"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address.locality"
                    value={formData.address.locality}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md ${errors.address?.locality ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    placeholder="City"
                    required
                  />
                  {errors.address?.locality && <p className="text-red-500 text-sm mt-1">{errors.address.locality}</p>}
                </div>
                
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address.administrativeDistrictLevel1"
                    value={formData.address.administrativeDistrictLevel1}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md ${errors.address?.administrativeDistrictLevel1 ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    placeholder="State"
                    required
                  />
                  {errors.address?.administrativeDistrictLevel1 && <p className="text-red-500 text-sm mt-1">{errors.address.administrativeDistrictLevel1}</p>}
                </div>
                
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address.postalCode"
                    value={formData.address.postalCode}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md ${errors.address?.postalCode ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    placeholder="ZIP Code"
                    required
                  />
                  {errors.address?.postalCode && <p className="text-red-500 text-sm mt-1">{errors.address.postalCode}</p>}
                </div>
              </div>
            </div>
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