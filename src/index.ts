import { verifyKey } from 'discord-interactions'
import app from './server'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Env {
  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  // MY_KV_NAMESPACE: KVNamespace
  //
  // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // MY_DURABLE_OBJECT: DurableObjectNamespace
  //
  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  // MY_BUCKET: R2Bucket
  DISCORD_TOKEN: string
  DISCORD_PUBLIC_KEY: string
  DISCORD_APPLICATION_ID: string
  DISCORD_TEST_GUILD_ID: string
  ENVIRONMENT: string
}

export default {
  async fetch(
    request: Request,
    env: Env,
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
