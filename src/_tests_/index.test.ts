import supertest from "supertest";
import csvParser from "csv-parser";
import fs from "fs";
import { app } from "../index";
import { Readable } from "stream";
import path from "path";

describe("Test Suite for Controllers", () => {
  describe("Test the test function", () => {
    it('should respond with "Hello World"', async () => {
      const response = await supertest(app) // Use the app instance
        .get("/api/v1/")
        .expect(200)
        .then((res) => res.body);

      expect(response).toEqual("Hello World");
    }, 10000);
  });

  describe("Test Suite for Echo Function", () => {
    it("should respond with the correct matrix string", async () => {
      const mockFile = {
        path: "./matrix.csv",
      };

      jest.spyOn(fs, "createReadStream").mockImplementationOnce(() => {
        const readable = new Readable();
        readable._read = () => {}; // Define a dummy _read function
        readable.push("header1,header2\n");
        readable.push("value1,value2\n");
        readable.push(null); // Signal the end of the stream
        return readable as any; // Cast to any to satisfy type checker
      });

      // Mock CSV parser
      jest.mock("csv-parser", () => {
        return jest.fn().mockImplementation(() => ({
          on: jest.fn().mockImplementation((event, callback) => {
            if (event === "end") {
              callback(); // End of parsing
            }
            return {
              on: jest.fn(),
            };
          }),
        }));
      });

      const response = await supertest(app)
        .post("/api/v1/echo")
        .attach("file", mockFile.path);
      // Assuming the response is a string representation of the CSV data
      const expectedResponse = "value1,value2";

      expect(response.status).toBe(200);
      console.log(response.text, expectedResponse, "response");
      expect(response.text).toBe(expectedResponse);
    });

    it("should handle the case when no file is uploaded", async () => {
      const response = await supertest(app).post("/api/v1/echo").expect(400);

      expect(response.body).toEqual({
        status: false,
        message: "No file uploaded.",
      });
    });
  });

  describe("Test Suite for Invert Controller", () => {
    it("should respond with the inverted matrix string", async () => {
      const mockFile = {
        path: "./matrix.csv",
      };

      // Mock fs.createReadStream and csvParser
      jest.spyOn(fs, "createReadStream").mockImplementationOnce(() => {
        const readable = new Readable();
        readable._read = () => {};
        readable.push("header1,header2\n");
        readable.push("value1,value2\n");
        readable.push(null);
        return readable as any;
      });

      jest.mock("csv-parser", () => {
        return jest.fn().mockImplementation(() => ({
          on: jest.fn().mockImplementation((event, callback) => {
            if (event === "end") {
              callback();
            }
            return {
              on: jest.fn(),
            };
          }),
        }));
      });

      const response = await supertest(app)
        .post("/api/v1/invert")
        .attach("file", mockFile.path);

      const expectedResponse = "value1\nvalue2";

      expect(response.status).toBe(200);
      expect(response.text).toBe(expectedResponse);
    });

    it("should handle the case when no file is uploaded", async () => {
      const response = await supertest(app).post("/api/v1/invert").expect(400);

      expect(response.body).toEqual({
        status: false,
        message: "No file uploaded.",
      });
    });

    it("should handle internal server error during file reading", async () => {
      // Mock fs.createReadStream to throw an error
      jest.spyOn(fs, "createReadStream").mockImplementationOnce(() => {
        throw new Error("Error reading file");
      });

      await expect(async () => {
        await supertest(app)
          .post("/api/v1/invert")
          .attach("file", "./nonexistentfile.csv");
      }).rejects.toThrow("Error reading file");
    });

    it("should handle internal server error during CSV parsing", async () => {
      // Mock csvParser to throw an error
      jest.mock("csv-parser", () => {
        return jest.fn().mockImplementation(() => ({
          on: jest.fn().mockImplementation((event, callback) => {
            if (event === "error") {
              callback(new Error("Error parsing CSV"));
            }
            return {
              on: jest.fn(),
            };
          }),
        }));
      });

      try {
        await supertest(app)
          .post("/api/v1/invert")
          .attach("file", "./matrix.csv");
      } catch (error) {
        console.log("Actual error message:", error.message);
        expect(error.message).toMatch(/Aborted/);
      }
    });
  });
});

// Add similar tests for other endpoints
