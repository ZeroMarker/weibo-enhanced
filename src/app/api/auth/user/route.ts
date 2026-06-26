import { NextResponse } from 'next/server'
import { getSession, removeSession } from '@/lib/session'

export async function GET() {
  const session = await getSession()

  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 })
  }

  return NextResponse.json({ user: session.user })
}

export async function DELETE() {
  await removeSession()
  return NextResponse.json({ success: true })
}
