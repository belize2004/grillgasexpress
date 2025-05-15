import React, { useState } from 'react';

interface DeliveryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (formData: DeliveryFormData) => void;
  isProcessing: boolean;
  total: number;
}

interface Address {
  addressLine1: string;
  addressLine2: string;
  locality: string;                     // City
  administrativeDistrictLevel1: string; // State
  postalCode: string;  
  county:string;                 // ZIP code
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

const DeliveryFormModal: React.FC<DeliveryFormModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isProcessing,
  total
}) => {
  const [formData, setFormData] = useState<DeliveryFormData>({
    firstName: '',
    lastName: '',
    address: {
      addressLine1: '',
      addressLine2: '',
      locality: '',
      administrativeDistrictLevel1: '',
      postalCode: '',
      county:'',
    },
    phone: '',
    email: '',
    deliveryOption: 'Standard Delivery (2-5 Days)',
    message: ''
  });

  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    address?: {
      addressLine1?: string;
      locality?: string;
      administrativeDistrictLevel1?: string;
      postalCode?: string;
      county?:string;
    };
  }>({});

  const validateForm = () => {
    const newErrors: any = {};
    
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    // Address validation
    const addressErrors: any = {};
    if (!formData.address.addressLine1) addressErrors.addressLine1 = 'Street address is required';
    if (!formData.address.locality) addressErrors.locality = 'City is required';
    if (!formData.address.administrativeDistrictLevel1) addressErrors.administrativeDistrictLevel1 = 'State is required';
    if (!formData.address.postalCode) addressErrors.postalCode = 'ZIP code is required';
    if (!formData.address.county) addressErrors.county = 'County is required';
    
    
    if (Object.keys(addressErrors).length > 0) {
      newErrors.address = addressErrors;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onConfirm(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle nested address fields
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
      if (errors.address && errors.address[addressField as keyof typeof errors.address]) {
        setErrors(prev => ({
          ...prev,
          address: {
            ...prev.address,
            [addressField]: undefined
          }
        }));
      }
    } else {
      // Handle regular fields
      setFormData(prev => ({ ...prev, [name]: value }));
      
      // Clear error for this field if it exists
      if (errors[name as keyof typeof errors]) {
        setErrors(prev => ({ ...prev, [name]: undefined }));
      }
    }
  };

  if (!isOpen) return null;

  return (
    <section id='#form'>
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Complete Your Delivery</h2>
        <p className="text-gray-600 mb-6">
          Enter your details to get your order delivered fast and hassle-free. We&apos;ll confirm your order right away!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
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
                className={`w-full p-2 border rounded-md ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="First Name"
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
                className={`w-full p-2 border rounded-md ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Last Name"
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>
          </div>

          {/* Address Section */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Address<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address.addressLine1"
                value={formData.address.addressLine1}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.address?.addressLine1 ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="123 Main St"
              />
              {errors.address?.addressLine1 && <p className="text-red-500 text-sm mt-1">{errors.address.addressLine1}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Apartment, Suite, etc. (Optional)
              </label>
              <input
                type="text"
                name="address.addressLine2"
                value={formData.address.addressLine2}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Apt 4B"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address.locality"
                  value={formData.address.locality}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md ${errors.address?.locality ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Miami"
                />
                {errors.address?.locality && <p className="text-red-500 text-sm mt-1">{errors.address.locality}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address.administrativeDistrictLevel1"
                  value={formData.address.administrativeDistrictLevel1}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md ${errors.address?.administrativeDistrictLevel1 ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="FL"
                />
                {errors.address?.administrativeDistrictLevel1 && <p className="text-red-500 text-sm mt-1">{errors.address.administrativeDistrictLevel1}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP Code<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address.postalCode"
                  value={formData.address.postalCode}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md ${errors.address?.postalCode ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="33012"
                />
                {errors.address?.postalCode && <p className="text-red-500 text-sm mt-1">{errors.address.postalCode}</p>}
              </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  County<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address.county"
                  value={formData.address.county}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md ${errors.address?.county ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Escambia"
                />
                {errors.address?.county && <p className="text-red-500 text-sm mt-1">{errors.address.county}</p>}
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
                className={`w-full p-2 border rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="+1 (123) 456-7890"
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
                className={`w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Delivery Option<span className="text-red-500">*</span>
            </label>
            <select
              name="deliveryOption"
              value={formData.deliveryOption}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="Standard Delivery (2-5 Days)">Standard Delivery (2-5 Days)</option>
              <option value="Express Delivery (1-2 Days)">Express Delivery (1-2 Days)</option>
            </select>
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
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">Total Amount:</span>
              <span className="text-xl font-bold">${total.toFixed(2)}</span>
            </div>
            
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
                className="flex-1 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Confirm'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div></section>
  );
};

export default DeliveryFormModal;