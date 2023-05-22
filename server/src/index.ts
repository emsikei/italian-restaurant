import 'dotenv/config';
import 'module-alias/register';
import { runTasks } from './tasks';
import App from './app';
import CategoryController from '@/resources/category/category.controller';
import ProductController from '@/resources/product/product.controller';
import AuthController from '@/resources/auth/auth.controller';
import LocalityController from '@/resources/locality/locality.controller';
import BannerController from '@/resources/banner/banner.controller';
import MenuController from '@/resources/menu/menu.controller';
import UserController from '@/resources/user/user.controller';
import SizeController from '@/resources/size/size.controller';
import OrderController from '@/resources/order/order.controller';

const app = new App(
    [
        new MenuController(),
        new CategoryController(),
        new ProductController(),
        new OrderController(),
        new SizeController(),
        new AuthController(),
        new LocalityController(),
        new BannerController(),
        new UserController(),
    ],
    process.env.PORT
);

const server = app.listen();

console.log('hello world');

runTasks();

export default server;
