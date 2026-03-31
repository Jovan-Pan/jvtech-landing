import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAppStore } from '@/store/useAppStore';

describe('useAppStore', () => {
  it('has default locale of "id"', () => {
    const { result } = renderHook(() => useAppStore());
    expect(result.current.locale).toBe('id');
  });

  it('changes locale to "en"', () => {
    const { result } = renderHook(() => useAppStore());
    act(() => result.current.setLocale('en'));
    expect(result.current.locale).toBe('en');
  });

  it('changes locale to "zh"', () => {
    const { result } = renderHook(() => useAppStore());
    act(() => result.current.setLocale('zh'));
    expect(result.current.locale).toBe('zh');
  });

  it('changes locale back to "id"', () => {
    const { result } = renderHook(() => useAppStore());
    act(() => result.current.setLocale('en'));
    act(() => result.current.setLocale('id'));
    expect(result.current.locale).toBe('id');
  });
});
