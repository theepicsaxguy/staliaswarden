import axios from 'axios';
import config from './config.js';

async function getPrincipalFromToken(stalwartToken) {
  // Stalwart API keys should be used as Bearer tokens
  // The token format is api_<key> and should be sent as: Authorization: Bearer api_<key>
  const authHeader = stalwartToken.startsWith('Bearer ') 
    ? stalwartToken 
    : `Bearer ${stalwartToken}`;

  const api = axios.create({
    baseURL: config.stalwartUrl,
    headers: {
      "Content-Type": "application/json",
      "Authorization": authHeader
    }
  });

  // Query Stalwart to get the principal associated with this API key
  // We'll list principals and find the one that matches this token
  // The API key is tied to a specific principal, so we need to find it
  try {
    // Get principals - the API key will only return principals it has access to
    const response = await api.get('/principal?limit=100');
    if (response.data?.data?.items && response.data.data.items.length > 0) {
      // The API key should return the principal it belongs to
      // Typically the first result or the one matching the token
      const principal = response.data.data.items[0];
      
      // Extract email from principal
      if (principal.emails) {
        if (typeof principal.emails === 'string') {
          // If emails is a comma-separated string, get the first one
          return principal.emails.split(',')[0].trim();
        } else if (Array.isArray(principal.emails) && principal.emails.length > 0) {
          // If emails is an array, get the first one
          return principal.emails[0];
        }
      }
      
      // If no emails field, try using the name field (which might be the email)
      if (principal.name && principal.name.includes('@')) {
        return principal.name;
      }
    }
  } catch (err) {
    console.error('Error fetching principal from Stalwart:', err.response?.data || err.message);
    throw new Error('Unable to determine principal from API key');
  }

  throw new Error('Unable to determine principal from API key');
}

export async function addAliasToStalwart(alias, stalwartToken) {
  if (!stalwartToken) {
    throw new Error('Stalwart API token is required');
  }

  // Get the principal from the API key
  const principal = await getPrincipalFromToken(stalwartToken);

  // Stalwart API keys should be used as Bearer tokens
  const authHeader = stalwartToken.startsWith('Bearer ') 
    ? stalwartToken 
    : `Bearer ${stalwartToken}`;

  const api = axios.create({
    baseURL: config.stalwartUrl,
    headers: {
      "Content-Type": "application/json",
      "Authorization": authHeader
    }
  });

  try {
    const res = await api.patch(
      `/principal/${principal}`,
      [{
        "action": "addItem",
        "field": "emails",
        "value": alias
      }]
    );
    console.log(`Alias ${alias} added to Stalwart for principal ${principal}`);
    return res;
  } catch (err) {
    console.error(`Failed to add alias to Stalwart:`, err.response?.data || err.message);
    throw err;
  }
}
