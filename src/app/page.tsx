'use client';

import dynamic from 'next/dynamic';
import content from '@/content/content.json';
import ServiceCard from '@/components/ui/ServiceCard';
import StatsCounter from '@/components/ui/StatsCounter';
import TestimonialsCarousel from '@/components/ui/TestimonialsCarousel';
import ContactForm from '@/components/ui/ContactForm';
import { ArrowRight, ChevronDown } from 'lucide-react';

const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), { ssr: false });
const TechScene = dynamic(() => import('@/components/3d/TechScene'), { ssr: false });

export default function Home() {
  const stats = content.stats.map(stat => ({
    ...stat,
    label: stat.label.id
  }));

  const services = content.services.map(service => ({
    ...service,
    title: service.title.id,
    desc: service.desc.id
  }));

  const testimonials = content.testimonials.map(t => ({
    ...t,
    quote: t.quote.id
  }));

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <HeroScene />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a192f]/50 to-[#0a192f] z-0" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="inline-block px-4 py-2 bg-[#00D4FF]/10 border border-[#00D4FF]/30 rounded-full text-[#00D4FF] text-sm font-medium mb-8 animate-pulse">
            IT Consulting Partner
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-display">
            Masa Depan
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-cyan-300">
              Bisnis Anda
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Kami membangun solusi teknologi yang cerdas, skalabel, dan aman untuk mendorong pertumbuhan bisnis Anda ke level berikutnya.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="group px-8 py-4 bg-gradient-to-r from-[#00D4FF] to-[#0099CC] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#00D4FF]/25 transition-all duration-300 flex items-center gap-2"
            >
              Mulai Konsultasi
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#services"
              className="px-8 py-4 border border-[#1d3a6a] text-white font-semibold rounded-full hover:border-[#00D4FF]/50 hover:bg-[#00D4FF]/5 transition-all duration-300"
            >
              Lihat Layanan
            </a>
          </div>

          <div className="mt-20 animate-bounce">
            <ChevronDown className="w-8 h-8 text-[#00D4FF]/50 mx-auto" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsCounter stats={stats} />

      {/* Services Section */}
      <section id="services" className="py-20 bg-[#0a192f]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">
              Layanan Kami
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Solusi end-to-end untuk transformasi digital perusahaan Anda.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <ServiceCard key={i} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 bg-gradient-to-b from-[#0a192f] to-[#112240]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">
              Tech Stack Kami
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Teknologi terdepan yang kami gunakan untuk membangun solusi Anda.
            </p>
          </div>
          <TechScene />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-[#112240]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-display">
                Siapa Kami
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                JVTech adalah perusahaan konsultan IT yang berfokus pada transformasi digital. Dengan pengalaman bertahun-tahun, kami membantu perusahaan dari berbagai skala untuk mengadopsi teknologi terbaru dan mencapai tujuan bisnis mereka.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                Kami percaya bahwa teknologi yang tepat dapat mentransformasi cara bisnis Anda beroperasi, memberikan keunggulan kompetitif, dan membuka peluang baru untuk pertumbuhan.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-[#00D4FF] font-semibold hover:gap-4 transition-all duration-300"
              >
                Pelajari Lebih Lanjut
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-[#00D4FF]/20 to-transparent rounded-3xl border border-[#00D4FF]/20 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold text-[#00D4FF] mb-2 font-display">10+</div>
                  <div className="text-gray-400">Tahun Pengalaman</div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#00D4FF]/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-[#0a192f]">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-center text-gray-500 text-sm uppercase tracking-widest mb-10">
            Dipercaya oleh Perusahaan Terkemuka
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            {content.partners.map((partner, i) => (
              <div key={i} className="text-2xl font-bold text-gray-400 hover:text-white transition-colors cursor-default">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsCarousel testimonials={testimonials} />

      {/* Contact Section */}
      <ContactForm />
    </div>
  );
}
