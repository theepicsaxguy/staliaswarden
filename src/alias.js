import { v4 as uuidv4 } from 'uuid';

export function generateAlias(domain) {
  if (!domain) {
    throw new Error('Domain is required');
  }
  const username = uuidv4().split('-')[0]; // short random ID
  return `${username}@${domain}`;
}
