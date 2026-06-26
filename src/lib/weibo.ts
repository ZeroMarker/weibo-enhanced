const WEIBO_AUTH_URL = 'https://api.weibo.com/oauth2/authorize'
const WEIBO_TOKEN_URL = 'https://api.weibo.com/oauth2/access_token'
const WEIBO_USER_INFO_URL = 'https://api.weibo.com/2/users/show.json'

export interface WeiboUser {
  id: number
  idstr: string
  screen_name: string
  name: string
  profile_image_url: string
  avatar_large: string
  avatar_hd: string
  followers_count: number
  friends_count: number
  statuses_count: number
  description: string
  verified: boolean
  verified_reason?: string
}

export interface WeiboToken {
  access_token: string
  expires_in: number
  remind_in: string
  uid: string
}

export function getWeiboAuthUrl(): string {
  const clientId = process.env.WEIBO_CLIENT_ID
  const redirectUri = process.env.WEIBO_REDIRECT_URI || 'http://localhost:3000/api/auth/callback'

  if (!clientId) {
    throw new Error('WEIBO_CLIENT_ID is not configured')
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    display: 'page',
  })

  return `${WEIBO_AUTH_URL}?${params.toString()}`
}

export async function getWeiboToken(code: string): Promise<WeiboToken> {
  const clientId = process.env.WEIBO_CLIENT_ID
  const clientSecret = process.env.WEIBO_CLIENT_SECRET
  const redirectUri = process.env.WEIBO_REDIRECT_URI || 'http://localhost:3000/api/auth/callback'

  if (!clientId || !clientSecret) {
    throw new Error('Weibo OAuth credentials are not configured')
  }

  const response = await fetch(WEIBO_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to get Weibo token: ${error}`)
  }

  return response.json()
}

export async function getWeiboUser(token: string, uid: string): Promise<WeiboUser> {
  const params = new URLSearchParams({
    access_token: token,
    uid,
  })

  const response = await fetch(`${WEIBO_USER_INFO_URL}?${params.toString()}`)

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to get Weibo user: ${error}`)
  }

  return response.json()
}

export function generateState(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}
