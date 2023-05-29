import { createContext, useMemo, useState } from "react";

export type User = { id: string; username: string; role: string } | null;

export interface IUserContext {
	user: User;
	setUser: React.Dispatch<React.SetStateAction<User>>;
}

const initialValue: IUserContext = {
	user: null,
	setUser: () => null,
};

type UserContextProviderProps = {
	children: React.ReactNode;
};

export const UserContext = createContext<IUserContext>(initialValue);

export function UserContextProvider({ children }: UserContextProviderProps) {
	const [user, setUser] = useState<User>(null);

	const contextValue = useMemo(() => {
		return {
			user,
			setUser,
		};
	}, [user]);

	return (
		<UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
	);
}
