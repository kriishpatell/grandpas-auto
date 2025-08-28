// src/main/token-store.ts
import keytar from "keytar";
const SERVICE = "DealerDesk";
const ACCOUNT = "auth";
export type Tokens = { accessToken: string; refreshToken: string; user: { id: string; name: string; role: "owner"|"employee" } };

export async function setTokens(tokens: Tokens) {
  await keytar.setPassword(SERVICE, ACCOUNT, JSON.stringify(tokens));
}
export async function getTokens(): Promise<Tokens|null> {
  const raw = await keytar.getPassword(SERVICE, ACCOUNT);
  return raw ? JSON.parse(raw) as Tokens : null;
}
export async function clearTokens() {
  await keytar.deletePassword(SERVICE, ACCOUNT);
}
