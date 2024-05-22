import request from "supertest";
import createServer from "../../src/server"; // Adjust path as needed
import mongoose from "mongoose";
import { GetCoveragesRequestBody } from "../../src/interfaces/calculation.interface";
import { Coverage, Discount, Transactional } from "../../src/types/types";

require("dotenv").config();

const app = createServer();

describe("POST /calculate", () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI as string);
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    it("should calculate insurance price successfully", async () => {
        const requestBody = {
            name: "John Doe",
            birthdate: "1990-01-01",
            city: "New York",
            vehiclePower: 120,
            voucher: 50,
            selectedCoverages: ["664e10dfd90895eb9dee4dd4", "664e10dfd90895eb9dee4dd5"],
            selectedDiscounts: ["664e10dfd90895eb9dee4dda", "664e10dfd90895eb9dee4dd9"],
        };

        const response = await request(app).post("/api/calculate").send(requestBody);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("basePrice");
        expect(response.body).toHaveProperty("coverages");
        expect(response.body).toHaveProperty("discounts");
        expect(response.body).toHaveProperty("totalPrice");
    }, 10000);

    it("should apply age-dependent coverage price correctly", async () => {
        const requestBody: GetCoveragesRequestBody = {
            name: "Marin",
            birthdate: "2001-01-01", // Customer is 21 years old.
            city: "Chicago",
            vehiclePower: 100,
            voucher: 0,
            selectedCoverages: ["664e10dfd90895eb9dee4dd5"], // AO_PLUS with age condition 30
            selectedDiscounts: [],
        };

        const { body } = await request(app).post("/api/calculate").send(requestBody);
        expect(body.coverages[0].value).toBe(55);
    });

    it("should not allow negative total prices when voucher exceeds total cost", async () => {
        const requestBody: GetCoveragesRequestBody = {
            name: "Marin",
            birthdate: "1990-01-01",
            city: "Miami",
            vehiclePower: 80,
            voucher: 1000, // Large voucher
            selectedCoverages: ["664e10dfd90895eb9dee4dd4"], // BONUS_PROTECTION
            selectedDiscounts: [],
        };

        const { body } = await request(app).post("/api/calculate").send(requestBody);
        expect(body.totalPrice).toBe(0); // Total price should not go negative
    });

    it("should correctly apply multiple discounts to the insurance price", async () => {
        const requestBody: GetCoveragesRequestBody = {
            name: "Marin",
            birthdate: "1985-06-15",
            city: "Los Angeles",
            vehiclePower: 110,
            voucher: 0,
            selectedCoverages: ["664e10dfd90895eb9dee4dd4"],
            selectedDiscounts: ["664e10dfd90895eb9dee4dd9", "664e10dfd90895eb9dee4dda"], 
            // COMMERCIAL and ADVISER - because there arent 2 or more coverages, adviser is not applied
        };

        const { body } = await request(app).post("/api/calculate").send(requestBody);
        const totalDiscount = body.discounts.reduce(
            (acc: number, discount: { value: number }) => acc + discount.value,
            0
        );
        expect(totalDiscount).toBe(0); // strong car and discount cancel each other out
    });

    it("should correctly apply a surcharge for strong cars", async () => {
        const requestBody: GetCoveragesRequestBody = {
            name: "Marin",
            birthdate: "1990-01-01",
            city: "Boston",
            vehiclePower: 150,
            voucher: 0,
            selectedCoverages: [],
            selectedDiscounts: [], // STRONG_CAR_SURCHARGE - not selected, but automatic.
        };

        const { body } = await request(app).post("/api/calculate").send(requestBody);
        expect(body.discounts[0].value).toBeGreaterThan(0); // Surcharge should be positive
    });

    it("should round all monetary values to two decimal places", async () => {
        const requestBody: GetCoveragesRequestBody = {
            name: "Marin",
            birthdate: "1990-01-01",
            city: "Seattle",
            vehiclePower: 90,
            voucher: 25.555,
            selectedCoverages: ["664e10dfd90895eb9dee4dd4"],
            selectedDiscounts: [],
        };

        const { body } = await request(app).post("/api/calculate").send(requestBody);
        expect(Number(body.basePrice.toFixed(2))).toBe(body.basePrice);
        expect(Number(body.totalPrice.toFixed(2))).toBe(body.totalPrice);
        body.coverages.forEach((coverage: Transactional) => {
            expect(Number(coverage.value.toFixed(2))).toBe(coverage.value);
        });
        body.discounts.forEach((discount: Transactional) => {
            expect(Number(discount.value.toFixed(2))).toBe(discount.value);
        });
    });
});
