import axios, { AxiosError } from 'axios';
import { ErrorResponse } from 'types/auth';

export class UserNotFoundError extends Error {
	constructor(email: string) {
		super(`User not found: ${email}`);
	}

	static isResponse(error: any): error is AxiosError<ErrorResponse> {
		const isSaidError =
			axios.isAxiosError(error) && error.response.status === 404;

		return isSaidError;
	}
}
