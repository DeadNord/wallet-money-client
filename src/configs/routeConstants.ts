// Defining the structure for the routes object using TypeScript interface.
interface RoutePaths {
  signIn: string;
  signUp: string;
  dashboard: string;
}

// Defining and exporting the ROUTES constant with explicit paths for each route in the application.
// These paths are used throughout the application to navigate between different views and components.
export const ROUTES: RoutePaths = {
  signIn: '/signIn', // Path used for the sign-in page.
  signUp: '/signUp', // Path used for the sign-up or registration page.
  dashboard: '/', // Path used for the main dashboard or home page.
};
