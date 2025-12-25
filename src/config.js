import dotenv from 'dotenv';
dotenv.config();

export default {
  aliasDomain: process.env.ALIAS_DOMAIN,
  port: process.env.PORT || 3000,
  // Stalwart
  stalwartUrl: process.env.STALWART_URL,
};
