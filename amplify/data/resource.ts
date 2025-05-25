// Import the Amplify Gen 2 data helpers
import {ClientSchema, a, defineData } from '@aws-amplify/backend';

// Define your schema
const schema = a.schema({
  // Define a conversation data model named 'chat'
  chat: a.conversation({
    // Use a built-in AI model; "Claude 3 Haiku" is valid
    aiModel: a.ai.model('Claude 3 Haiku'), // model names are lowercase and hyphenated
    // Define the system prompt for the assistant
    systemPrompt: 'You are a helpful assistant',
  })
  // Define who can access the conversation — in this case, only the resource owner
  .authorization((allow) => allow.owner())
});

// Export the schema to Amplify

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'iam',
  },
});