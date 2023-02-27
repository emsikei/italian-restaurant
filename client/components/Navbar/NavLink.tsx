/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

interface INavLinkProps {
    text: string;
    id?: string;
}

const afterStyles =
    'hover:after:block hover:after:w-full hover:after:bg-white hover:after:h-11 hover:after:absolute hover:after:top-8 hover:after:transition-all hover:after:ease-in-out after:opacity-0 hover:after:opacity-100';

const NavLink = ({ text, id }: INavLinkProps) => {
    const scrollTo = (sectiondId: string) => {
        const yOffset = -100;
        const element = document.getElementById(sectiondId);
        const y = (element?.getBoundingClientRect().top as number) + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: 'smooth' });
    };

    return (
        <li
            className="bg-no-repeat bg-center bg-cover list-none py-1 md:p-2 flex items-center md:justify-center rounded-2xl text-center transition-all ease-in-out hover:cursor-pointer relative hover:text-vp_brown-100            "
            onClick={() => {
                scrollTo(id as string);
            }}
        >
            <a>{text}</a>
        </li>
    );
};

export default NavLink;
