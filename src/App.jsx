import "./App.css";
import Cashier from "./Cashier";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { orange } from "@mui/material/colors";



import { useState } from "react";

import { OrderContext } from "./Context/OrderContext";
import { SearchItemsContext } from "./Context/SearchItemsContext";
import { CategoryContext } from "./Context/CategoryContext";
import { SnackbarProvider } from "./Context/SnackbarContext";


function App() {



  const [orders, setOrders] = useState([]);

  const [searchField, setSearchField] = useState("");
  const [category, setCategory] = useState("Most Poppular");

  const theme = createTheme({
    typography: {
      fontFamily: ["Poppins"],
      h3: {
        fontSize:"25px",
        fontWeight:"600"
      }
    },
    palette: {
      primary: {
        main: orange[500],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
    <SnackbarProvider>
      <CategoryContext.Provider value={{ category, setCategory }}>
        <SearchItemsContext.Provider value={{ searchField, setSearchField }}>
            <OrderContext.Provider value={{ orders, setOrders }}>
              <Container maxWidth="lg" style={{ backgroundColor: "white" }}>
                <Cashier />
              </Container>
            </OrderContext.Provider>
        </SearchItemsContext.Provider>
      </CategoryContext.Provider>
    </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
