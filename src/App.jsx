import "./App.css";
import foodsData from "./data/foodsData.json";

import Cashier from "./Cashier";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { orange } from "@mui/material/colors";



import { useState } from "react";

import { OrderContext } from "./Context/OrderContext";
import { DataFoodsContext } from "./Context/DataFoodsContext";
import { SearchItemsContext } from "./Context/SearchItemsContext";
import { CategoryContext } from "./Context/CategoryContext";
import { SnackbarProvider } from "./Context/SnackbarContext";

function App() {
  const [orders, setOrders] = useState([]);
  const [dataFoods, setDataFoods] = useState(foodsData);
  const [searchField, setSearchField] = useState("");
  const [category, setCategory] = useState("Most Poppular");

  const theme = createTheme({
    typography: {
      fontFamily: ["Poppins"],
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
          <DataFoodsContext.Provider value={{ dataFoods, setDataFoods }}>
            <OrderContext.Provider value={{ orders, setOrders }}>
              <Container maxWidth="lg" style={{ backgroundColor: "white" }}>
                <Cashier />
              </Container>
            </OrderContext.Provider>
          </DataFoodsContext.Provider>
        </SearchItemsContext.Provider>
      </CategoryContext.Provider>
    </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
