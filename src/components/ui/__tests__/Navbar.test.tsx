import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '@/components/ui/Navbar';

// Mock lucide-react
vi.mock('lucide-react', () => ({
  Menu: () => <div data-testid="menu-icon" />,
  X: () => <div data-testid="close-icon" />,
  Globe: () => <div data-testid="globe-icon" />,
}));

// Mock zustand store
const mockSetLocale = vi.fn();
let mockLocale = 'id';

vi.mock('@/store/useAppStore', () => ({
  useAppStore: () => ({
    locale: mockLocale,
    setLocale: mockSetLocale,
  }),
}));

describe('Navbar', () => {
  beforeEach(() => {
    mockLocale = 'id';
    mockSetLocale.mockClear();
  });

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
    expect(screen.getByText('Kontak')).toBeInTheDocument();
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

  it('toggles mobile menu on button click', () => {
    render(<Navbar />);
    const menuButton = screen.getByTestId('menu-icon').closest('button')!;
    
    // Mobile menu not visible initially
    expect(screen.queryByText(/Konsultasi/)).toBeInTheDocument();
    
    // Open mobile menu
    fireEvent.click(menuButton);
    // Menu icon changes to X when open
    expect(screen.getByTestId('close-icon')).toBeInTheDocument();
  });

  it('toggles language dropdown', () => {
    render(<Navbar />);
    const langButton = screen.getByText('ID').closest('button')!;
    
    fireEvent.click(langButton);
    expect(screen.getByText('🇺🇸 EN')).toBeInTheDocument();
    expect(screen.getByText('🇨🇳 ZH')).toBeInTheDocument();
  });

  it('calls setLocale when language is selected', () => {
    render(<Navbar />);
    const langButton = screen.getByText('ID').closest('button')!;
    
    fireEvent.click(langButton);
    fireEvent.click(screen.getByText('🇺🇸 EN'));
    
    expect(mockSetLocale).toHaveBeenCalledWith('en');
  });
});
