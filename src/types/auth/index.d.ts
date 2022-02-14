import { User } from '@prisma/client';

export type UserData = Omit<User, 'password'>;

export type SuccessResponse = UserData;

export interface ErrorResponse {
	name: string;
	message: string;
}

export type Response = SuccessResponse | ErrorResponse;

export interface LoginFormValues {
	email: string;
	password: string;
}
