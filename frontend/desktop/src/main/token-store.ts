import keytar from "keytar";
export type Role = "owner" | "employee";
export type Tokens = {
  accessToken: string;
  refreshToken: string;
  user: { id: string; name: string; role: Role };
};

const SERVICE = "DealerDesk";
const ACCOUNT = "auth";

export async function setTokens(tokens: Tokens) {
  await keytar.setPassword(SERVICE, ACCOUNT, JSON.stringify(tokens));
}
export async function getTokens(): Promise<Tokens | null> {
  const raw = await keytar.getPassword(SERVICE, ACCOUNT);
  return raw ? (JSON.parse(raw) as Tokens) : null;
}
export async function clearTokens() {
  await keytar.deletePassword(SERVICE, ACCOUNT);
}
