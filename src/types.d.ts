import { InteractionType } from 'discord-interactions'

interface Interaction {
  type: InteractionType
  data?: InteractionData
}

interface InteractionData {
  name: string
}
