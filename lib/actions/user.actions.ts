"use server";

export async function signIn({ email, password }: signInProps) {
	try {
		/* TODO: login user */
		console.log(email, password);
	} catch (error) {
		console.error("Error:", error);
	}
}

export async function signUp(userData: SignUpParams) {
	try {
		/* TODO: create user account */
		console.log(userData);
	} catch (error) {
		console.error("Error:", error);
	}
}
