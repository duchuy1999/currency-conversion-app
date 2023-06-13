# Currency Conversion App

An application to convert currency using React with Chakra-UI

## Installation

Install the application with npm

```bash
npm install
```

To run the application in development mode

```bash
npm run dev
```

## Comments

- Since this is a development environment, I decided to store the API key for the exchange rate API in the .env file. In a production environment, it is better practice to query the API key from a separate backend.

A few things I would work on if I have more time on the project:

- Adding currency name and flag to the currency selection
- A clear error message popping up when a negative amount is inputted. Currently it is only using the built-in min value and changes any negative value to 0.
