import { NextResponse } from 'next/server'
import { removeSession } from '@/lib/session'

export async function GET() {
  await removeSession()
  return NextResponse.redirect(new URL('/login', 'http://localhost:3000'))
}
