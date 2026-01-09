export const ROUTES = {
  HOME: '/',
  INTRO: '/intro',
  ACTIVITY: '/activity',
  MEMBER: '/member',
  LOGIN: '/login',
  PROFILE: '/Profile'
} as const;

export type Route = typeof ROUTES[keyof typeof ROUTES];
