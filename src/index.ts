import { verifyKey } from 'discord-interactions'
import app from './server'
import { Bindings } from './types'

export default {
  async fetch(
    request: Request,
    env: Bindings,
    ctx: ExecutionContext,
  ): Promise<Response> {
    if (request.method === 'POST') {
      const signature = request.headers.get('x-signature-ed25519')
      const timestamp = request.headers.get('x-signature-timestamp')

      console.log(signature, timestamp, env.DISCORD_PUBLIC_KEY)

      const body = await request.clone().arrayBuffer()

      const isValidRequest = verifyKey(
        body,
        signature || '',
        timestamp || '',
        env.DISCORD_PUBLIC_KEY,
      )

      if (!isValidRequest) {
        console.error('Invalid Request')
        return new Response('Bad request signature.', { status: 401 })
      }
    }

    return app.fetch(request, env, ctx)
  },
}
