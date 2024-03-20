import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import DataVisualisation from '../DataVisualisation';
import axios from "axios";

jest.mock('axios');

describe('DataVisualisation', () => {

  test('fetches and displays data', async () => {
      const mockData = {
        fact: 'Test String',
        length: 130
      };
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({data: mockData});

    render(<DataVisualisation />);
    const loaderElem = screen.getByTestId("loader-test-id")
  
    expect(loaderElem).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(mockData.fact)).toBeInTheDocument();
    });
  });
  
  test('fetches and displays new data', async () => {
    const mockData = {
      fact: 'Refreshed Data',
      length: 140
    };
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({data: mockData});

    render(<DataVisualisation />);

    const button = screen.getByText('Refresh');
    fireEvent.click(button);
    const loaderElem = screen.getByTestId("loader-test-id")

    expect(loaderElem).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Refreshed Data")).toBeInTheDocument();
    });
  });

  test('fetches empty data', async () => {
    const mockData = {};
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({data: mockData});

    render(<DataVisualisation />);

    const loaderElem = screen.getByTestId("loader-test-id")

    expect(loaderElem).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Sorry no data found currently")).toBeInTheDocument();
    });
  });

  test('displays error message if fetch fails', async () => {
    const errorMessage = 'Error: Opps something went Wrong - Network error';

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({data: undefined});

    render(<DataVisualisation />);
    await waitFor(() => {
      expect(screen.getAllByText(errorMessage)[0]).toBeInTheDocument();
    });
  });
});

