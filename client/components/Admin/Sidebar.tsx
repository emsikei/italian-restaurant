/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Dispatch, SetStateAction, useState } from 'react';
import { IoMdExit } from 'react-icons/io';
import Router from 'next/router';
import { generateUUID } from '../../helpers';
import { poster } from '../../lib/fetcher';

import { sidebarOptions } from '../../states/admin';
import { SidebarOption } from '../../types/admin';
import { RequestError } from '../../types/errors';
import { useUser } from '../../contexts/user.context';
import { UserDocument } from '../../types/auth';

interface ISidebarProps {
    activeTab: SidebarOption;
    setActiveTab: Dispatch<SetStateAction<SidebarOption>>;
}

const Sidebar = ({ activeTab, setActiveTab }: ISidebarProps) => {
    const [requestError, setRequestError] = useState<RequestError | string>('');
    const { user, setUser } = useUser();

    const handleClick = async () => {
        const [error, data] = await poster(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
        if (!error && data) {
            setUser({} as UserDocument);
            Router.push('/login');
        }

        if (error) setRequestError(error);
    };

    return (
        <aside className="w-40 h-screen fixed left-0 top-0 py-3 border-r-2 border-vp_gray text-center ">
            <h1 className="font-medium uppercase pb-2 border-b-2 border-vp_gray">Panela admin</h1>
            <div className="h-full grid grid-rows-6">
                <ul className="text-center w-full row-span-5">
                    {sidebarOptions.map((option) => (
                        <li
                            className={`py-2 pl-4 cursor-pointer transition-all ${
                                option.name === activeTab.name ? 'bg-vp_brown-100 text-white' : ''
                            }`}
                            key={generateUUID()}
                            onClick={() => setActiveTab(option)}
                        >
                            <span className="flex items-center gap-2">
                                {option.icon} {option.name}
                            </span>
                        </li>
                    ))}
                </ul>
                <div className="row-span-1 flex items-center justify-center">
                    <button
                        type="button"
                        className="text-center hover:text-vp_brown-200 transition-all z-50 "
                        onClick={handleClick}
                    >
                        <span className="flex justify-center items-center gap-2">
                            <span className="rotate-180">
                                <IoMdExit />
                            </span>
                            Ieșire
                        </span>
                    </button>
                    <p className="ml-1 mt-2 text-xs text-red-500">{requestError && JSON.stringify(requestError)}</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
