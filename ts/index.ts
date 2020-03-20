/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {KBBot, KBMessage, KBResponse} from "@elijahjcobb/keybase-bot-builder";
import * as FS from "fs";
import * as Path from "path";
import {
	DarkSky,
	DarkSkyReportCurrently,
	DarkSkyReportDaily,
	DarkSkyReportHourly,
	DarkSkyReportMinutely
} from "@elijahjcobb/dark-sky";

(async (): Promise<void> => {

	const paperKeyPath: string = Path.resolve("./paperkey.txt"); // using paper key: "fluid hurdle ..."
	const paperKeyData: Buffer = FS.readFileSync(paperKeyPath);
	const paperKey: string = paperKeyData.toString("utf8");
	const bot: KBBot = await KBBot.init("otto_bot", paperKey, {logging: true, debugging: true});

	const darkSkyKeyPath: string = Path.resolve("./dark-sky-secret.txt");
	const darkSkyKeyData: Buffer = FS.readFileSync(darkSkyKeyPath);
	const darkSkyKey: string = darkSkyKeyData.toString("utf8");
	const darkSky: DarkSky = new DarkSky(darkSkyKey, 47.121231, -88.564461);

	bot.command({
		name: "current",
		description: "Get the current weather.",
		handler: async(msg: KBMessage, res: KBResponse): Promise<void> => {

			const report: DarkSkyReportCurrently = await darkSky.getCurrently();
			await res.sendObject(report);
		}
	});

	bot.command({
		name: "minutely",
		description: "Get the minutely weather forecast.",
		handler: async(msg: KBMessage, res: KBResponse): Promise<void> => {

			const report: DarkSkyReportMinutely = await darkSky.getMinutely();
			await res.sendObject(report);
		}
	});

	bot.command({
		name: "hourly",
		description: "Get the hourly weather forecast.",
		handler: async(msg: KBMessage, res: KBResponse): Promise<void> => {

			const report: DarkSkyReportHourly = await darkSky.getHourly();
			await res.sendObject(report);
		}
	});

	bot.command({
		name: "daily",
		description: "Get the daily weather forecast.",
		handler: async(msg: KBMessage, res: KBResponse): Promise<void> => {

			const report: DarkSkyReportDaily = await darkSky.getDaily();
			await res.sendObject(report);
		}
	});

	bot.start();

})().then((): void => {}).catch((err: any): void => console.error(err));