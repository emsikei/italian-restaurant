/* eslint-disable react/jsx-no-constructed-context-values */
import { ReactNode, useState, createContext, useContext, useEffect, Dispatch, SetStateAction } from 'react';
import { UserDocument } from '../types/auth';

interface UserContext {
    user: UserDocument;
    setUser: Dispatch<SetStateAction<UserDocument>>;
}

export const UserContextImpl = createContext<UserContext>(null!);

export function useUser() {
    return useContext(UserContextImpl);
}

interface Props {
    children: ReactNode;
}

export const UserProvider = ({ children }: Props) => {
    const [user, setUser] = useState<UserDocument>({} as UserDocument);

    return (
        <UserContextImpl.Provider
            value={{
                user,
                setUser,
            }}
        >
            {children}
        </UserContextImpl.Provider>
    );
};
