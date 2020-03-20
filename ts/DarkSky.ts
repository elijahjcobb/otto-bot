/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {PdMethod, PdRequest, PdResponse} from "@element-ts/palladium";
import {DarkSkyTypes} from "./darksky-types";
import * as Path from "path";
import * as FS from "fs";

export abstract class DarkSky {

	private static privateKey: string | undefined;

	private static getPrivateKey(): string {

		if (this.privateKey) return this.privateKey;

		const privateKeyPath: string = Path.resolve("./dark-sky-secret.txt");
		const privateKey: Buffer = FS.readFileSync(privateKeyPath);
		this.privateKey = privateKey.toString("utf8");

		return this.privateKey;

	}

	public static async getCurrent(): Promise<DarkSkyTypes> {

		const req: PdRequest = new PdRequest();
		req.setMethod(PdMethod.Get);
		req.setUrl("https://api.darksky.net/forecast/" + this.getPrivateKey() + "/47.121231,-88.564461?exclude=[minutely,hourly,daily,alerts,flags]");
		const res: PdResponse = await req.request();
		const json: object | undefined = res.getJSON();
		if (!json) throw new Error("Object that came back was not json.");

		return json as DarkSkyTypes;

	}

}