import { ReactNode } from 'react';

interface ICheckoutLayoutProps {
    children: ReactNode;
}

const CheckoutLayout = ({ children }: ICheckoutLayoutProps) => (
    <div className="relative min-h-screen">
        <main className="container mx-auto px-5 md:px-10">{children}</main>
        {/* <Footer /> */}
    </div>
);

export default CheckoutLayout;
