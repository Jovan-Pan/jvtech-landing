import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TechScene from '@/components/3d/TechScene';

// Mock @react-three/fiber
vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="canvas">{children}</div>
  ),
  useFrame: vi.fn(),
}));

// Mock @react-three/drei
vi.mock('@react-three/drei', () => ({
  Text: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="text">{children}</div>
  ),
  Float: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="float">{children}</div>
  ),
}));

// Partial mock three
vi.mock('three', async (importOriginal) => {
  const actual = await importOriginal<typeof import('three')>();
  return { ...actual };
});

describe('TechScene', () => {
  it('renders without crashing', () => {
    const { container } = render(<TechScene />);
    expect(container).toBeInTheDocument();
  });

  it('has correct container dimensions', () => {
    render(<TechScene />);
    const wrapper = document.querySelector('.w-full.h-\\[400px\\]');
    expect(wrapper).toBeInTheDocument();
  });
});
