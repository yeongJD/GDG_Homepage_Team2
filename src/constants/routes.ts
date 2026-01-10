export const ROUTES = {
  HOME: '/',
  INTRO: '/intro',
  ACTIVITY: '/activity',
  MEMBER: '/member',
  LOGIN: '/login',
  PROFILE: '/Profile',
  GOOGLE_CALLBACK: '/social/google',
} as const;

export type Route = typeof ROUTES[keyof typeof ROUTES];
