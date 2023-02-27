import mongoose from 'mongoose';
import 'dotenv/config';
import BannerModel from '../../resources/banner/banner.model';

import { models } from '../models';

const dropCollections = async (): Promise<void> => {
    const { MONGO_URL } = process.env;

    mongoose.set('strictQuery', false);

    await mongoose.connect(`${MONGO_URL}`);

    for (const { name, model } of models) {
        // @ts-ignore
        await model.collection.drop();
        console.log(`Dropped: ${name}`);
    }
    // await BannerModel.collection.drop();
    // console.log(`Dropped: banners`);

    console.log('========= Collections dropped! =========');
};

(async function start() {
    await dropCollections();
    await mongoose.disconnect();
})();
