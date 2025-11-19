import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { randomBytes, scryptSync, timingSafeEqual, createHmac } from "node:crypto";
import { prisma } from "./db";

const SESSION_COOKIE = "cars-to-go-admin";
const SESSION_MAX_AGE = 60 * 60 * 24; // 1 day
const DEFAULT_ADMIN_EMAIL = "admin@carstogo.com";
const DEFAULT_ADMIN_PASSWORD = "auction123";

export async function ensureAdminUser() {
  const existing = await prisma.adminUser.findFirst();

  if (existing) {
    return existing;
  }

  return prisma.adminUser.create({
    data: {
      email: DEFAULT_ADMIN_EMAIL,
      password: hashPassword(DEFAULT_ADMIN_PASSWORD),
    },
  });
}

export async function authenticateAdmin(email: string, password: string) {
  await ensureAdminUser();
  const user = await prisma.adminUser.findUnique({ where: { email } });

  if (!user || !verifyPassword(password, user.password)) {
    return null;
  }

  return user;
}

export async function getCurrentUser() {
  await ensureAdminUser();
  const token = cookies().get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const payload = parseSessionToken(token);

  if (!payload) {
    return null;
  }

  const user = await prisma.adminUser.findUnique({ where: { id: payload.userId } });
  return user;
}

export async function requireAdmin() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/admin/login");
  }

  return user;
}

export function startSession(userId: string) {
  const cookieStore = cookies();
  const token = createSessionToken(userId);

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    secure: process.env.NODE_ENV === "production",
  });
}

export function endSession() {
  const cookieStore = cookies();
  cookieStore.delete(SESSION_COOKIE);
}

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const derived = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${derived}`;
}

function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");

  if (!salt || !hash) {
    return false;
  }

  const derived = scryptSync(password, salt, 64).toString("hex");
  return timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(derived, "hex"));
}

function createSessionToken(userId: string): string {
  const expiresAt = Date.now() + SESSION_MAX_AGE * 1000;
  const payload = `${userId}:${expiresAt}`;
  const signature = sign(payload);
  return `${payload}:${signature}`;
}

function parseSessionToken(token: string): { userId: string; expiresAt: number } | null {
  const [userId, expiresAtRaw, signature] = token.split(":");

  if (!userId || !expiresAtRaw || !signature) {
    return null;
  }

  const payload = `${userId}:${expiresAtRaw}`;
  const expected = sign(payload);

  if (expected !== signature) {
    return null;
  }

  const expiresAt = Number(expiresAtRaw);

  if (Number.isNaN(expiresAt) || expiresAt < Date.now()) {
    return null;
  }

  return { userId, expiresAt };
}

function sign(payload: string): string {
  const secret = process.env.NEXTAUTH_SECRET ?? "cars-to-go-secret";
  return createHmac("sha256", secret).update(payload).digest("hex");
}
