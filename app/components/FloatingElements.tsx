'use client'

import React from 'react'

const FloatingElements = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Geometric shapes */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-primary-400/20 rotate-45 floating-animation"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-purple-400/20 rounded-full floating-animation" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-60 left-1/4 w-3 h-3 bg-cyan-400/20 floating-animation" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-40 right-10 w-5 h-5 bg-pink-400/20 rotate-12 floating-animation" style={{animationDelay: '3s'}}></div>
      <div className="absolute bottom-20 left-20 w-2 h-2 bg-yellow-400/20 rounded-full floating-animation" style={{animationDelay: '4s'}}></div>
      
      {/* Lines */}
      <div className="absolute top-32 right-1/3 w-16 h-0.5 bg-gradient-to-r from-primary-400/10 to-transparent floating-animation" style={{animationDelay: '0.5s'}}></div>
      <div className="absolute bottom-32 left-1/3 w-20 h-0.5 bg-gradient-to-r from-purple-400/10 to-transparent floating-animation" style={{animationDelay: '2.5s'}}></div>
      
      {/* Circles */}
      <div className="absolute top-1/3 right-8 w-8 h-8 border border-primary-300/20 rounded-full floating-animation" style={{animationDelay: '1.5s'}}></div>
      <div className="absolute bottom-1/3 left-8 w-6 h-6 border border-purple-300/20 rounded-full floating-animation" style={{animationDelay: '3.5s'}}></div>
    </div>
  )
}

export default FloatingElements 