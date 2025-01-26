import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Custom render function that includes common providers
const customRender = (ui, options = {}) => {
  return {
    user: userEvent.setup(),
    ...render(ui, {
      // Add global context providers here if needed
      ...options,
    }),
  };
};

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render };
