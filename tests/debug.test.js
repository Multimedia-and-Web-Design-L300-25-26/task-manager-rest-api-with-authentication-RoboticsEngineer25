import request from "supertest";
import app from "../src/app.js";

describe("Debug Register", () => {
    it("should show what error is returned from register", async () => {
        const res = await request(app)
            .post("/api/auth/register")
            .send({
                name: "Debug User",
                email: "debug@debug.com",
                password: "123456"
            });

        console.log("Status:", res.statusCode);
        console.log("Body:", JSON.stringify(res.body));

        // This will always pass - we just want to see the output
        expect(true).toBe(true);
    });
});
