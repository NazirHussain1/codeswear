'use client';
import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully!');
    // yahan API call add kar sakte hain backend ko send karne ke liye
  };

  return (
    <div className="container mx-auto p-6">
      {/* Heading Section */}
      <h1 className="text-3xl font-bold mb-2 text-center">Contact Us</h1>
      <p className="text-center text-gray-600 mb-8">
        Have any questions? We’d love to hear from you. Fill out the form below!
      </p>

      {/* Contact Form Section */}
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6"
      >
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Message</label>
          <textarea
            name="message"
            rows="4"
            placeholder="Write your message here..."
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded p-2"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Send Message
        </button>
      </form>

      {/* Contact Info Section */}
      <div className="max-w-lg mx-auto mt-10 text-center">
        <h2 className="text-xl font-semibold mb-3">Our Contact Information</h2>
        <p>📍 123 Main Street, Lahore, Pakistan</p>
        <p>📞 +92 300 1234567</p>
        <p>📧 contact@yourwebsite.com</p>
      </div>

      {/* Map Placeholder */}
      <div className="mt-10 flex justify-center">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18..."
          width="100%"
          height="300"
          className="rounded-lg border"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
