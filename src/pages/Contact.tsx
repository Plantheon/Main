import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle, HelpCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    // Reset submission status after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="pt-20 bg-white">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h1 className="heading-lg mb-6">Get in Touch</h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Have questions or need help? We're here to assist you with your garden booking needs.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contact Info Bar */}
      <div className="py-6 bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex items-center justify-center gap-3">
              <Mail className="h-5 w-5 text-primary-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Email</p>
                <p className="text-sm text-gray-600">info@plantheon.com</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Phone className="h-5 w-5 text-primary-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Phone</p>
                <p className="text-sm text-gray-600">(123) 456-7890</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Clock className="h-5 w-5 text-primary-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Hours</p>
                <p className="text-sm text-gray-600">Mon-Fri: 9 AM - 6 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Contact Section */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Contact Form - Takes up 2/3 of the space */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-md border border-gray-200 p-8"
                >
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h2>
                    <p className="text-gray-600">
                      Fill out the form below and we'll respond within 2 hours during business hours.
                    </p>
                  </div>
                  
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2"
                    >
                      <CheckCircle size={20} />
                      <span>Thank you! We'll get back to you soon.</span>
                    </motion.div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="label">Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="input"
                          placeholder="Your name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="label">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="input"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="label">Subject</label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="input"
                      >
                        <option value="">Select a topic</option>
                        <option value="General Inquiry">General Question</option>
                        <option value="Booking Help">Booking Support</option>
                        <option value="Technical Support">Technical Issue</option>
                        <option value="Partnership Opportunity">Partnership</option>
                        <option value="Feedback">Feedback</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="label">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="input resize-none"
                        placeholder="How can we help you?"
                      ></textarea>
                    </div>
                    
                    <button type="submit" className="btn-primary btn-lg w-full flex items-center justify-center gap-2">
                      <Send size={18} />
                      Send Message
                    </button>
                  </form>
                </motion.div>
              </div>

              {/* Support Options Sidebar */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="h-full"
                >
                  <div className="flex flex-col gap-6 h-full">
                    {/* Live Chat */}
                    <div className="bg-blue-50 rounded-lg p-6 text-center flex-1">
                      <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageSquare className="h-7 w-7 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Live Chat</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        Get instant help during business hours
                      </p>
                      <button className="btn-outline btn-sm w-full">
                        Start Chat
                      </button>
                    </div>

                    {/* Office Location */}
                    <div className="bg-gray-50 rounded-lg p-6 text-center">
                      <div className="bg-gray-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MapPin className="h-7 w-7 text-gray-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Visit Us</h3>
                      <div className="text-gray-600 leading-relaxed">
                        <p>Bahnhofstraße 10</p>
                        <p>Stuttgart, 70192</p>
                      </div>
                    </div>

                    {/* FAQ */}
                    
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;