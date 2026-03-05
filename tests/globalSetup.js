import { MongoMemoryServer } from "mongodb-memory-server";

let mongod;

export async function setup() {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    process.env.MONGO_URI = uri;
    process.env.JWT_SECRET = "test_secret_key_for_jest";
    // Store for teardown
    process.env.__MONGOD_URI__ = uri;
}

export async function teardown() {
    if (mongod) {
        await mongod.stop();
    }
}
