import { ApplicationCommandOptionType } from 'discord-api-types/v10'
import { onInviteCommand } from './inviteCommand'
import { onStickerCommand } from './stickerCommand'
import { Command, EnhancedCommand } from './types'

export const STICKER_COMMAND: Command = {
  name: 'sticker',
  description: 'Sends a sticker to the channel',
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: 'character',
      description: "Who's sticker to send",
      required: true,
    },
    {
      type: ApplicationCommandOptionType.String,
      name: 'sticker',
      description: 'The sticker to send',
      required: true,
    },
  ],
}

export const INVITE_COMMAND: Command = {
  name: 'invite',
  description: 'Get an invite link to add the bot to your server',
}

const commands: EnhancedCommand[] = [
  { handler: onInviteCommand, ...INVITE_COMMAND },
  { handler: onStickerCommand, ...STICKER_COMMAND },
]

export default commands
