import { createContext, FC, useContext, useState } from 'react';

import {
	ErrorResponse,
	LoginFormValues,
	SuccessResponse,
	UserData,
} from 'types/auth';
import { UserNotFoundError } from 'utils/auth';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { useToast } from '@chakra-ui/react';

type LoginFunction = (email: string, password: string) => Promise<void>;

interface AuthContext {
	user: UserData | null;
	login: LoginFunction;
	logout: VoidFunction;
	loading: boolean;
	error: ErrorResponse | Error | null;
}

const authContext = createContext<AuthContext>({} as AuthContext);

export const AuthProvider: FC = ({ children }) => {
	const [user, setUser] = useState<UserData | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<ErrorResponse | Error | null>(null);
	const toast = useToast();

	const login: LoginFunction = async (email, password) => {
		try {
			setError(null);
			setLoading(true);
			await new Promise((resolve) => {
				setTimeout(() => {
					resolve(null);
				}, 3000);
			});

			const response = await axios.post<
				LoginFormValues,
				AxiosResponse<SuccessResponse>
			>('/api/auth/login', {
				email,
				password,
			});

			setUser(response.data);
		} catch (error) {
			if (UserNotFoundError.isResponse(error)) {
				const { name, message } = error.response.data;

				toast({
					title: name,
					description: message,
					position: 'bottom-right',
				});
			}

			setError(error);
		} finally {
			setLoading(false);
		}
	};

	const logout = async () => {
		try {
			setError(null);
			setLoading(true);

			await new Promise((resolve) => {
				setTimeout(() => {
					resolve(null);
				}, 3000);
			});

			setUser(null);
		} catch (error) {
			console.error(error);
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<authContext.Provider value={{ user, login, logout, loading, error }}>
			{children}
		</authContext.Provider>
	);
};

export class NoContextError extends Error {
	constructor(args: { hookName: string; providerName: string }) {
		super(`${args.hookName} must be used within an ${args.providerName}`);

		this.name = 'NoContextError';
	}
}

export const useAuth = () => {
	const context = useContext(authContext);

	if (!context) {
		throw new NoContextError({
			hookName: 'useAuth',
			providerName: 'AuthProvider',
		});
	}

	return context;
};
