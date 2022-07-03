import {
  InteractionResponseFlags,
  InteractionResponseType,
} from 'discord-interactions'
import { Context, Env } from 'hono'
import { Interaction } from './types'

function normalize(str: string): string {
  return str.toLowerCase().trim().replaceAll(/\s+/g, '-')
}

export function onStickerCommand(
  ctx: Context<string, Env>,
  interaction: Interaction,
): Response {
  const options = interaction.data?.options
  console.log(`Options: ${JSON.stringify(options)}`)
  if (options) {
    const raw_character = options.find((o) => o.name === 'character')?.value
    const raw_sticker = options.find((o) => o.name === 'sticker')?.value
    if (raw_character && raw_sticker) {
      const character = normalize(raw_character)
      const sticker = normalize(raw_sticker)
      return ctx.json({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `https://wah.rest/sticker/${character}/${sticker}`,
        },
      })
    }
  }
  return ctx.json({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `Something went wrong`,
      flags: InteractionResponseFlags.EPHEMERAL,
    },
  })
}
