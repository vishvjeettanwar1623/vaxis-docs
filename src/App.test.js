import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

test('renders vaxis docs branding', () => {
  render(<App />);
  const brandingElements = screen.getAllByText(/Vaxis Docs/i);
  expect(brandingElements.length).toBeGreaterThan(0);
});

test('assistant chatbot redirects and explains installation commands', async () => {
  render(<App />);
  
  // Open the assistant
  const assistantBtn = screen.getByRole('button', { name: /Vaxis Assistant/i });
  fireEvent.click(assistantBtn);
  
  // Find the input
  const input = screen.getByPlaceholderText(/Ask a question about Vaxis.../i);
  const sendBtn = screen.getByRole('button', { name: /Send/i });
  
  // Ask how to install
  fireEvent.change(input, { target: { value: 'how to install it' } });
  fireEvent.click(sendBtn);
  
  // Wait for the response
  await waitFor(() => {
    expect(screen.getByText(/You can find details about this on the Quickstart page/i)).toBeInTheDocument();
  }, { timeout: 1000 });
  
  // Ask follow-up: "I don't understand"
  fireEvent.change(input, { target: { value: "i don't understand" } });
  fireEvent.click(sendBtn);
  
  // Wait for the full quickstart contents (e.g. npm install -g @vaxis/cli)
  await waitFor(() => {
    expect(screen.getByText(/npm install -g @vaxis\/cli/i)).toBeInTheDocument();
  }, { timeout: 1000 });
});

test('assistant chatbot redirects to Obsidian Vault page', async () => {
  render(<App />);
  
  // Open the assistant
  const assistantBtn = screen.getByRole('button', { name: /Vaxis Assistant/i });
  fireEvent.click(assistantBtn);
  
  const input = screen.getByPlaceholderText(/Ask a question about Vaxis.../i);
  const sendBtn = screen.getByRole('button', { name: /Send/i });
  
  // Ask about obsidian vault
  fireEvent.change(input, { target: { value: 'tell me about obsidian vault' } });
  fireEvent.click(sendBtn);
  
  await waitFor(() => {
    expect(screen.getByText(/You can find details about this on the Obsidian Vault page/i)).toBeInTheDocument();
  }, { timeout: 1000 });
  
  // Ask follow up
  fireEvent.change(input, { target: { value: 'explain it' } });
  fireEvent.click(sendBtn);
  
  await waitFor(() => {
    expect(screen.getByText(/Vaxis uses Obsidian as its storage and visualization layer/i)).toBeInTheDocument();
  }, { timeout: 1000 });
});
