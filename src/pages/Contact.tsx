import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

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
      <div className="pt-20 bg-primary-50">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="heading-lg mb-6">Contact Us</h1>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Have questions or need assistance? We're here to help!
              Reach out to our team using the contact form or through the provided contact information.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-md mb-6 text-primary-700">Get in Touch</h2>
            <p className="text-gray-600 mb-8">
              Whether you have questions about our garden spaces, need help with a booking,
              or want to explore partnership opportunities, our team is ready to assist you.
              Fill out the form, and we'll get back to you as soon as possible.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="bg-primary-100 p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Our Office</h3>
                  <p className="text-gray-600">
                    123 Green Street, Skyline Tower<br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary-100 p-3 rounded-full mr-4">
                  <Mail className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email Us</h3>
                  <p className="text-gray-600">
                    General Inquiries: <a href="mailto:hello@urbanoasis.com" className="text-primary-600 hover:underline">hello@urbanoasis.com</a><br />
                    Support: <a href="mailto:support@urbanoasis.com" className="text-primary-600 hover:underline">support@urbanoasis.com</a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary-100 p-3 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Call Us</h3>
                  <p className="text-gray-600">
                    Customer Service: <a href="tel:+11234567890" className="text-primary-600 hover:underline">(123) 456-7890</a><br />
                    Partnership Inquiries: <a href="tel:+11234567891" className="text-primary-600 hover:underline">(123) 456-7891</a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary-100 p-3 rounded-full mr-4">
                  <MessageSquare className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Live Chat</h3>
                  <p className="text-gray-600">
                    Our support team is available for live chat<br />
                    Monday-Friday: 9 AM - 6 PM EST
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-lg shadow-medium p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              
              {submitted ? (
                <div className="bg-success-50 border border-success-200 text-success-700 px-4 py-3 rounded mb-6">
                  Thank you for your message! We'll get back to you soon.
                </div>
              ) : null}
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="label">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="label">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="subject" className="label">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="input"
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Booking Help">Booking Help</option>
                    <option value="Partnership Opportunity">Partnership Opportunity</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Feedback">Feedback</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="label">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="input"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <button type="submit" className="btn-primary w-full flex items-center justify-center">
                  <Send size={18} className="mr-2" />
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="heading-md mb-4">Visit Our Office</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our headquarters is located in the heart of the city, easily accessible by public transportation.
            </p>
          </motion.div>
          
          <div className="rounded-lg overflow-hidden shadow-medium h-96">
            {/* Here you would typically embed a Google Map */}
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <p className="text-gray-600">Map placeholder - Google Maps would be embedded here</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-primary-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-md mb-6">Join Our Newsletter</h2>
            <p className="text-gray-600 max-w-3xl mx-auto mb-8">
              Stay updated with the latest news, garden additions, and special offers from Urban Oasis.
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="input rounded-r-none flex-grow"
                />
                <button className="btn-primary rounded-l-none px-6">
                  Subscribe
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Contact;