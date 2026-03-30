'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  image: string;
}

export default function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-20 bg-[#0a192f]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="relative bg-[#112240] rounded-3xl p-8 md:p-12 border border-[#1d3a6a]">
          <Quote className="absolute top-6 left-6 w-12 h-12 text-[#00D4FF]/20" />
          
          <div className="text-center">
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8 italic">
              &ldquo;{testimonials[current].quote}&rdquo;
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0a192f] flex items-center justify-center text-white font-bold">
                {testimonials[current].author.charAt(0)}
              </div>
              <div className="text-left">
                <p className="text-white font-semibold">{testimonials[current].author}</p>
                <p className="text-[#00D4FF] text-sm">Verified Client</p>
              </div>
            </div>
          </div>

          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#1d3a6a] flex items-center justify-center text-white hover:bg-[#00D4FF] transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#1d3a6a] flex items-center justify-center text-white hover:bg-[#00D4FF] transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === current ? 'bg-[#00D4FF] w-6' : 'bg-[#1d3a6a]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
