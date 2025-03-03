import { createFiat, getFiat, getFiats } from 'base-ca';
import { Request, Response } from 'express';

import fiatsJson from '../../../fiats.json';

export const index = async (
	_req: Request,
	res: Response,
): Promise<Response> => {
	try {
		const fiats = await getFiats();

		return res.status(200).send({
			status_code: 200,
			results: fiats,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).send({
			status_code: 500,
			errors: [err.message],
		});
	}
};

export const createFiatController = async (
	req: Request,
	res: Response,
): Promise<Response> => {
	try {
		const { name, symbol } = req.body;

		const newFiat = await createFiat({
			name,
			symbol,
		});

		return res.status(200).send({
			status_code: 200,
			results: newFiat,
		});
	} catch (err) {
		return res.status(500).send({
			status_code: 500,
			errors: [err.message],
		});
	}
};

export const getFiatController = async (
	req: Request,
	res: Response,
): Promise<Response> => {
	try {
		const { name, symbol } = req.params;

		const fiat = await getFiat({
			name,
			symbol,
		});

		return res.status(200).send({
			status_code: 200,
			results: fiat,
		});
	} catch (err) {
		return res.status(500).send({
			status_code: 500,
			errors: [err.message],
		});
	}
};

export const createFiatsJSON = async (
	_req: Request,
	res: Response,
): Promise<Response> => {
	try {
		fiatsJson.forEach(async (fiat) => {
			await createFiat({
				name: fiat.name,
				symbol: fiat.symbol,
			});
		});

		return res.status(200).send({
			status_code: 200,
		});
	} catch (err) {
		return res.status(500).send({
			status_code: 500,
			errors: [err.message],
		});
	}
};
