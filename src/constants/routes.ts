export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  PROJECTS: '/projects',
  TEAM: '/team',
  CONTACT: '/contact',
} as const;

export type Route = typeof ROUTES[keyof typeof ROUTES];
