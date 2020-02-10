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

	const paperKeyPath: string = Path.resolve("./paperkey.txt"); // using paper key: "fluid hurdle ..."
	const paperKeyData: Buffer = FS.readFileSync(paperKeyPath);
	const paperKey: string = paperKeyData.toString("utf8");
	const bot: KBBot = await KBBot.init("otto_bot", paperKey);



	bot.command({
		name: "x",
		handler: async (message: KBMessage, res: KBResponse): Promise<void> => {

		}
	});

	bot.start();

})().then((): void => {}).catch((err: any): void => console.error(err));