import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'myFileManagerBucket',
  isDefault: true,
  access: (allow) => ({
    'folder-a/*': [
      allow.authenticated.to(['read', 'write', 'delete'])
    ],
    'folder-b/*': [
      allow.authenticated.to(['read', 'write', 'delete'])
    ],
  }),
});
