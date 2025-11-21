'use client';

import React from 'react';

const About = () => {
  return (
    <section className="min-h-screen bg-gray-50 px-6 py-16 flex items-center justify-center">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            About CodeWear
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A premium e-commerce brand delivering high-quality tech-inspired apparel & accessories for developers worldwide.
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-xl p-10 space-y-12">

          {/* Story */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Our Story</h2>
            <p className="text-gray-600 leading-relaxed">
              Founded in 2023, CodeWear was created with one goal in mind—bringing creativity, style, 
              and technology together. We realized developers needed apparel that reflects their 
              passion, identity, and love for coding. What began as a small idea has transformed into 
              a movement where thousands of tech enthusiasts proudly wear their code.
            </p>
          </div>

          {/* Mission */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to deliver high-quality products that merge comfort with innovation. 
              Every design we create aims to inspire creativity, strengthen the tech community, and 
              empower individuals to express their passion for technology through fashion.
            </p>
          </div>

          {/* What We Offer */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">What We Offer</h2>

            <div className="grid md:grid-cols-3 gap-8">

              {/* T-Shirts */}
              <div className="text-center p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👕</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Premium T-Shirts</h3>
                <p className="text-gray-600 text-sm mt-2">
                  Stylish, soft, high-quality cotton tees featuring unique coding, tech, and dev-themed designs.
                </p>
              </div>

              {/* Hoodies */}
              <div className="text-center p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🧥</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Comfort Hoodies</h3>
                <p className="text-gray-600 text-sm mt-2">
                  Warm, cozy hoodies with modern tech designs—perfect for late-night coding sessions.
                </p>
              </div>

              {/* Mugs */}
              <div className="text-center p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">☕</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Custom Mugs</h3>
                <p className="text-gray-600 text-sm mt-2">
                  Start your day right with tech-inspired mugs featuring code snippets & developer humor.
                </p>
              </div>

            </div>
          </div>

          {/* Why Choose Us */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Why Choose CodeWear?</h2>
            <ul className="space-y-3 text-gray-600 leading-relaxed list-disc pl-6">
              <li>Premium materials & high-quality printing</li>
              <li>Exclusive developer-focused designs</li>
              <li>Worldwide shipping with fast delivery options</li>
              <li>Secure checkout experience</li>
              <li>Dedicated customer support</li>
            </ul>
          </div>

          {/* Quality Promise */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Our Quality Promise</h2>
            <p className="text-gray-600 leading-relaxed">
              We prioritize premium fabrics, durable stitching, and long-lasting prints. 
              Every product undergoes strict quality checks to ensure you receive only the best.
            </p>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Join Our Community</h2>
            <p className="text-gray-600 leading-relaxed">
              CodeWear is more than a store—it’s a global community of developers. Share your look with 
              <span className="font-semibold text-blue-600"> #CodeWearStyle </span>
              and connect with developers worldwide.
            </p>
          </div>

          {/* Call to Action */}
          <div className="text-center pt-6">
            <p className="text-lg font-semibold text-gray-800 mb-4">Ready to upgrade your developer style?</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-10 rounded-lg transition-all shadow">
              Shop Now
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
