/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import * as FS from "fs";
import * as Path from "path";
import {KBBot, KBMessage, KBResponse} from "@elijahjcobb/keybase-bot-builder";
import {DarkSky, DarkSkyReportCurrently} from "@elijahjcobb/dark-sky";


function getWindDirectionString(bearing: number): string {
	if (bearing > 350 && bearing < 10) return "N";
	else if (bearing > 10 && bearing < 80) return "NE";
	else if (bearing > 80 && bearing < 100) return "E";
	else if (bearing > 100 && bearing < 170) return "SE";
	else if (bearing > 170 && bearing < 190) return "S";
	else if (bearing > 190 && bearing < 260) return "SW";
	else if (bearing > 260 && bearing < 280) return "W";
	else if (bearing > 280 && bearing < 350) return "NW";
	else return "sky";
}

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
		name: "weather",
		description: "Get the current weather.",
		handler: async(msg: KBMessage, res: KBResponse): Promise<void> => {

			const report: DarkSkyReportCurrently = await darkSky.getCurrently();

			await res.send(`It is currently ${report.currently.summary.toLowerCase()} and feels like ${report.currently.apparentTemperature.toFixed(0)}°F. The real temperature is ${report.currently.temperature.toFixed(0)}°F. There is wind coming from the ${getWindDirectionString(report.currently.windBearing)} at ${report.currently.windSpeed.toFixed(0)} mph. The cloud coverage is ${(report.currently.cloudCover * 100).toFixed(0)}% with a UV index of ${report.currently.uvIndex}.`);
		}
	});

	bot.start();

})().then((): void => {}).catch((err: any): void => console.error(err));