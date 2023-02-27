import { ICategory } from '../../types/category';
import Category from './Category';

interface IMenuProps {
    menu: ICategory[];
}

const Menu = ({ menu }: IMenuProps) => (
    <div className="container mx-auto mt-10 pb-9">
        {menu.map((category) => (
            <Category key={category._id} category={category} />
        ))}
    </div>
);

export default Menu;
