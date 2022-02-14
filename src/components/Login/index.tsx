import { Box, Button, Input, useToast } from '@chakra-ui/react';
import { useAuth } from 'context/auth';
import { FormEventHandler } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginFormValues } from 'types/auth';

export const Login = () => {
	const { user, login, logout, loading } = useAuth();

	const { register, ...loginForm } = useForm<LoginFormValues>({
		defaultValues: {
			email: '',
			password: '',
		},
	});

	// const handleClick: SubmitHandler<LoginFormValues> = async (
	// 	{ email, password },
	// 	e
	// ) => {
	// 	e.preventDefault();

	// 	if (!user) {
	// 		await login(email, password);

	// 		loginForm.reset();
	// 	} else {
	// 		logout();
	// 	}
	// };

	const handleSubmit = loginForm.handleSubmit<LoginFormValues>(
		async ({ email, password }, e) => {
			e.preventDefault();

			if (!user) {
				await login(email, password);

				loginForm.reset();
			} else {
				logout();
			}
		}
	);

	return (
		<Box as='form' onSubmit={handleSubmit}>
			{user ? (
				<Button type='submit'>Logout</Button>
			) : (
				<>
					<Input
						{...register('email')}
						placeholder='email'
						disabled={loading}
					/>
					<Input
						{...register('password')}
						type='password'
						placeholder='password'
						disabled={loading}
					/>
					<Button type='submit' isLoading={loading}>
						Login
					</Button>
				</>
			)}
		</Box>
	);
};
