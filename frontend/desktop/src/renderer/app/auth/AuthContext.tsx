import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { apiFetch } from "../../lib/api";

type Role = "owner" | "employee";
type User = { id: string; name: string; role: Role };
type Tokens = { accessToken: string; refreshToken: string; user: User };

type Ctx = {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  login(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
  hasRole(role: Role): boolean;
};

const Ctx = createContext<Ctx>({} as any);
export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const saved = await window.secureAuth.getTokens();
      if (saved) {
        setUser(saved.user);
        setAccessToken(saved.accessToken);
      }
      setLoading(false);
    })();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await apiFetch<Tokens>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    await window.secureAuth.setTokens(res);
    setUser(res.user);
    setAccessToken(res.accessToken);
  };

  const logout = async () => {
    await window.secureAuth.clearTokens();
    setUser(null);
    setAccessToken(null);
  };

  const hasRole = (role: Role) => !!user && user.role === role;

  const value = useMemo(
    () => ({ user, accessToken, loading, login, logout, hasRole }),
    [user, accessToken, loading]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
