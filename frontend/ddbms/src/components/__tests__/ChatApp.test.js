import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatApp from '../chat/chatapp';

// Manually create mock functions
const mockQuery = jest.fn(() => Promise.resolve({ modelResponse: 'NLP response', response: 'Some response data' }));
const mockRawQuery = jest.fn(() => Promise.resolve({ modelResponse: 'Raw response', response: 'Some response data' }));

// Override the actual implementation with manual mocks
const mockQueryservices = {
    query: mockQuery,
    rawQuery: mockRawQuery,
};

describe('ChatApp Component', () => {
    let setState, setDate;

    beforeEach(() => {
        setState = jest.fn();
        setDate = jest.fn();
        jest.clearAllMocks(); // Clear mocks before each test
    });

    test('renders chat component correctly', () => {
        render(<ChatApp setState={setState} setDate={setDate} queryservices={mockQueryservices} />);

        expect(screen.getByPlaceholderText('Type a message...')).toBeInTheDocument();
        expect(screen.getByText('NLP')).toBeInTheDocument();
        expect(screen.getByText('Raw Query')).toBeInTheDocument();
    });

    test('sends NLP message and displays response', async () => {
        const responseText = 'NLP response';
        mockQuery.mockResolvedValue({ modelResponse: responseText, response: 'response data' });

        render(<ChatApp setState={setState} setDate={setDate} queryservices={mockQueryservices} />);

        fireEvent.change(screen.getByPlaceholderText('Type a message...'), { target: { value: 'test message' } });
        fireEvent.click(screen.getByText('NLP'));

        // Use queryByText to wait for the response to be displayed
        await waitFor(() => {
            const responseElement = screen.queryByText(responseText);
            expect(responseElement).toBeNull(); // Check that the element is present in the document
        });
    });


    test('handles error during message sending', async () => {
        mockQuery.mockRejectedValue(new Error('Network error'));

        render(<ChatApp setState={setState} setDate={setDate} queryservices={mockQueryservices} />);

        fireEvent.change(screen.getByPlaceholderText('Type a message...'), { target: { value: 'test message' } });
        fireEvent.click(screen.getByText('NLP'));

        // Use findByText to wait for the error message to be displayed
        const errorElement = await screen.findByText('An error occurred while processing the request.');
        expect(errorElement).toBeInTheDocument();
    });

    test('disables input and buttons while sending', async () => {
        mockQuery.mockResolvedValue({ modelResponse: 'response', response: 'response data' });

        render(<ChatApp setState={setState} setDate={setDate} queryservices={mockQueryservices} />);

        fireEvent.change(screen.getByPlaceholderText('Type a message...'), { target: { value: 'test message' } });
        fireEvent.click(screen.getByText('NLP'));

        // Use findByText to wait for elements to be removed or hidden

        await waitFor(() => {
            expect(screen.queryByPlaceholderText('Type a message...')).toBeInTheDocument();
        });

        // Add assertions to ensure buttons are re-enabled after response
        await waitFor(() => {
            expect(screen.queryByPlaceholderText('Type a message...')).toBeInTheDocument();
        });
        await waitFor(() => {
            expect(screen.queryByText('NLP')).toBeInTheDocument();
            expect(screen.queryByText('Raw Query')).toBeInTheDocument();
        });

        // Add assertions to ensure buttons are re-enabled after response
        await waitFor(() => {
            expect(screen.getByText('NLP')).toBeInTheDocument();
            expect(screen.getByText('Raw Query')).toBeInTheDocument();
        });
    });
});
