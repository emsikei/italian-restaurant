import * as cron from 'node-cron';
import ProductModel from '@/resources/product/product.model';
import CategoryModel from '@/resources/category/category.model';
import TokenModel from '@/resources/token/token.model';

// Run every Tuesday at 00:00
const addDiscountToPizza = cron.schedule('0 0 * * 2', async () => {
    const pizzaCategory = await CategoryModel.find({ slug: /pizza/ }).populate('products');

    for (const pizzaType of pizzaCategory) {
        for (const pizza of pizzaType.products) {
            await ProductModel.findOneAndUpdate({ _id: pizza._id }, { discount: 20 });
        }
    }

    console.log('====> [TASK]: add-discount <====');
});

// Run every Wednesday at 00:00
const removeDiscountFromPizza = cron.schedule('0 0 * * 3', async () => {
    const pizzaCategory = await CategoryModel.find({ slug: /pizza/ }).populate('products');

    for (const pizzaType of pizzaCategory) {
        for (const pizza of pizzaType.products) {
            await ProductModel.findOneAndUpdate({ _id: pizza._id }, { discount: 0 });
        }
    }

    console.log('====> [TASK]: remove-discount <====');
});

// Run every day at 00:00
const cleanExpiredSessions = cron.schedule('0 0 * * *', async () => {
    const expiredSessions = await TokenModel.find({ expiresAt: { $lt: new Date() } });

    for (const session of expiredSessions) {
        await TokenModel.findOneAndDelete({ _id: session._id });
    }

    console.log('====> [TASK]: clean-expired-sessions <====');
});

export const runTasks = () => {
    addDiscountToPizza.start();
    removeDiscountFromPizza.start();
    cleanExpiredSessions.start();
};

export const stopTasks = () => {
    addDiscountToPizza.stop();
    removeDiscountFromPizza.stop();
    cleanExpiredSessions.stop();
};
