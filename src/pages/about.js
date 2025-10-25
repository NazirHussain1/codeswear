'use client';
import React from 'react';

const About = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
          Welcome to <span className="font-semibold text-gray-800">Our Company</span>! 
          We are passionate about delivering innovative digital solutions that empower 
          businesses to grow, perform, and achieve excellence. Our team combines 
          creativity, technology, and strategy to craft exceptional user experiences 
          that make a difference.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed">
          With years of experience in web development, software engineering, and AI-driven 
          systems, we aim to build products that are reliable, scalable, and user-friendly. 
          We believe in quality, collaboration, and continuous improvement to ensure every 
          project exceeds expectations.
        </p>
      </div>
    </section>
  );
};

export default About;
