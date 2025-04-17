import React, { useState } from 'react';

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
  total
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

  const validateForm = () => {
    const newErrors: Partial<DeliveryFormData> = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

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
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof DeliveryFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Get In Touch</h2>
        <p className="text-gray-600 mb-6">Our friendly team would love to hear from you.</p>

        <form  className="space-y-4">
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
                className="{w-full p-2 border rounded-md ${errors.firstName ? 'border-red-500' : 'border-gray-300'}}"
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
                className="{w-full p-2 border rounded-md ${errors.lastName ? 'border-red-500' : 'border-gray-300'}}"
                placeholder="Last Name"
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
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
                className="{w-full p-2 border rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}}"
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
                className="{w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}}"
                placeholder="you@example.com"
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
                className="flex-1 px-4 py-2 bg-black text-white rounded-md  py-2 bg-[#0066d6]"
                disabled={isProcessing}
              >
                Send Message
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUsFormModal;