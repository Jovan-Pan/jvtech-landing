import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ServiceCard from '@/components/ui/ServiceCard';

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Cloud: (props: Record<string, unknown>) => <div data-testid="cloud-icon" {...props} />,
  Shield: (props: Record<string, unknown>) => <div data-testid="shield-icon" {...props} />,
  BarChart3: (props: Record<string, unknown>) => <div data-testid="chart-icon" {...props} />,
  Cpu: (props: Record<string, unknown>) => <div data-testid="cpu-icon" {...props} />,
  Code: (props: Record<string, unknown>) => <div data-testid="code-icon" {...props} />,
  Compass: (props: Record<string, unknown>) => <div data-testid="compass-icon" {...props} />,
}));

describe('ServiceCard', () => {
  const defaultProps = {
    title: 'Cloud Infrastructure',
    desc: 'Solusi cloud untuk perusahaan Anda',
    icon: 'cloud',
  };

  it('renders the service description', () => {
    render(<ServiceCard {...defaultProps} />);
    expect(screen.getByText('Solusi cloud untuk perusahaan Anda')).toBeInTheDocument();
  });

  it('renders the back side with learn button', () => {
    render(<ServiceCard {...defaultProps} />);
    expect(screen.getByText('Pelajari')).toBeInTheDocument();
  });

  it('renders cloud icon by default', () => {
    render(<ServiceCard {...defaultProps} />);
    // Card renders front + back, so 2 cloud icons
    const icons = screen.getAllByTestId('cloud-icon');
    expect(icons.length).toBe(2);
  });

  it('renders different icon for shield', () => {
    render(<ServiceCard {...defaultProps} icon="shield" />);
    const icons = screen.getAllByTestId('shield-icon');
    expect(icons.length).toBe(2);
  });

  it('renders back side description with service name', () => {
    render(<ServiceCard {...defaultProps} />);
    expect(screen.getByText(/konsultasi gratis/i)).toBeInTheDocument();
  });
});
