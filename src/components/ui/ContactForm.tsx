'use client';

import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-[#112240] to-[#0a192f]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-sora">
            Hubungi Kami
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Siap mentransformasi bisnis Anda? Mari bicarakan kebutuhan Anda.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-[#00D4FF] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Pesan Terkirim!</h3>
            <p className="text-gray-400">Kami akan menghubungi Anda dalam 24 jam.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 mb-2 text-sm">Nama</label>
                <input
                  type="text"
                  required
                  className="w-full bg-[#112240] border border-[#1d3a6a] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-[#00D4FF] focus:outline-none transition-colors"
                  placeholder="Nama lengkap"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2 text-sm">Email</label>
                <input
                  type="email"
                  required
                  className="w-full bg-[#112240] border border-[#1d3a6a] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-[#00D4FF] focus:outline-none transition-colors"
                  placeholder="email@perusahaan.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-400 mb-2 text-sm">Pesan</label>
              <textarea
                required
                rows={5}
                className="w-full bg-[#112240] border border-[#1d3a6a] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-[#00D4FF] focus:outline-none transition-colors resize-none"
                placeholder="Ceritakan kebutuhan bisnis Anda..."
              />
            </div>
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-[#00D4FF] to-[#0099CC] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#00D4FF]/25 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Kirim Pesan
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
