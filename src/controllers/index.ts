import { Request, Response } from "express";
import fs from "fs";
import csvParser from "csv-parser";

export const test = (req: Request, res: Response) => {
  res.status(200).json("Hello World");
};

//Read the uploaded CSV file and return it as a string in matrix format.
export const echo = (req: Request, res: Response) => {
  const { file } = req;

  if (!file) {
    return res.status(400).json({
      status: false,
      message: "No file uploaded.",
    });
  }

  const matrix: string[] = [];

  const readStream = fs.createReadStream(file.path);

  readStream
    .on("error", (err) => {
      console.error("Error reading file:", err);
      return res.status(500).json({
        status: false,
        message: "Internal server error.",
      });
    })
    .pipe(csvParser())
    .on("data", (data) => {
      const row = Object.values(data).join(",");
      matrix.push(row);
    })
    .on("end", () => {
      // Read and return the matrix as a string
      const matrixString = matrix.join("\n");

      // Expected response
      res.send(matrixString);
    })
    .on("error", (err) => {
      console.error("Error parsing CSV:", err);
      return res.status(500).json({
        status: false,
        message: "Internal server error.",
      });
    });
};

//Read the uploaded CSV file and return it inverted as a string in matrix format.
export const invert = (req: Request, res: Response) => {
  const { file } = req;

  if (!file) {
    return res.status(400).json({
      status: false,
      message: "No file uploaded.",
    });
  }

  const matrix: string[] = [];

  const readStream = fs.createReadStream(file.path);

  readStream
    .on("error", (err) => {
      console.error("Error reading file:", err);
      return res.status(500).json({
        status: false,
        message: "Internal server error.",
      });
    })
    .pipe(csvParser())
    .on("data", (data) => {
      const row = Object.values(data).join(",");
      matrix.push(row);
    })
    .on("end", () => {
      // Read and invert the matrix as a string
      const invertedMatrix = matrix[0]
        .split(",")
        .map((_, index) => matrix.map((row) => row.split(",")[index]))
        .join("\n");

      // Expected response
      res.send(invertedMatrix);
    })
    .on("error", (err) => {
      console.error("Error parsing CSV:", err);
      return res.status(500).json({
        status: false,
        message: "Internal server error.",
      });
    });
};

//Read the uploaded CSV file and return it flattened as a string in matrix format.
export const flatten = (req: Request, res: Response) => {
  const { file } = req;

  if (!file) {
    return res.status(400).json({
      status: false,
      message: "No file uploaded.",
    });
  }

  const values: number[] = [];

  const readStream = fs.createReadStream(file.path);

  readStream
    .on("error", (err) => {
      console.error("Error reading file:", err);
      return res.status(500).json({
        status: false,
        message: "Internal server error.",
      });
    })
    .pipe(csvParser())
    .on("data", (data) => {
      Object.values(data).forEach((value) => {
        const parsedValue = parseInt(String(value), 10);
        if (!isNaN(parsedValue)) {
          values.push(parsedValue);
        }
      });
    })
    .on("end", () => {
      // After reading the CSV, flatten the matrix into a single-line string
      const flattenedString = values.join(",");

      //Expected response
      res.send(flattenedString);
    })
    .on("error", (err) => {
      console.error("Error parsing CSV:", err);
      return res.status(500).json({
        status: false,
        message: "Internal server error.",
      });
    });
};

//Read the uploaded CSV file and return the sum of all the integers.
export const sum = (req: Request, res: Response) => {
  //   res.send("Hello Sum");
  const { file } = req;

  if (!file) {
    return res.status(400).json({
      status: false,
      message: "No file uploaded.",
    });
  }

  let sum = 0;

  // Read the CSV file and process it
  fs.createReadStream(file.path)
    .pipe(csvParser())
    .on("data", (data) => {
      Object.values(data).forEach((value) => {
        const parsedValue = parseInt(String(value), 10);
        if (!isNaN(parsedValue)) {
          sum += parsedValue;
        }
      });
    })
    .on("end", () => {
      // After reading the CSV, send the sum as the response
      const stringifiedSum = sum.toString();
      res.send(stringifiedSum);
    });
};

//Read the uploaded CSV file and return the product of all the integers.
export const multiply = (req: Request, res: Response) => {
  const { file } = req;

  if (!file) {
    return res.status(400).json({
      status: false,
      message: "No file uploaded.",
    });
  }

  let product = 1;

  const readStream = fs.createReadStream(file.path);

  readStream
    .on("error", (err) => {
      console.error("Error reading file:", err);
      return res.status(500).json({
        status: false,
        message: "Internal server error.",
      });
    })
    .pipe(csvParser())
    .on("data", (data) => {
      Object.values(data).forEach((value) => {
        const parsedValue = parseInt(String(value), 10);
        if (!isNaN(parsedValue)) {
          product *= parsedValue;
        }
      });
    })
    .on("end", () => {
      // After reading the CSV, send the product as the response
      const stringifiedProduct = product.toString();
      res.send(stringifiedProduct);
    })
    .on("error", (err) => {
      console.error("Error parsing CSV:", err);
      return res.status(500).json({
        status: false,
        message: "Internal server error.",
      });
    });
};
