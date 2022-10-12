import { ApplicationCommandOptionType } from 'discord-api-types/v10'
import { InteractionType } from 'discord-interactions'
import { Context } from 'hono'

interface Bindings {
  DISCORD_TOKEN: string
  DISCORD_PUBLIC_KEY: string
  DISCORD_APPLICATION_ID: string
  DISCORD_TEST_GUILD_ID: string
  ENVIRONMENT: string
}

interface HonoEnv {
  Bindings: Bindings
}

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
    ctx: Context<string, HonoEnv>,
    interaction: Interaction,
  ) => Response | Promise<Response>
}
