import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/ui/Footer';

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  MapPin: () => <div data-testid="map-pin-icon" />,
  Mail: () => <div data-testid="mail-icon" />,
  Phone: () => <div data-testid="phone-icon" />,
}));

describe('Footer', () => {
  it('renders the JVTech brand', () => {
    render(<Footer />);
    expect(screen.getByText('JV')).toBeInTheDocument();
    expect(screen.getByText('JVTech')).toBeInTheDocument();
  });

  it('renders quick links section header', () => {
    render(<Footer />);
    // Use getAllByText since "Tautan Cepat" is unique
    expect(screen.getByText('Tautan Cepat')).toBeInTheDocument();
  });

  it('renders service links', () => {
    render(<Footer />);
    expect(screen.getByText('Cloud Infrastructure')).toBeInTheDocument();
    expect(screen.getByText('Cyber Security')).toBeInTheDocument();
    expect(screen.getByText('Data Analytics')).toBeInTheDocument();
    expect(screen.getByText('AI & Automation')).toBeInTheDocument();
  });

  it('renders contact information', () => {
    render(<Footer />);
    expect(screen.getByText('contact@jvtech.com')).toBeInTheDocument();
    expect(screen.getByText(/Kezia Residence/)).toBeInTheDocument();
  });

  it('renders social media links', () => {
    render(<Footer />);
    const socialLinks = screen.getAllByRole('link');
    expect(socialLinks.length).toBeGreaterThan(4);
  });

  it('renders copyright with current year', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`${currentYear}`))).toBeInTheDocument();
    expect(screen.getByText(/Hak Cipta Dilindungi/)).toBeInTheDocument();
  });
});
