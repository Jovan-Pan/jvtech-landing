import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Navbar from '@/components/ui/Navbar';

// Mock lucide-react
vi.mock('lucide-react', () => ({
  Menu: () => <div data-testid="menu-icon" />,
  X: () => <div data-testid="close-icon" />,
  Globe: () => <div data-testid="globe-icon" />,
}));

// Mock zustand store — return the full object, not a selector function
vi.mock('@/store/useAppStore', () => ({
  useAppStore: vi.fn(() => ({
    locale: 'id',
    setLocale: vi.fn(),
  })),
}));

describe('Navbar', () => {
  it('renders the JVTech logo', () => {
    render(<Navbar />);
    expect(screen.getByText('JV')).toBeInTheDocument();
    expect(screen.getByText('JVTech')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Navbar />);
    expect(screen.getByText('Beranda')).toBeInTheDocument();
    expect(screen.getByText('Layanan')).toBeInTheDocument();
    expect(screen.getByText('Tentang')).toBeInTheDocument();
  });

  it('renders CTA button', () => {
    render(<Navbar />);
    expect(screen.getByText('Konsultasi')).toBeInTheDocument();
  });

  it('has correct navigation hrefs', () => {
    render(<Navbar />);
    const heroLink = screen.getByRole('link', { name: /beranda/i });
    expect(heroLink).toHaveAttribute('href', '#hero');
    const servicesLink = screen.getByRole('link', { name: /layanan/i });
    expect(servicesLink).toHaveAttribute('href', '#services');
  });
});
