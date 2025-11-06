'use client';
import React from 'react';

const About = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">About CodeWear</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your Ultimate Destination for Developer Fashion and Coding Lifestyle
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          {/* Company Story */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Our Story</h2>
            <p className="text-gray-600 leading-relaxed">
              Founded in 2023, CodeWear emerged from a simple idea: developers deserve apparel that reflects 
              their passion and creativity. We noticed a gap in the market for high-quality, stylish clothing 
              that speaks the language of coders. What started as a small initiative has now grown into a 
              thriving community of developers, programmers, and tech enthusiasts who love to wear their code.
            </p>
          </div>

          {/* Mission Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              At CodeWear, we are on a mission to blend comfort, style, and technology. We believe that what 
              you wear should express who you are and what you love. Our products are designed to inspire 
              creativity, spark conversations, and build a community of like-minded individuals who are 
              passionate about technology and innovation.
            </p>
          </div>

          {/* Products Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">What We Offer</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* T-Shirts */}
              <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👕</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Premium T-Shirts</h3>
                <p className="text-gray-600 text-sm">
                  High-quality cotton t-shirts with unique coding designs, programming jokes, and tech-inspired 
                  graphics that make you stand out.
                </p>
              </div>

              {/* Hoodies */}
              <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🧥</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Comfortable Hoodies</h3>
                <p className="text-gray-600 text-sm">
                  Stay warm and stylish with our premium hoodies featuring coding themes, perfect for those 
                  late-night coding sessions.
                </p>
              </div>

              {/* Mugs */}
              <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">☕</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Unique Mugs</h3>
                <p className="text-gray-600 text-sm">
                  Start your day right with our collection of programmer mugs featuring code snippets, 
                  debugging humor, and tech-inspired designs.
                </p>
              </div>
            </div>
          </div>

          {/* Quality Promise */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Our Quality Promise</h2>
            <p className="text-gray-600 leading-relaxed">
              We are committed to delivering exceptional quality in every product. From the fabric of our 
              clothing to the printing on our mugs, we use premium materials and state-of-the-art printing 
              technology to ensure your CodeWear products last long and look great.
            </p>
          </div>

          {/* Community Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Join Our Community</h2>
            <p className="text-gray-600 leading-relaxed">
              When you shop with CodeWear, you are not just buying products - you are joining a community 
              of developers and tech enthusiasts. Share your CodeWear style on social media using 
              <span className="font-semibold text-blue-600"> #CodeWearStyle</span> and connect with fellow 
              developers worldwide.
            </p>
          </div>

          {/* Call to Action */}
          <div className="text-center pt-6">
            <p className="text-lg font-semibold text-gray-800 mb-4">
              Ready to Wear Your Code?
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;