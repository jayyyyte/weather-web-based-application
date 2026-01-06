import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import {SearchBar} from '../SearchBar';

describe('SearchBar Component', () => {
  it('should render search input and buttons', () => {
    const mockSearch = vi.fn();
    const mockLocation = vi.fn();

    render(<SearchBar onSearch={mockSearch} onUseLocation={mockLocation} />);

    expect(screen.getByPlaceholderText(/search for a city/i)).toBeDefined();
    expect(screen.getByText(/search/i)).toBeDefined();
    expect(screen.getByText(/use my location/i)).toBeDefined();
  });

  it('should call onSearch when search button clicked', () => {
    const mockSearch = vi.fn();
    const mockLocation = vi.fn();

    render(<SearchBar onSearch={mockSearch} onUseLocation={mockLocation} />);

    const input = screen.getByPlaceholderText(/search for a city/i) as HTMLInputElement;
    const searchBtn = screen.getByText(/^search$/i);

    fireEvent.change(input, { target: { value: 'Tokyo' } });
    fireEvent.click(searchBtn);

    expect(mockSearch).toHaveBeenCalledWith('Tokyo');
  });

  it('should call onSearch on Enter key press', () => {
    const mockSearch = vi.fn();
    const mockLocation = vi.fn();

    render(<SearchBar onSearch={mockSearch} onUseLocation={mockLocation} />);

    const input = screen.getByPlaceholderText(/search for a city/i) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Paris' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(mockSearch).toHaveBeenCalledWith('Paris');
  });

  it('should not call onSearch with empty input', () => {
    const mockSearch = vi.fn();
    const mockLocation = vi.fn();

    render(<SearchBar onSearch={mockSearch} onUseLocation={mockLocation} />);

    const searchBtn = screen.getByText(/^search$/i);
    fireEvent.click(searchBtn);

    expect(mockSearch).not.toHaveBeenCalled();
  });

  it('should call onUseLocation when location button clicked', () => {
    const mockSearch = vi.fn();
    const mockLocation = vi.fn();

    render(<SearchBar onSearch={mockSearch} onUseLocation={mockLocation} />);

    const locationBtn = screen.getByText(/use my location/i);
    fireEvent.click(locationBtn);

    expect(mockLocation).toHaveBeenCalled();
  });
});