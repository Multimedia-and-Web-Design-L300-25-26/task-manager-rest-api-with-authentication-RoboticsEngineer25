import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongod;

// Connect to in-memory MongoDB before all tests
beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    process.env.MONGO_URI = uri;
    process.env.JWT_SECRET = "test_secret_key_for_jest";
    await mongoose.connect(uri);
}, 30000);

// Clear all collections after all tests in a suite complete
afterAll(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany({});
    }
    await mongoose.connection.close();
    await mongod.stop();
}, 30000);