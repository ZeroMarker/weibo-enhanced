import { NextRequest, NextResponse } from 'next/server'
import { getWeiboToken, getWeiboUser } from '@/lib/weibo'
import { setSession } from '@/lib/session'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error) {
    console.error('OAuth error:', error)
    return NextResponse.redirect(new URL('/login?error=denied', 'http://localhost:3000'))
  }

  if (!code) {
    return NextResponse.redirect(new URL('/login?error=no_code', 'http://localhost:3000'))
  }

  try {
    const cookieStore = await cookies()
    const stateCookie = cookieStore.get('weibo_oauth_state')

    if (stateCookie) {
      cookieStore.delete('weibo_oauth_state')
    }

    const tokenData = await getWeiboToken(code)

    const userData = await getWeiboUser(tokenData.access_token, tokenData.uid)

    await setSession({
      user: userData,
      token: tokenData.access_token,
      expiresAt: Date.now() + tokenData.expires_in * 1000,
    })

    return NextResponse.redirect(new URL('/', 'http://localhost:3000'))
  } catch (error) {
    console.error('Callback error:', error)
    return NextResponse.redirect(new URL('/login?error=token', 'http://localhost:3000'))
  }
}
