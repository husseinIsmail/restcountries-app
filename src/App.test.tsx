import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders a header with app title', () => {
  render(<App />);
  const headerTextElement = screen.getByText('Where in the world?');
  expect(headerTextElement).toBeInTheDocument();
});
