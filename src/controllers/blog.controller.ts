import { Request, Response } from 'express'

import { dataError, dataSuccess } from '../helpers/json.helper';

export class BlogController {
	constructor() {}

	static async index(req: Request, res: Response): Promise<any> {
		try {
		} catch (error) {
			return res.send(
				dataError(error.message || 'Bad request', null, 400)
			)
		}
	}
}
