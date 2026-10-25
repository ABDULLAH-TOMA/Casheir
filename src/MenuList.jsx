import { useContext } from 'react';
import MenuItem from './MenuItem';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { SearchItemsContext } from "./Context/SearchItemsContext";
import { CategoryContext } from "./Context/CategoryContext";
import { useCasheirStore } from "./useCasheirStore";


export default function MenuList() {
    const dataFoods = useCasheirStore((state) => state.dataFoods)

  const {searchField} = useContext(SearchItemsContext);
  const {category} = useContext(CategoryContext);


  const mono  = dataFoods.filter((item) => {
    if(category == "Most Poppular") return true

    return item.category == category 
  })

const toBeRender = mono.filter((item) => {
  const query = searchField.toLowerCase().trim();

  if(query == "") return true;

  const words = item.name.split(" ")


  return words.some((word) => word.toLowerCase().startsWith(query))

})


  const menuList = toBeRender.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
          />
        ))

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          },
          gap: 2.5,
        }}
      >
        {menuList}
      </Box>
    </Container>
  );
}