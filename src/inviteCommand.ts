import {
  InteractionResponseFlags,
  InteractionResponseType,
} from 'discord-interactions'
import { Context, Env } from 'hono'

export function onInviteCommand(ctx: Context<string, Env>) {
  const { DISCORD_APPLICATION_ID } = ctx.env
  const INVITE_URL = inviteUrl({
    client_id: DISCORD_APPLICATION_ID,
    permissions: '2147485696',
    scopes: ['bot', 'applications.commands'],
  })
  return ctx.json({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: INVITE_URL,
      flags: InteractionResponseFlags.EPHEMERAL,
    },
  })
}
function inviteUrl({
  client_id,
  permissions,
  scopes,
}: {
  client_id: string
  permissions: string
  scopes: string[]
}) {
  return `https://discord.com/api/oauth2/authorize?client_id=${client_id}&permissions=${permissions}&scope=${scopes.join(
    '%20',
  )}`
}
