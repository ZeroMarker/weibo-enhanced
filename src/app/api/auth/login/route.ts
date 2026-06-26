import { NextResponse } from 'next/server'
import { getWeiboAuthUrl, generateState } from '@/lib/weibo'
import { cookies } from 'next/headers'

export async function GET() {
  try {
    const authUrl = getWeiboAuthUrl()
    const state = generateState()

    const cookieStore = await cookies()
    cookieStore.set('weibo_oauth_state', state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 600,
      path: '/',
    })

    return NextResponse.redirect(authUrl)
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.redirect(new URL('/login?error=config', 'http://localhost:3000'))
  }
}
