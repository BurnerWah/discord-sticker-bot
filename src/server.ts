import { sentry } from '@honojs/sentry'
import { InteractionResponseType, InteractionType } from 'discord-interactions'
import { Context, Hono } from 'hono'
import { logger } from 'hono/logger'
import commands from './commands'
import { registerEndpoint } from './registerEndpoint'
import { HonoEnv, Interaction } from './types'

const app = new Hono<HonoEnv>()

app.use('*', logger(), sentry())

// Note - In Production builds, this endpoint will just redirect to a rickroll
app.get('/register', registerEndpoint)

app.get('*', (ctx) => {
  return ctx.text(`Hello World!`)
})

app.post('/', async (ctx: Context<string, HonoEnv>) => {
  const interaction: Interaction = await ctx.req.json()
  const { type, data } = interaction

  const err = (message: string) => {
    console.error(message)
    return ctx.json({ error: message }, 400)
  }

  switch (type) {
    case InteractionType.PING:
      return ctx.json({ type: InteractionResponseType.PONG })

    case InteractionType.APPLICATION_COMMAND:
      if (data) {
        const name = data.name.toLowerCase()
        console.log(`Received command ${name}`)
        console.log(`Command data: ${JSON.stringify(data)}`)
        const handler = commands.find((cmd) => cmd.name === name)?.handler
        return handler ? handler(ctx, interaction) : err('Unknown command')
      }
  }

  return err('Unknown Type')
})

export default app
