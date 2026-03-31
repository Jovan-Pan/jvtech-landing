import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

// Mock 3D components — skip rendering heavy R3F
vi.mock('@/components/3d/HeroScene', () => ({
  default: () => <div data-testid="hero-scene" />,
}));
vi.mock('@/components/3d/TechScene', () => ({
  default: () => <div data-testid="tech-scene" />,
}));

// Mock lucide-react
vi.mock('lucide-react', () => ({
  ArrowRight: (p: Record<string, unknown>) => <svg data-testid="arrow-right" {...p} />,
  ChevronDown: (p: Record<string, unknown>) => <svg data-testid="chevron-down" {...p} />,
  MapPin: (p: Record<string, unknown>) => <svg data-testid="map-pin" {...p} />,
  Mail: (p: Record<string, unknown>) => <svg data-testid="mail-icon" {...p} />,
  Phone: (p: Record<string, unknown>) => <svg data-testid="phone-icon" {...p} />,
  Globe: (p: Record<string, unknown>) => <svg data-testid="globe-icon" {...p} />,
  Menu: (p: Record<string, unknown>) => <svg data-testid="menu-icon" {...p} />,
  X: (p: Record<string, unknown>) => <svg data-testid="x-icon" {...p} />,
  Star: (p: Record<string, unknown>) => <svg data-testid="star-icon" {...p} />,
  Quote: (p: Record<string, unknown>) => <svg data-testid="quote-icon" {...p} />,
  Send: (p: Record<string, unknown>) => <svg data-testid="send-icon" {...p} />,
  Clock: (p: Record<string, unknown>) => <svg data-testid="clock-icon" {...p} />,
  Check: (p: Record<string, unknown>) => <svg data-testid="check-icon" {...p} />,
  ChevronLeft: (p: Record<string, unknown>) => <svg data-testid="chevron-left" {...p} />,
  ChevronRight: (p: Record<string, unknown>) => <svg data-testid="chevron-right" {...p} />,
  MessageSquare: (p: Record<string, unknown>) => <svg data-testid="message-square" {...p} />,
  Sparkles: (p: Record<string, unknown>) => <svg data-testid="sparkles" {...p} />,
  Zap: (p: Record<string, unknown>) => <svg data-testid="zap-icon" {...p} />,
  Shield: (p: Record<string, unknown>) => <svg data-testid="shield-icon" {...p} />,
  Cloud: (p: Record<string, unknown>) => <svg data-testid="cloud-icon" {...p} />,
  BarChart3: (p: Record<string, unknown>) => <svg data-testid="barchart-icon" {...p} />,
  Cpu: (p: Record<string, unknown>) => <svg data-testid="cpu-icon" {...p} />,
  Code: (p: Record<string, unknown>) => <svg data-testid="code-icon" {...p} />,
  Compass: (p: Record<string, unknown>) => <svg data-testid="compass-icon" {...p} />,
  ArrowUpRight: (p: Record<string, unknown>) => <svg data-testid="arrow-up-right" {...p} />,
}));

// Mock IntersectionObserver
class MockIO {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}
vi.stubGlobal('IntersectionObserver', MockIO);

describe('Home Page', () => {
  it('renders the hero title from content', () => {
    render(<Home />);
    // Hero title from content.json — default locale is "id"
    expect(screen.getByText('Masa Depan Bisnis Anda')).toBeInTheDocument();
  });

  it('renders the stats section', () => {
    render(<Home />);
    expect(screen.getByText('Proyek Selesai')).toBeInTheDocument();
  });

  it('renders all services', () => {
    render(<Home />);
    // ServiceCard renders front+back → getAllByText for duplicates
    const cloudElements = screen.getAllByText('Cloud Infrastructure');
    expect(cloudElements.length).toBeGreaterThan(0);
    expect(screen.getAllByText('Cyber Security').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Data Analytics').length).toBeGreaterThan(0);
    expect(screen.getAllByText('AI & Automation').length).toBeGreaterThan(0);
  });

  it('renders about section', () => {
    render(<Home />);
    expect(screen.getByText(/Tahun Pengalaman|Years Experience/)).toBeInTheDocument();
  });

  it('renders partners section', () => {
    render(<Home />);
    expect(screen.getByText(/Dipercaya oleh|Trusted by/)).toBeInTheDocument();
  });

  it('renders contact form section', () => {
    render(<Home />);
    expect(screen.getByText('Hubungi Kami')).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    render(<Home />);
    const contactLinks = screen.getAllByRole('link', { name: /konsultasi|hubungi|contact/i });
    expect(contactLinks.length).toBeGreaterThan(0);
  });

  it('renders tech stack section header', () => {
    render(<Home />);
    expect(screen.getByText(/Tech Stack/)).toBeInTheDocument();
  });
});
