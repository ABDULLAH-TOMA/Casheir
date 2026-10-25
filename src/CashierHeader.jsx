import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {  useContext} from 'react';
import { SearchItemsContext } from "./Context/SearchItemsContext";
import { CategoryContext } from "./Context/CategoryContext";



export default function CashierHeader() {
  const {searchField,setSearchField} = useContext(SearchItemsContext);
  const {category, setCategory} = useContext(CategoryContext);

  function handleSearchMenuItem(event) {
    setSearchField(event.target.value)
  }

  function handleChangeCategory(event, newCategory) {
    setCategory(newCategory)
  }

  return (
    <>
      <Grid
        container
        sx={{ justifyContent: "space-between", alignItems: "center" }}
        spacing={4}
      >
        <Grid size={5}>
          <Typography variant="h1" sx={{ fontSize: 35 }} gutterBottom>
            Cashier
          </Typography>
          <Typography variant="body1">Point Of Sale</Typography>
        </Grid>
        <Grid size={7}>
          <TextField fullWidth size="small" label="Search" variant="outlined" value={searchField} onChange={handleSearchMenuItem} />
        </Grid>
      </Grid>

      {/* Navigation Bottom Filter */}
      <Tabs centered value={category} onChange={handleChangeCategory} >
        <Tab value={"Most Poppular"} label="Most Poppular" />
        <Tab value={"Burgers"} label="Burgers" />
        <Tab value={"Pizza" } label="Pizza" />
        <Tab value={"Fish"} label="Fish" />
        <Tab value={"Appetizers"} label="Appetizers" />
        <Tab value={"Sandwiches"} label="Sandwiches" />
        <Tab value={"Desserts"} label="Desserts" />
      </Tabs>
    </>
  );
}
