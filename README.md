# Schedule

A Node.js Express API application to manage and serve daily school schedules and logs via HTTP endpoints.

## Requirements

- Node.js v14+ and npm
- `express` module

## Setup

Install dependencies:

```bash
npm install express
```

## Running

Launch the server:

```bash
node app.js
```

The app listens on port 3333 by default.

## Endpoints

- **GET /**  
  Serves the `public/index.html` file.

- **GET /log?pass=<logpass>&text=<message>**  
  Appends a log entry if `pass` matches `logpass` and `text` is 1–100 characters.
  - Responses:  
  • `200 OK` on success  
  • `400 Bad Request` if `text` is missing or too long  
  • `403 Forbidden` if `pass` is incorrect

- **GET /all**  
  Responds with combined JSON from `logs.json` and `save.json`.

- **GET /today**  
  Returns current time (`HHMMSS`) + today’s schedule string (`r1`…`r4`) based on `week` mapping.  
  If no valid mapping, returns time + default mask of '9's.

- **POST /** (URL-encoded form)  
  Updates saved schedules. Required body fields:  
  - `pass`: admin password matching `password` in `app.js`  
  - `r1`, `r2`, `r3`, `r4`: schedule strings (length mod 4 == 0, numeric)  
  - `week`: 7-character string with digits `0`–`4` mapping each weekday to `r1`…`r4` or none
  - Responses:  
    • Success message on valid data  
    • Error message on missing/invalid fields or wrong password

## Configuration

Edit `app.js` to adjust:

- `password` (admin operations)
- `logpass` (logging)
- `maxLogs` (maximum entries in `logs.json`)
- Listening port (default `3333`)
