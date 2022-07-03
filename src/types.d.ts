import { ApplicationCommandOptionType } from 'discord-api-types/v10'
import { InteractionType } from 'discord-interactions'

interface Interaction {
  type: InteractionType
  data?: InteractionData
}

interface InteractionData {
  name: string
  options?: InteractionOption[]
}

interface InteractionOption {
  name: string
  type: ApplicationCommandOptionType
  value: string
}

interface Command {
  name: string
  description: string
  options?: CommandOptions[]
}

interface CommandOptions {
  type: ApplicationCommandOptionType
  name: string
  description: string
  required?: boolean
}

interface EnhancedCommand extends Command {
  handler: (
    ctx: Context<string, Env>,
    interaction: Interaction,
  ) => Response | Promise<Response>
}
