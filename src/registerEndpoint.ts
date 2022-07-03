import { Context, Env } from 'hono'
import { INVITE_COMMAND, STICKER_COMMAND } from './commands'

export async function registerEndpoint(ctx: Context<string, Env>) {
  return ctx.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
  const { DISCORD_APPLICATION_ID, DISCORD_TOKEN } = ctx.env
  const url = `https://discord.com/api/v10/applications/${DISCORD_APPLICATION_ID}/commands`
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bot ${DISCORD_TOKEN}`,
    },
    method: 'PUT',
    body: JSON.stringify([STICKER_COMMAND, INVITE_COMMAND]),
  })
  if (response.ok) {
    return ctx.text('Registered all commands')
  } else {
    // ctx.text('Error registering commands')
    const text = await response.text()
    return ctx.text(`Error registering commands: ${text}`)
  }
}
