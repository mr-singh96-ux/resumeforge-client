import { BriefcaseBusiness, Globe, Linkedin, Mail, MapPin, Phone, User } from 'lucide-react'
import React from 'react'
import api from '../configs/api';
const PersonalInfoForm = ({ data, onChange, removeBackground, setRemoveBackground }) => {

    const handleChange = (field, value) => {
        onChange({ ...data, [field]: value })
    }

    const handleImageChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post("/api/image/upload", formData);

  onChange({
    ...data,
    image: res.data.url
  });
};

    const fields = [
        { key: "full_name", label: "Full Name", icon: User, type: "text", required: true },
        { key: "email", label: "Email Address", icon: Mail, type: "email", required: true },
        { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
        { key: "location", label: "Location", icon: MapPin, type: "text" },
        { key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text" },
        { key: "linkedin", label: "LinkedIn Profile", icon: Linkedin, type: "url" },
        { key: "website", label: "Personal Website", icon: Globe, type: "url" }
    ]

    return (
        <div>
            <h3 className='text-lg font-semibold text-gray-900'>Personal Information</h3>
            <p className='text-sm text-gray-600'>Get Started with the personal information</p>

            <div className='flex items-center gap-2'>
                <label>
                    {data.image ? (
                        <img
                            src={data.image}
                            alt="user"
                            className='w-16 h-16 rounded-full object-cover mt-5 ring ring-slate-300 hover:opacity-80'
                        />
                    ) : (
                        <div className='inline-flex items-center gap-2 mt-5 text-slate-600 hover:text-slate-700 cursor-pointer'>
                            <User className='size-10 p-2.5 border rounded-full' />
                            upload user image
                        </div>
                    )}

                    <input
                        type="file"
                        accept="image/jpeg, image/png"
                        className="hidden"
                        onChange={handleImageChange}
                    />
                </label>

                {data.image && (
                    <div className='flex flex-col gap-1 pl-4 text-sm'>
                        <p>Remove Background</p>
                        <label className='relative inline-flex items-center cursor-pointer gap-3'>
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                onChange={() => setRemoveBackground(prev => !prev)}
                                checked={removeBackground}
                            />
                            <div className='w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-600'></div>
                            <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4'></span>
                        </label>
                    </div>
                )}
            </div>

            {fields.map((field) => {
                const Icon = field.icon;
                return (
                    <div key={field.key} className='space-y-1 mt-5'>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                            <Icon className="size-4" />
                            {field.label}
                            {field.required && <span className="text-red-500">*</span>}
                        </label>
                        <input
                            type={field.type}
                            value={data[field.key] || ""}
                            onChange={(e) => handleChange(field.key, e.target.value)}
                            className='mt-1 w-full px-3 py-2 border rounded-lg text-sm'
                            placeholder={`Enter your ${field.label.toLowerCase()}`}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default PersonalInfoForm