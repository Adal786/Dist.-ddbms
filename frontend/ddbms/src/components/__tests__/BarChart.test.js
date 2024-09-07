import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import BarChart from '../chart/BarChart';

// Mocking the Bar component from react-chartjs-2
jest.mock('react-chartjs-2', () => ({
  Bar: (props) => {
    return (
      <div data-testid="mock-bar-chart">
        <p>Labels: {props.data.labels.join(', ')}</p>
        <p>Data: {props.data.datasets[0].data.join(', ')}</p>
      </div>
    );
  }
}));

// Mock Date.prototype.toLocaleTimeString globally
Date.prototype.toLocaleTimeString = jest.fn((date) => {
  // Assuming the output format is '12:00:10 PM'
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds} PM`;
});

describe('BarChart Component', () => {
  const mockData = [
    { request_in: '2024-09-04T12:00:00.000Z', request_ret: '2024-09-04T12:00:10.000Z' },
    { request_in: '2024-09-04T12:01:00.000Z', request_ret: '2024-09-04T12:01:12.000Z' },
  ];

  test('renders correctly with given data', () => {
    const { getByTestId } = render(<BarChart data={mockData} />);

    const mockBarChart = getByTestId('mock-bar-chart');

    expect(mockBarChart).toHaveTextContent('Data: 10000, 12000');
  });
});
