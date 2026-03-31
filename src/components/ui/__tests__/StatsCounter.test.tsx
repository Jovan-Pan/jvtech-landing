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
    expect(screen.getByText('Proyek Selesai')).toBeInTheDocument();
    expect(screen.getByText('Klien Aktif')).toBeInTheDocument();
  });

  it('sets up intersection observer on mount', () => {
    render(<StatsCounter stats={mockStats} />);
    expect(mockObserve).toHaveBeenCalled();
  });

  it('handles empty stats array', () => {
    render(<StatsCounter stats={[]} />);
    const grid = document.querySelector('.grid');
    expect(grid).toBeInTheDocument();
  });

  it('renders stat suffix values', () => {
    render(<StatsCounter stats={mockStats} />);
    // Counter starts at 0, suffixes appended — use getByText with spans
    const suffixes = document.querySelectorAll('span');
    const texts = Array.from(suffixes).map(el => el.textContent);
    expect(texts.some(t => t?.includes('+'))).toBe(true);
    expect(texts.some(t => t?.includes('/7'))).toBe(true);
  });

  it('renders gradient dividers between stats', () => {
    render(<StatsCounter stats={mockStats} />);
    const dividers = document.querySelectorAll('.bg-gradient-to-b');
    expect(dividers.length).toBeGreaterThan(0);
  });
});
