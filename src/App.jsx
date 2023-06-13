import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  NumberInput,
  NumberInputField,
  Select,
  SimpleGrid,
  Button,
  Text,
} from "@chakra-ui/react";

function App() {
  const [countries, setCountries] = useState(null);
  const [currencyOne, setCurrencyOne] = useState("USD");
  const [currencyTwo, setCurrencyTwo] = useState("CAD");
  const [amount, setAmount] = useState(0);
  const [isSubmitted, setSubmitted] = useState(false);
  const [display, setDisplay] = useState({
    currencyOne: "USD",
    currencyTwo: "CAD",
    amount: 0,
    exchangeAmount: 0,
  });

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${
          import.meta.env.VITE_API_KEY
        }/latest/${currencyOne}`
      );
      const data = await response.json();
      const exchangeRate = data["conversion_rates"][currencyTwo];
      setDisplay({
        currencyOne: currencyOne,
        currencyTwo: currencyTwo,
        amount: amount,
        exchangeAmount: (amount * exchangeRate).toLocaleString("en-US", {
          maximumFractionDigits: 2,
        }),
      });
      setSubmitted(true);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleChangeAmount = (value) => {
    setAmount(value);
  };

  const handleChangeCurrencyOne = (event) => {
    setCurrencyOne(event.target.value);
  };

  const handleChangeCurrencyTwo = (event) => {
    setCurrencyTwo(event.target.value);
  };

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) =>
        data
          .map((country) => country["currencies"])
          .filter((country) => country)
          .map((country) => Object.keys(country))
          .flat(1)
      ) // Get all currency names
      .then((data) => new Set(data)) // remove duplicates
      .then((data) => setCountries(Array.from(data).sort())) // sort currency names
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  if (countries !== null)
    return (
      <Box h="calc(100vh)" bg="#11698E" margin="auto">
        <Box textAlign="center" pt="100px" pb="50px">
          <Heading as="h1" noOfLines={1} color="#FFF2F2">
            Currency Converter App
          </Heading>
        </Box>

        <Box margin="auto" textAlign="center">
          <Flex>
            <Box
              w="40%"
              margin="auto"
              borderWidth="1px"
              borderRadius="lg"
              bg="white"
              p="20"
            >
              <SimpleGrid columns={2} spacing={10} pb="20px">
                <Box>
                  <Box
                    as="h1"
                    fontWeight="semibold"
                    noOfLines={1}
                    textAlign="left"
                    pb="5px"
                    color="#11698E"
                  >
                    From:
                  </Box>
                  <Select
                    value={currencyOne}
                    onChange={handleChangeCurrencyOne}
                    size="lg"
                  >
                    {countries.map((item) => {
                      return <option value={item}>{item}</option>;
                    })}
                  </Select>
                </Box>
                <Box>
                  <Box
                    as="h1"
                    fontWeight="semibold"
                    noOfLines={1}
                    textAlign="left"
                    pb="5px"
                    color="#11698E"
                  >
                    To:
                  </Box>
                  <Select
                    value={currencyTwo}
                    onChange={handleChangeCurrencyTwo}
                    size="lg"
                  >
                    {countries.map((item) => {
                      return <option value={item}>{item}</option>;
                    })}
                  </Select>
                </Box>
              </SimpleGrid>
              <Box pb="20px">
                <Box
                  as="h1"
                  fontWeight="semibold"
                  noOfLines={1}
                  textAlign="left"
                  pb="5px"
                  color="#11698E"
                >
                  Amount:
                </Box>
                <Box display="flex" alignItems="center">
                  <NumberInput
                    onChange={handleChangeAmount}
                    min={0}
                    defaultValue={0}
                    size="lg"
                    w="100%"
                  >
                    <NumberInputField />
                  </NumberInput>
                </Box>
              </Box>
              <Button
                onClick={handleSubmit}
                color="#11698E"
                size="lg"
                mb="20px"
              >
                Convert
              </Button>
              {isSubmitted ? (
                <Text fontSize="3xl" textAlign="left" color="#11698E">
                  {display["amount"]} {display["currencyOne"]} ={" "}
                  {display["exchangeAmount"]} {display["currencyTwo"]}
                </Text>
              ) : null}
            </Box>
          </Flex>
        </Box>
      </Box>
    );
}

export default App;
