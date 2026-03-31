import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import HeroScene from '@/components/3d/HeroScene';

// Mock @react-three/fiber
vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="canvas-mock">{children}</div>
  ),
  useFrame: vi.fn(),
}));

// Mock @react-three/drei
vi.mock('@react-three/drei', () => ({
  Points: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="points">{children}</div>
  ),
  PointMaterial: () => <div data-testid="point-material" />,
}));

// Partial mock three — keep real exports but override what's needed
vi.mock('three', async (importOriginal) => {
  const actual = await importOriginal<typeof import('three')>();
  return {
    ...actual,
  };
});

describe('HeroScene', () => {
  it('renders without crashing', () => {
    const { container } = render(<HeroScene />);
    expect(container).toBeInTheDocument();
  });

  it('has correct z-index positioning', () => {
    render(<HeroScene />);
    const wrapper = document.querySelector('.-z-10');
    expect(wrapper).toBeInTheDocument();
  });
});
