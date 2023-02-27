import { SidebarOption } from '../../types/admin';
import { Banners, Categories, Localities, Orders, Products, Sizes } from './Tabs';

interface IMainProps {
    activeTab: SidebarOption;
}

const Main = ({ activeTab }: IMainProps) => (
    <main className="ml-52 mr-11 w-full py-5">
        {/* <h3>
            {activeTab.slug === 'localities' && <h1 className="pl-6">Lista localităților:</h1>}
            {activeTab.slug === 'banners' && <h1>Lista banerelor</h1>}
            {activeTab.slug === 'products' && <h1>Lista productelor</h1>}
            {activeTab.slug === 'categories' && <h1>Lista categoriilor</h1>}
            {activeTab.slug === 'orders' && <h1>Lista ordinilor</h1>}
        </h3> */}
        <section>
            {activeTab.slug === 'localities' && <Localities />}
            {activeTab.slug === 'banners' && <Banners />}
            {activeTab.slug === 'sizes' && <Sizes />}
            {activeTab.slug === 'products' && <Products />}
            {activeTab.slug === 'categories' && <Categories />}
            {activeTab.slug === 'orders' && <Orders />}
        </section>
    </main>
);

export default Main;
