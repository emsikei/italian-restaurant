import mongoose from 'mongoose';
import 'dotenv/config';

import { models } from '../models';
import { sizes, products, categories, localities } from '../seed.data';

const data = { sizes, categories, products, localities };

const seed = async (): Promise<void> => {
    const MONGO_URL =
        'mongodb+srv://root:root@emsikeicluster.ljpjpbz.mongodb.net/vinopizza_db?retryWrites=true&w=majority';

    mongoose.set('strictQuery', false);

    await mongoose.connect(`${MONGO_URL}`);

    for (const { name, model } of models) {
        // @ts-ignore
        await model.insertMany(data[name]);
        console.log(`Inserted: ${name}`);
    }

    console.log('========= Database seeded! =========');
};

(async function start() {
    await seed();
    await mongoose.disconnect();
})();
