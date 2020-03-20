/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {KBBot, KBMessage, KBResponse} from "@elijahjcobb/keybase-bot-builder";
import * as FS from "fs";
import * as Path from "path";
import {DarkSky} from "./DarkSky";
import {DarkSkyCurrentlyType, DarkSkyTypes} from "./darksky-types";

(async (): Promise<void> => {

	const paperKeyPath: string = Path.resolve("./paperkey.txt"); // using paper key: "fluid hurdle ..."
	const paperKeyData: Buffer = FS.readFileSync(paperKeyPath);
	const paperKey: string = paperKeyData.toString("utf8");
	const bot: KBBot = await KBBot.init("otto_bot", paperKey, {logging: true, debugging: true});

	bot.command({
		name: "pic",
		description: "Receive a picture.",
		usage: "!pic",
		handler: async (message: KBMessage, res: KBResponse): Promise<void> => {
			await res.sendFile("/home/elijah/Pictures/profile-small.jpeg");
		}
	});

	bot.command({
		name: "add",
		description: "Add all numbers provided together.",
		usage: "!add 1 12 123 1234",
		parameters: {},
		handler: async (message: KBMessage, res: KBResponse): Promise<void> => {

			const nums: (string | number)[] = message.getParameters();
			let t: number = 0;
			for (const num of nums) if (typeof num === "number") t += num;
			await res.send(t);

		}
	});

	bot.command({
		name: "multiply",
		description: "Multiply all numbers provided together.",
		usage: "!multiply 4 5 6",
		handler: async (message: KBMessage, res: KBResponse): Promise<void> => {

			const nums: (string | number)[] = message.getParameters();
			let t: number = 1;
			for (const num of nums) if (typeof num === "number") t *= num;
			await res.send(t);

		}
	});

	bot.command({
		name: "pow",
		description: "Compute the power (-p) of a base (-b).",
		usage: "!pow -b 2 -p 3",
		parameters: {
			"b": "number",
			"p": "number"
		},
		handler: async (message: KBMessage, res: KBResponse): Promise<void> => {

			const nums: {b?: number, p?: number} = message.getModifiers();
			await res.send(Math.pow(nums.b ?? 0, nums.p ?? 0));

		}
	});

	bot.command({
		name: "weather",
		description: "Get the current weather information.",
		usage: "!weather",
		handler: async(msg: KBMessage, res: KBResponse): Promise<void> => {

			const report: DarkSkyTypes = await DarkSky.getCurrent();

			await res.send(`The weather in Houghton, MI is ${report.currently.summary}. It is ${report.currently.temperature.toFixed(0)}℉ but feels like ${report.currently.apparentTemperature.toFixed(0)}℉.`);

		}
	});

	bot.start();

})().then((): void => {}).catch((err: any): void => console.error(err));