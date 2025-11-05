'use client';
import React from 'react';

const About = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-4xl font-extrabold text-gray-900">About CodeWear</h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          Welcome to <span className="font-semibold text-gray-900">CodeWear</span> — 
          where technology meets style! We design and deliver premium-quality 
          <span className="font-medium text-gray-800"> T-Shirts, Hoodies, Mugs, Stickers, 
          and Accessories </span> made especially for developers, designers, and tech lovers.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Our mission is to blend creativity and comfort, allowing you to express your 
          coding passion in everyday fashion. Whether you’re working on your next big project 
          or just chilling with your favorite coffee mug, CodeWear has got you covered.
        </p>
     
      </div>
    </section>
  );
};

export default About;
