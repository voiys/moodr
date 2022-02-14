import { db } from 'db';
import { NextApiHandler } from 'next';
import { UserNotFoundError } from 'utils/auth';
import { SuccessResponse, Response } from 'types/auth';

const loginHandler: NextApiHandler<Response> = async (req, res) => {
	try {
		const incomingEmail = req.body?.email;

		const user = await db.user.findUnique({
			where: {
				email: incomingEmail,
			},
		});

		if (!user) throw new UserNotFoundError(incomingEmail);

		const { name, email, id, bio } = user;

		const userData: SuccessResponse = {
			name,
			email,
			id,
			bio,
		};

		return res.json(userData);
	} catch (error) {
		if (error instanceof UserNotFoundError) {
			const { message, name } = error;

			return res.status(404).json({ message, name });
		} else {
			console.error(error);
		}
	}
};

export default loginHandler;
