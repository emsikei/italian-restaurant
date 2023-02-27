import mongoose from 'mongoose';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

const connect = async () => {
    await mongoose.disconnect();

    mongoServer = await MongoMemoryServer.create();

    const mongoUri = mongoServer.getUri();

    mongoose.set('strictQuery', false);

    await mongoose.connect(mongoUri);
};

const close = async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
};

const clear = async () => {
    const { collections } = mongoose.connection;

    for (const key in collections) {
        await collections[key].deleteMany({});
    }
};

export default {
    connect,
    close,
    clear,
};
