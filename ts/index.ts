/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {KBBot, KBMessage, KBResponse} from "@elijahjcobb/keybase-bot-builder";
import * as FS from "fs";
import * as Path from "path";

(async (): Promise<void> => {

	const paperKeyPath: string = Path.resolve("./paperkey.txt");
	const paperKeyData: Buffer = FS.readFileSync(paperKeyPath);
	const paperKey: string = paperKeyData.toString("utf8");

	const bot: KBBot = await KBBot.init("otto_bot", paperKey);

	bot.command({
		name: "add",
		handler: async (message: KBMessage, res: KBResponse): Promise<void> => {

			let t: number = 0;
			const nums: (string | number)[] = message.getParameters();
			for (const n of nums) if (typeof n === "number") t += n;

			await res.send(t);

		}
	});

	bot.command({
		name: "mult",
		handler: async (message: KBMessage, res: KBResponse): Promise<void> => {

			let t: number = 1;
			const nums: (string | number)[] = message.getParameters();
			for (const n of nums) if (typeof n === "number") t *= n;

			await res.send(t);

		}
	});

	bot.command({
		name: "pow",
		parameters: {
			a: "number",
			b: "number"
		},
		handler: async (message: KBMessage, res: KBResponse): Promise<void> => {
			const body: {a: number, b: number} = message.getModifiers();
			await res.send(Math.pow(body.a, body.b));
		}
	});

	bot.command({
		name: "code",
		handler: async (message: KBMessage, res: KBResponse): Promise<void> => {
			await res.sendCodeBlock("let x: string = \"\";\nfor (let i: number = 0; i < 100; i++) x += \"HELLO \";\nconsole.log(x);");
		}
	});

	bot.start();

})().then((): void => {}).catch((err: any): void => console.error(err));