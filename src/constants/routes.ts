export const ROUTES = {
  HOME: '/',
  INTRO: '/intro',
  ACTIVITY: '/activity',
  MEMBER: '/member',
  LOGIN: '/login',
} as const;

export type Route = typeof ROUTES[keyof typeof ROUTES];
