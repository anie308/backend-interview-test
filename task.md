## Collectwire Backend Coding Challenge

### Stack

- NodeJs
- Express
- Typescript

### Task

Create a simple NodeJs/Typescript project with an Express webserver that is accessible on any port 8088. There is a csv file of a matrix would used to test. You are required to create 5 endpoints based on the task below (/echo, /invert, /flatten, /sum, /multiply)

Given an uploaded csv file(matrix.csv)

```
1,2,3
4,5,6
7,8,9
```

1. Echo (given)

   - Return the matrix as a string in matrix format.

   ```
   // Expected output
   1,2,3
   4,5,6
   7,8,9
   ```

2. Invert
   - Return the matrix as a string in matrix format where the columns and rows are inverted
   ```
   // Expected output
   1,4,7
   2,5,8
   3,6,9
   ```
3. Flatten
   - Return the matrix as a 1 line string, with values separated by commas.
   ```
   // Expected output
   1,2,3,4,5,6,7,8,9
   ```
4. Sum
   - Return the sum of the integers in the matrix
   ```
   // Expected output
   45
   ```
5. Multiply
   - Return the product of the integers in the matrix
   ```
   // Expected output
   362880
   ```

The input file to these functions is a matrix, of any dimension where the number of rows are equal to the number of columns (square). Each value is an integer, and there is no header row. matrix.csv is example valid input.

### Important Notes

- Code/directory structure organization is very important
- Simplicity and readability are as important as functionability
- Demonstrate your indepth understanding of Typescript
- It is important to write tests for each case and proactively handle possible input errors (e.g invalid matrix etc)

### Run web server

```
npm run dev
```

Send request

```
curl -F 'file=@/path/matrix.csv' "localhost:8088/echo"
```

## What we're looking for

- The solution runs
- The solution performs all cases correctly
- The code is easy to read
- The code is reasonably documented
- The code is tested
- The code is robust and handles invalid input and provides helpful error messages
