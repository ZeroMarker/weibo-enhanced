import { cookies } from 'next/headers'
import type { WeiboUser } from './weibo'

const SESSION_COOKIE = 'weibo_session'
const SESSION_MAX_AGE = 7 * 24 * 60 * 60 * 1000 // 7 days

export interface Session {
  user: WeiboUser
  token: string
  expiresAt: number
}

export async function setSession(session: Session): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE / 1000,
    path: '/',
  })
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(SESSION_COOKIE)

  if (!sessionCookie?.value) {
    return null
  }

  try {
    const session: Session = JSON.parse(sessionCookie.value)

    if (session.expiresAt < Date.now()) {
      await removeSession()
      return null
    }

    return session
  } catch {
    return null
  }
}

export async function removeSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}
