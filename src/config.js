import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT || 3000,
  // Stalwart
  stalwartUrl: process.env.STALWART_URL,
};
