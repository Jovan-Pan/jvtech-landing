import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactForm from '@/components/ui/ContactForm';

// Mock lucide-react
vi.mock('lucide-react', () => ({
  Send: () => <div data-testid="send-icon" />,
  CheckCircle: () => <div data-testid="check-icon" />,
}));

describe('ContactForm', () => {
  it('renders the contact form heading', () => {
    render(<ContactForm />);
    expect(screen.getByText('Hubungi Kami')).toBeInTheDocument();
  });

  it('renders form fields', () => {
    render(<ContactForm />);
    expect(screen.getByPlaceholderText('Nama lengkap')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('email@perusahaan.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ceritakan kebutuhan/)).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<ContactForm />);
    expect(screen.getByText('Kirim Pesan')).toBeInTheDocument();
  });

  it('shows success message after form submission', () => {
    render(<ContactForm />);

    const nameInput = screen.getByPlaceholderText('Nama lengkap');
    const emailInput = screen.getByPlaceholderText('email@perusahaan.com');
    const messageInput = screen.getByPlaceholderText(/Ceritakan kebutuhan/);
    const submitButton = screen.getByText('Kirim Pesan');

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Test message' } });
    fireEvent.click(submitButton);

    expect(screen.getByText('Pesan Terkirim!')).toBeInTheDocument();
    expect(screen.getByText(/kami akan menghubungi/i)).toBeInTheDocument();
  });

  it('has required attributes on form fields', () => {
    render(<ContactForm />);
    expect(screen.getByPlaceholderText('Nama lengkap')).toHaveAttribute('required');
    expect(screen.getByPlaceholderText('email@perusahaan.com')).toHaveAttribute('required');
    expect(screen.getByPlaceholderText(/Ceritakan kebutuhan/)).toHaveAttribute('required');
  });
});
