import { InteractionResponseType } from 'discord-interactions'
import { Context, Env } from 'hono'
import { onInviteCommand } from './inviteCommand'

interface Command {
  name: string
  description: string
}

interface EnhancedCommand extends Command {
  handler: (ctx: Context<string, Env>) => Response
}

export const STICKER_COMMAND: Command = {
  name: 'sticker',
  description: 'Sends a sticker to the channel',
}

export const INVITE_COMMAND: Command = {
  name: 'invite',
  description: 'Get an invite link to add the bot to your server',
}

const commands: EnhancedCommand[] = [
  { handler: onInviteCommand, ...INVITE_COMMAND },
  {
    handler: (ctx) => {
      return ctx.json({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: 'https://wah.rest/sticker/burner/wah',
        },
      })
    },
    ...STICKER_COMMAND,
  },
]

export default commands
