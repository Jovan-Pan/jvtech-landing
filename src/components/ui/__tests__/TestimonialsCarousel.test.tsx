import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TestimonialsCarousel from '@/components/ui/TestimonialsCarousel';

// Mock lucide-react
vi.mock('lucide-react', () => ({
  ChevronLeft: () => <div data-testid="chevron-left" />,
  ChevronRight: () => <div data-testid="chevron-right" />,
  Quote: () => <div data-testid="quote-icon" />,
}));

describe('TestimonialsCarousel', () => {
  const mockTestimonials = [
    { quote: 'Great service!', author: 'John Doe', image: '' },
    { quote: 'Amazing work!', author: 'Jane Smith', image: '' },
    { quote: 'Highly recommended!', author: 'Bob Wilson', image: '' },
  ];

  it('renders the first testimonial by default', () => {
    render(<TestimonialsCarousel testimonials={mockTestimonials} />);
    expect(screen.getByText(/Great service!/)).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders navigation buttons', () => {
    render(<TestimonialsCarousel testimonials={mockTestimonials} />);
    expect(screen.getByTestId('chevron-left')).toBeInTheDocument();
    expect(screen.getByTestId('chevron-right')).toBeInTheDocument();
  });

  it('navigates to next testimonial on click', () => {
    render(<TestimonialsCarousel testimonials={mockTestimonials} />);
    const nextButton = screen.getByTestId('chevron-right').closest('button')!;
    fireEvent.click(nextButton);
    expect(screen.getByText(/Amazing work!/)).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('navigates to previous testimonial on click', () => {
    render(<TestimonialsCarousel testimonials={mockTestimonials} />);
    const prevButton = screen.getByTestId('chevron-left').closest('button')!;
    // Go back from first (should wrap to last)
    fireEvent.click(prevButton);
    expect(screen.getByText(/Highly recommended!/)).toBeInTheDocument();
    expect(screen.getByText('Bob Wilson')).toBeInTheDocument();
  });

  it('renders dot indicators', () => {
    render(<TestimonialsCarousel testimonials={mockTestimonials} />);
    // Should have 3 dots (one per testimonial)
    const dots = document.querySelectorAll('.rounded-full.w-2, .rounded-full.w-6');
    expect(dots.length).toBe(3);
  });

  it('renders Verified Client text', () => {
    render(<TestimonialsCarousel testimonials={mockTestimonials} />);
    const verifiedTexts = screen.getAllByText('Verified Client');
    expect(verifiedTexts.length).toBeGreaterThan(0);
  });
});
