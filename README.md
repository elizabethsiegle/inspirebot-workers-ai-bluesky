# Automate Posts to BlueSky with BlueSky API, Cloudflare Workers, Cron Triggers
This is a [Cloudflare Workers](https://workers.cloudflare.com/) application that makes use of [Cron Triggers](https://developers.cloudflare.com/workers/configuration/cron-triggers/) to automate posting to [Blue Sky](https://bsky.app/). 

Every 30 minutes, the application generates an inspiring saying using [llama-3.2-3b-instruct](https://developers.cloudflare.com/workers-ai/models/llama-3.2-3b-instruct/) hosted on [Cloudflare Workers AI](https://developers.cloudflare.com/workers-ai/) and posts it to Blue Sky.

Check it out on [Blue Sky here](https://bsky.app/profile/inspirebot.bsky.social)!

## Setup
Copy [.dev.vars.example](./.dev.vars.example) to `.dev.vars` and add your `BLUESKY_USERNAME` and `BLUESKY_PASSWORD`.

```bash
npm install
npx wrangler login # if it's your first time here
```

In [wrangler.toml](./wrangler.toml), you can set the time to post in the `crons` array beneath the `triggers` configuration. Reminder--cron tabs are written in UTC. I used the [Cloudflare Workers AI LLM Playground](https://playground.ai.cloudflare.com/) to generate my cron tabs using this system message from my wonderful teammate [Craig Dennis](https://twitter.com/craigsdennis):

```bash
You help write cron tab.

The user will give you a description of time they are looking for and your job is to generate a cron tab string.

The user will specify timezones, you know the server runs in UTC.

Return the cron tab and the explanation.
```


## Develop locally
```bash
npm run dev
```

## Deploy
```bash
npm run deploy
```