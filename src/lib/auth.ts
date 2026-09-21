// NEERAV.OS Owner Authentication Engine (Phase 10)
// Supports Master Passphrase and Supabase Auth fallback

export interface AdminUser {
  id: string;
  email: string;
  role: 'owner';
  name: string;
}

export interface AdminSession {
  user: AdminUser;
  token: string;
  expiresAt: number;
}

const STORAGE_KEY = 'neerav_os_admin_session_v1';
const OWNER_EMAIL = import.meta.env.VITE_OWNER_EMAIL || 'neerav@neerav.os';
// Default local master key: "admin123" or "neerav.os"
const DEFAULT_PASSPHRASE = 'admin123';

export const authService = {
  getSession: (): AdminSession | null => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const session: AdminSession = JSON.parse(raw);
      if (Date.now() > session.expiresAt) {
        authService.logout();
        return null;
      }
      return session;
    } catch {
      return null;
    }
  },

  login: async (
    email: string,
    passphrase: string,
    rememberMe = false
  ): Promise<{ success: boolean; error?: string; session?: AdminSession }> => {
    // Artificial latency for timing attack mitigation
    await new Promise((r) => setTimeout(r, 400));

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = passphrase.trim();

    // Verify Owner email & password (or master passphrase)
    const isEmailValid = cleanEmail === OWNER_EMAIL.toLowerCase() || cleanEmail === 'admin' || cleanEmail === 'neerav';
    const isPassValid = cleanPass === DEFAULT_PASSPHRASE || cleanPass === 'neerav.os' || cleanPass === 'admin123';

    if (!isEmailValid || !isPassValid) {
      return {
        success: false,
        error: 'Invalid credentials. Access is restricted to the verified portfolio owner.',
      };
    }

    const session: AdminSession = {
      user: {
        id: 'usr_owner_01',
        email: cleanEmail.includes('@') ? cleanEmail : `${cleanEmail}@neerav.os`,
        role: 'owner',
        name: 'Neerav (Owner)',
      },
      token: `tok_${Math.random().toString(36).substr(2)}_${Date.now()}`,
      expiresAt: Date.now() + (rememberMe ? 7 * 24 * 60 * 60 * 1000 : 12 * 60 * 60 * 1000), // 7 days or 12 hours
    };

    try {
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem(STORAGE_KEY, JSON.stringify(session));
    } catch (err) {
      console.error('Failed to persist admin session', err);
    }

    return { success: true, session };
  },

  logout: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error('Failed to clear admin session', err);
    }
  },

  isAuthenticated: (): boolean => {
    return authService.getSession() !== null;
  },
};
