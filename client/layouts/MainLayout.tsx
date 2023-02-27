import { ReactNode } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { ICategory } from '../types/category';

interface IMainLayout {
    children: ReactNode;
    menu?: ICategory[];
}

const MainLayout = ({ children, menu }: IMainLayout) => (
    <div className="relative h-screen">
        <Navbar categories={menu} />
        <main className="container mx-auto px-2 md:px-10">{children}</main>
        {/* <footer className="w-screen mx-auto text-center bottom-0 z-30 py-3">
            <div className="w-full bg-gray-700">FOOTER</div>
        </footer> */}
    </div>
);
export default MainLayout;
