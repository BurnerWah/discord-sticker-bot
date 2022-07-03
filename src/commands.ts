import { ApplicationCommandOptionType } from 'discord-api-types/v10'
import { InteractionResponseType } from 'discord-interactions'
import { onInviteCommand } from './inviteCommand'
import { Command, EnhancedCommand, Interaction } from './types'

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
  {
    handler: async (ctx, interaction: Interaction) => {
      const options = interaction.data?.options
      console.log(`Options: ${JSON.stringify(options)}`)
      if (options) {
        const character = options.find((o) => o.name === 'character')?.value
        const sticker = options.find((o) => o.name === 'sticker')?.value
        if (character && sticker) {
          return ctx.json({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `https://wah.rest/sticker/${character}/${sticker}`,
            },
          })
        }
      }
    },
    ...STICKER_COMMAND,
  },
]

export default commands
