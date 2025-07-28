import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle } from 'lucide-react';

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

  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      primary: "info@plantheon.com",
      secondary: "support@plantheon.com",
      description: "Get in touch via email"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call Us",
      primary: "(123) 456-7890",
      secondary: "(123) 456-7891",
      description: "Speak with our team"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Visit Us",
      primary: "Bahnhofstraße 10",
      secondary: "Stuttgart, 70192",
      description: "Come to our office"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Business Hours",
      primary: "Mon-Fri: 9 AM - 6 PM",
      secondary: "Sat-Sun: 10 AM - 4 PM",
      description: "When we're available"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="pt-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold text-primary-800 mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Have questions about our garden spaces? Need help with a booking? 
              We're here to help you find your perfect Plantheon experience.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contact Methods Grid */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="bg-primary-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                  {method.icon}
                </div>
                <h3 className="font-display text-xl font-bold mb-2 text-gray-900">{method.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{method.description}</p>
                <div className="space-y-1">
                  <p className="font-medium text-gray-900">{method.primary}</p>
                  <p className="text-gray-600 text-sm">{method.secondary}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main Contact Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-8">
                <div className="mb-8">
                  <h2 className="font-display text-3xl font-bold text-gray-900 mb-3">Send us a Message</h2>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </div>
                
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-success-50 border border-success-200 text-success-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2"
                  >
                    <CheckCircle size={20} />
                    <span>Thank you for your message! We'll get back to you soon.</span>
                  </motion.div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Booking Help">Booking Help</option>
                      <option value="Partnership Opportunity">Partnership Opportunity</option>
                      <option value="Technical Support">Technical Support</option>
                      <option value="Feedback">Feedback</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="label">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="input resize-none"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="btn-primary btn-lg w-full flex items-center justify-center gap-2">
                    <Send size={18} />
                    Send Message
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Additional Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* FAQ Section */}
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8">
                <h3 className="font-display text-2xl font-bold text-primary-800 mb-6">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">How do I book a garden space?</h4>
                    <p className="text-gray-600 text-sm">
                      Simply browse our available gardens, select your preferred date and time, and complete your booking online.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Can I cancel or modify my booking?</h4>
                    <p className="text-gray-600 text-sm">
                      Yes, you can cancel or modify bookings up to 24 hours before your scheduled time through your dashboard.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">What's included in the garden rental?</h4>
                    <p className="text-gray-600 text-sm">
                      Each garden includes basic amenities like seating, water access, and any specialized equipment listed in the garden description.
                    </p>
                  </div>
                </div>
              </div>

              {/* Live Chat */}
              <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-success-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-success-600" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-gray-900">Live Chat Support</h3>
                    <p className="text-gray-600 text-sm">Get instant help from our team</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  Need immediate assistance? Our support team is available for live chat during business hours.
                </p>
                <button className="btn-outline btn-md w-full">
                  Start Live Chat
                </button>
              </div>

              {/* Response Time */}
              <div className="bg-accent-50 rounded-2xl p-6 text-center">
                <h3 className="font-display text-lg font-bold text-accent-800 mb-2">
                  Quick Response Guarantee
                </h3>
                <p className="text-accent-700 text-sm">
                  We respond to all inquiries within 2 hours during business hours
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Connected
            </h2>
            <p className="text-white/90 mb-8 text-lg">
              Subscribe to our newsletter for the latest garden additions, special offers, and urban wellness tips.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="input flex-grow rounded-xl border-0 shadow-lg text-center placeholder:text-center"
              />
              <button className="btn-secondary btn-lg rounded-xl shadow-lg whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Contact;