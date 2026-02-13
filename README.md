# Staliaswarden

A privacy-focused email alias bridge between Bitwarden and Stalwart mail server.

Originally created by [romdim](https://github.com/romdim/staliaswarden). This is a heavily rewritten version developed for [goingdark.social](https://goingdark.social), a privacy-focused Mastodon instance in the Fediverse.

## Why We Rewrote It

The original staliaswarden was designed for single-user setups with shared credentials. For a privacy-respecting community like [goingdark.social](https://goingdark.social), this didn't meet our needs:

- **Per-User Authentication**: Each user authenticates with their own Stalwart API token. No shared credentials between users.
- **Dynamic Principal Resolution**: Automatically determines which principal owns the API key by querying Stalwart's API.
- **Security Improvements**: Comprehensive request/response logging with secret redaction to prevent credential exposure.
- **Production-Ready**: Added Kubernetes manifests, better error handling, and multiple route compatibility for Bitwarden integration.
- **Smarter Alias Generation**: Extracts domain information from Bitwarden's description field for more meaningful alias names.

This aligns with our core privacy values: users control their own aliases, and no shared secrets are required.

## Problem and Solution

This application lets you create email aliases automatically through Bitwarden, which notify your Stalwart email server to create the alias. This helps combat spam on your main email by using unique aliases for each service.

Every time you create a new login, just generate a new username through Bitwarden and it will create an alias in your Stalwart instance that you can immediately use.

## Setup

Clone this repo in your server. Create a `.env` like `.env.example`.

- `STALWART_URL` is the domain (or IP) you host your Stalwart instance (must include `/api` path).
- `PORT` is the app's port.

Note: The email domain is forwarded by Bitwarden in the request body, so no `ALIAS_DOMAIN` environment variable is needed.

Run `docker compose up -d`.

## Usage

Generate an alias through the Bitwarden browser extension.

1. Go to Generator -> Username -> Forwarded email alias.
2. Select Addy.io in the Service field.
3. Fill in your email domain.
4. Enter your Stalwart API token (this will be forwarded to Stalwart for authentication).
5. Fill in this app's URL.

The service will forward your Stalwart API token directly to Stalwart to create aliases. No separate authentication is needed - each user provides their own Stalwart API token.

Now every time you create a new login you can ask a new username and it will create one in your Stalwart instance which you can immediately use through Bitwarden.

## Credits

- Original author: [romdim](https://github.com/romdim/staliaswarden) - Thank you for creating this useful tool!
- Rewrite developed for [goingdark.social](https://goingdark.social) - A privacy-focused Mastodon instance in the Fediverse.
