"use client";

import React, { useState } from 'react';
import images from '@/constants/images';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { SiteSettingsFormValues } from '@/lib/validations/settings';

interface ContactHeroProps {
  settings?: Partial<SiteSettingsFormValues>;
}

export default function ContactHero({ settings = {} }: ContactHeroProps) {
  const customEase = [0.16, 1, 0.3, 1] as any;

  // Form State Management
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    try {
      const { submitContactMessage } = await import('@/lib/actions/messages');
      const result = await submitContactMessage({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        subject: formData.subject,
        message: formData.message,
      });

      if (result?.error) {
        setStatus('error');
      } else {
        setStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          subject: 'General Inquiry',
          message: '',
        });
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatExternalUrl = (url?: string) => {
    if (!url || url === '#' || url.trim() === '') return '#';
    const trimmed = url.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
    return `https://${trimmed}`;
  };

  const phone = settings.phoneNumber || '+123456780';
  const email = settings.contactEmail || 'Brume@gmail.com';
  const address = settings.address || '132 address lagos Nigeria';
  const twitterUrl = formatExternalUrl(settings.twitterUrl);
  const instagramUrl = formatExternalUrl(settings.instagramUrl);
  const discordUrl = formatExternalUrl(settings.discordUrl);

  return (
    <section className="w-full relative pt-8 md:pt-14 pb-2 md:pb-20 z-0">
      {/* Background Pastel Block */}
      <div className="absolute top-0 left-0 w-full h-[67%] bg-[#EEECFF] -z-10" />

      <div className="max-w-[90%] md:max-w-[85%] mx-auto w-full flex flex-col">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: customEase }}
            className="text-4xl md:text-5xl lg:text-6xl font-medium font-mono text-black tracking-tight"
          >
            We're Here To Support You
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: customEase }}
          >
            <Link 
              href="#form"
              className="bg-primary text-white px-4 md:px-8 py-4 rounded-xl font-bold text-base md:text-lg hover:bg-[#4ea2b2] transition-colors shadow-sm"
            >
              Free Consultation
            </Link>
          </motion.div>
        </div>

        {/* Contact Card */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
          className="w-full bg-white rounded-2xl shadow-xl flex flex-col lg:flex-row overflow-hidden"
          id="form"
        >
          
          {/* Left Panel: Contact Info (Teal) */}
          <div className="w-full lg:w-[40%] bg-[#5EB3C3] p-6 md:p-14 pb-30 md:pb-60 text-white flex flex-col relative overflow-hidden m-2 rounded-xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10 relative z-10">
              Contact Information
            </h3>
            
            <div className="flex flex-col gap-4 md:gap-6 relative z-10">
              <a href={`tel:${phone}`} className="flex items-center gap-4 hover:opacity-80 transition-opacity">
                <Phone className="w-6 h-6 shrink-0" />
                <span className="text-lg font-light">{phone}</span>
              </a>
              <a href={`mailto:${email}`} className="flex items-center gap-4 hover:opacity-80 transition-opacity">
                <Mail className="w-6 h-6 shrink-0" />
                <span className="text-lg font-light">{email}</span>
              </a>
              <div className="flex items-center gap-4">
                <MapPin className="w-6 h-6 shrink-0" />
                <span className="text-lg font-light">{address}</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-6 md:pt-10 relative z-10">
              <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="relative w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-80">
                <Image src={images.twittericon} alt='Twitter icon' fill />
              </a>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="relative w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-80">
                <Image src={images.igicon} alt='Instagram icon' fill />
              </a>
              <a href={discordUrl} target="_blank" rel="noopener noreferrer" className="relative w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-80">
                <Image src={images.discordicon} alt='Discord icon' className='w-10 h-10 object-contain'/>
              </a>
            </div>

            {/* Decorative Overlapping Circles */}
            <div className="absolute bottom-8 md:bottom-16 right-8 md:right-16 w-16 md:w-30 h-16 md:h-30 bg-[#BA68C86B] rounded-full z-20" />
            <div className="absolute -bottom-10 -right-10 w-30 md:w-48 h-30 md:h-48 bg-[#EEECFF] rounded-full" />
          </div>

          {/* Right Panel: The Form */}
          <div className="w-full lg:w-[60%] p-8 md:p-14 bg-white flex flex-col">
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              
              {/* Row 1: Names */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col gap-2">
                  <label htmlFor="firstName" className="text-sm font-semibold text-gray-700">First Name</label>
                  <input 
                    type="text" 
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="John" 
                    className="w-full pb-2 border-b border-gray-300 text-gray-900 focus:outline-none focus:border-[#5EB3C3] transition-colors bg-transparent placeholder-gray-400" 
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName" className="text-sm font-semibold text-gray-700">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder="Doe" 
                    className="w-full pb-2 border-b border-gray-300 text-gray-900 focus:outline-none focus:border-[#5EB3C3] transition-colors bg-transparent placeholder-gray-400" 
                  />
                </div>
              </div>

              {/* Row 2: Contact Methods */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="example@email.com" 
                    className="w-full pb-2 border-b border-gray-300 text-gray-900 focus:outline-none focus:border-[#5EB3C3] transition-colors bg-transparent placeholder-gray-400" 
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="phoneNumber" className="text-sm font-semibold text-gray-700">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    placeholder="+1 012 3456 789" 
                    className="w-full pb-2 border-b border-gray-300 text-gray-900 focus:outline-none focus:border-[#5EB3C3] transition-colors bg-transparent placeholder-gray-400" 
                  />
                </div>
              </div>

              {/* Row 3: Subject Radio Buttons */}
              <div className="flex flex-col gap-4">
                <label className="text-sm font-semibold text-gray-700">Select Subject?</label>
                <div className="flex flex-wrap items-center gap-6">
                  
                  {['General Inquiry', 'Technical Support', 'Sales & Billing', 'Other'].map((subjectOption) => (
                    <label key={subjectOption} className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="subject" 
                        value={subjectOption}
                        checked={formData.subject === subjectOption}
                        onChange={handleChange}
                        className="hidden peer" 
                      />
                      <div className="w-4 h-4 rounded-full bg-gray-200 peer-checked:bg-[#111111] flex items-center justify-center transition-colors">
                        <div className="w-2 h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100" />
                      </div>
                      <span className="text-sm text-gray-600 font-medium">{subjectOption}</span>
                    </label>
                  ))}
                  
                </div>
              </div>

              {/* Row 4: Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-semibold text-gray-700">Message</label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Write your message.." 
                  rows={2}
                  className="w-full pb-2 border-b border-gray-300 text-gray-900 focus:outline-none focus:border-[#5EB3C3] transition-colors bg-transparent placeholder-gray-400 resize-none" 
                />
              </div>

              {/* Submit Button & Status Messages */}
              <div className="flex flex-col md:flex-row items-center justify-between mt-4 gap-4">
                <div className="text-sm font-medium">
                  {status === 'success' && <span className="text-green-600">Your message has been sent successfully!</span>}
                  {status === 'error' && <span className="text-red-600">Something went wrong. Please try again.</span>}
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-primary text-white px-10 py-3.5 rounded font-medium text-base hover:bg-[#4ea2b2] transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>

            </form>
          </div>

        </motion.div>
      </div>
    </section>
  );
}