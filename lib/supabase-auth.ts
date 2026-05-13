/**
 * Authentication helper - gets auth token from cookies
 * Simple approach that works with Next.js API routes
 */

export function getAuthHeaders() {
  // This runs on the client side to get the token
  return {
    getCookie: () => {
      const cookies = document.cookie.split(';');
      let sbToken = '';
      
      for (const cookie of cookies) {
        const name = 'sb-' + process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/https?:\/\//, '').replace(/[^a-zA-Z0-9]/g, '') + '-auth-token';
        if (cookie.trim().startsWith('access_token=')) {
          sbToken = cookie.trim().split('=')[1];
        }
        if (cookie.trim().startsWith('sb-' + (process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/https?:\/\//, '') || '').replace(/[^a-zA-Z0-9]/g, '') + '-auth-token=')) {
          const value = cookie.trim().split('=')[1];
          if (value && value.includes('.')) {
            try {
              const payload = JSON.parse(atob(value.split('.')[1]));
              sbToken = payload.access_token || '';
            } catch (e) {
              // ignore
            }
          }
        }
      }
      
      return sbToken;
    }
  };
}

// Helper to extract token from cookie string
export function extractAccessToken(cookieHeader: string): string | null {
  // Supabase stores the auth token in a cookie named:
  // sb-{project-ref}-auth-token
  // The value contains: {"access_token":"...","refresh_token":"...","token_type":"bearer",...}
  
  const cookies = cookieHeader.split(';');
  
  for (const cookie of cookies) {
    const trimmed = cookie.trim();
    // Check if it's the Supabase auth cookie
    if (trimmed.startsWith('sb-') && trimmed.includes('-auth-token=')) {
      try {
        const value = trimmed.split('=')[1];
        // The value might be JSON or URL-encoded JSON
        const decoded = decodeURIComponent(value);
        const json = JSON.parse(decoded);
        return json.access_token || null;
      } catch (e) {
        // Try as plain token
        return trimmed.split('=')[1] || null;
      }
    }
  }
  
  return null;
}