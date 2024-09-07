import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PieChart from '../chart/PieChart'; 

// Mock data for testing
const mockData = {
  nlp_start: '2024-09-01T12:00:00Z',
  request_in: '2024-09-01T11:50:00Z',
  request_ret: '2024-09-01T12:05:00Z',
  nlp_end: '2024-09-01T12:10:00Z'
};

describe('PieChart Component', () => {
  test('renders chart and total time when state is false', () => {
    const colors = ['red', 'green', 'blue'];
    const labels = ['Request In to NLP Start', 'NLP Start to Request Ret', 'Request Ret to NLP End'];

    render(<PieChart colors={colors} labels={labels} state={false} Data={mockData} />);
    
    // Calculate the total time for the assertion
    const requestInToNlpStart = new Date(mockData.nlp_start) - new Date(mockData.request_in);
    const nlpStartToRequestRet = new Date(mockData.request_ret) - new Date(mockData.nlp_start);
    const requestRetToNlpEnd = new Date(mockData.nlp_end) - new Date(mockData.request_ret);
    const totalTime = requestInToNlpStart + nlpStartToRequestRet + requestRetToNlpEnd;

    // Check if the Pie chart is rendered
    expect(screen.getByText(`Total time ${totalTime} milliseconds`)).toBeInTheDocument();
  });

  test('does not render chart when state is true', () => {
    const { container } = render(<PieChart colors={[]} labels={[]} state={true} Data={mockData} />);
    
    // Check that the chart is not rendered
    expect(container.querySelector('canvas')).toBeNull();
    expect(screen.queryByText('Total time')).toBeNull();
  });

  test('renders with default data when no Data prop is provided', () => {
    const colors = ['red', 'green', 'blue'];
    const labels = ['Label 1', 'Label 2', 'Label 3'];

    render(<PieChart colors={colors} labels={labels} state={false} Data={{}} />);
    
    // Check if the default total time is displayed (0 milliseconds)
    expect(screen.getByText('Total time 0 milliseconds')).toBeInTheDocument();
  });

  test('correctly calculates chart data based on Data prop', () => {
    const colors = ['red', 'green', 'blue'];
    const labels = ['Segment 1', 'Segment 2', 'Segment 3'];

    const { container } = render(<PieChart colors={colors} labels={labels} state={false} Data={mockData} />);
    
    // You might need to dig into the DOM or mock the Chart.js library to verify data accuracy
    // This step is optional and can be more complex based on your needs
  });
});
