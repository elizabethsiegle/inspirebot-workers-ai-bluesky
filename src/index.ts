import { BskyAgent } from '@atproto/api';

interface Env {
    BLUESKY_USERNAME: string;
    BLUESKY_PASSWORD: string;
    AI: any; // or more specifically: AI: AIRunner;
}

async function post(env: Env) {
	// Generate AI response based on input text
    const messages = [
        { role: "system", content: "You are an inspiring and motivational assistant who generates inspiring sayings. Keep responses under 300 characters and maintain a cheerful, encouraging tone." },
        {
            role: "user",
            content: "Generate an inspiring saying that motivates someone to take action and pursue their dreams. Infuse a cheerful, encouraging tone."
        }
    ];
	const aiResponse = await env.AI.run("@cf/meta/llama-3.2-3b-instruct", { messages });
    const postText = aiResponse.response; // The AI-generated text
    
    // Post to Bluesky
    const agent = new BskyAgent({
        service: new URL('https://bsky.social')
    });
    await agent.login({
        identifier: env.BLUESKY_USERNAME,
        password: env.BLUESKY_PASSWORD
    });
	const record = await agent.post({
		text: postText
	});
	console.log(JSON.stringify(record));
	return JSON.stringify(record);
}

export default {
	async scheduled(event, env, ctx) {
		console.log("cron processed");
		ctx.waitUntil(post(env));
	}
} satisfies ExportedHandler<Env>;