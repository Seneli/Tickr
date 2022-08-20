import { createClient } from '@supabase/supabase-js';
import { AnyMxRecord } from 'dns';
import { Request, Response } from 'express';
import { randomUUID } from 'crypto';

// Create a single supabase client for interacting with your database
const supabase = createClient(
	'https://lxfafscgmmiyoglzuqyc.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4ZmFmc2NnbW1peW9nbHp1cXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjEwMTU5OTQsImV4cCI6MTk3NjU5MTk5NH0.bBeYEtGj73EgYnieWDQ60Ciso7Cwk_8_CQVhke7x4ao'
);

const getTickers = async (req: Request, res: Response) => {
	try {
		const { data, error } = await supabase.rpc('get_tickers');
		if (error) throw error;
		console.log(data);
		res.json({ data }).send();
	} catch (err) {
		console.error(err);
	}
};

const signUp = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		console.log(email);

		const { user, session, error } = await supabase.auth.signUp({
			email: email,
			password: password
		});
		if (error) throw error;

		if (error) {
			res.status(error.status).send(error.message);
		}

		res.json({ user, session, error }).send();
	} catch (err) {
		console.error(err);
		res.status(400).send();
	}
};

const signIn = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.query;
		console.log(email, password);

		const { user, session, error } = await supabase.auth.signIn({
			email: email,
			password: password
		});

		if (error) {
			res.status(error.status).send(error.message);
		}

		console.log(user, session, error);
		res.json({ session }).send();
	} catch (err) {
		console.error(err);
		res.status(400).send();
	}
};

export { signIn, signUp, getTickers };
