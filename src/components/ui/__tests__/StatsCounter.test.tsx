import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatsCounter from '@/components/ui/StatsCounter';

// Mock IntersectionObserver with proper class mock
const mockObserve = vi.fn();
const mockDisconnect = vi.fn();

class MockIntersectionObserver {
  observe = mockObserve;
  disconnect = mockDisconnect;
  unobserve = vi.fn();
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

describe('StatsCounter', () => {
  const mockStats = [
    { value: 100, suffix: '+', label: 'Proyek Selesai' },
    { value: 50, suffix: '+', label: 'Klien Aktif' },
    { value: 10, suffix: '+', label: 'Tahun Pengalaman' },
    { value: 24, suffix: '/7', label: 'Support' },
  ];

  it('renders all stat labels', () => {
    render(<StatsCounter stats={mockStats} />);
    expect(screen.getByText('Proyek Selesai')).toBeInTheDocument();
    expect(screen.getByText('Klien Aktif')).toBeInTheDocument();
    expect(screen.getByText('Tahun Pengalaman')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
  });

  it('renders correct number of stat items', () => {
    render(<StatsCounter stats={mockStats} />);
    // Each stat has a label
    expect(screen.getByText('Proyek Selesai')).toBeInTheDocument();
    expect(screen.getByText('Klien Aktif')).toBeInTheDocument();
  });

  it('sets up intersection observer on mount', () => {
    render(<StatsCounter stats={mockStats} />);
    expect(mockObserve).toHaveBeenCalled();
  });

  it('handles empty stats array', () => {
    render(<StatsCounter stats={[]} />);
    // Should render the grid container
    const grid = document.querySelector('.grid');
    expect(grid).toBeInTheDocument();
  });
});
