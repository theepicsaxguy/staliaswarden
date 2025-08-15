# staliaswarden

## Setup

Clone this repo in your server.
Create a `.env` like `.env.example`.

- Create an `API_TOKEN` to be used here and in your bitwarden extension.
- The `ALIAS_DOMAIN` should be your email domain (optional).
- `FORWARD_TO` should keep the main email all aliases will forward to.
- `STALWART_URL` is the domain (or IP) you host your stalwart instance.
- `STALWART_USERNAME` & `STALWART_PASSWORD` are self-explanatory. (I tried with tokens but none worked)
- `PORT` is the app's port.

Run `docker compose up -d`.

## Usage

Generate an alias through the bitwarden browser extension.

1. Go to Generator -> Username -> Forwarded email alias.
2. Select Addy.io in the Service field.
3. Fill in your email domain.
4. The API key you saved in the .env of this application.
5. Fill in this app's url.

Now every time you create a new login you can ask a new username and it will create one in your stalwart instance which you can immediately use through bitwarden.
Cheers!
