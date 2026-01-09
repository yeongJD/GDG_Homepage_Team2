export const googleAuthUtils = {
  getOAuthUrl: (): string => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = `${window.location.origin}/social/google`;
    const scope = 'openid email profile';
    const state = crypto.randomUUID();

    console.log('=== Google OAuth URL Generation ===');
    console.log('Client ID:', clientId);
    console.log('Redirect URI:', redirectUri);
    console.log('Scope:', scope);
    console.log('State:', state);

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope,
      state,
    });

    const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    console.log('OAuth URL:', oauthUrl);

    return oauthUrl;
  },

  redirectToGoogle: () => {
    window.location.href = googleAuthUtils.getOAuthUrl();
  },
};
