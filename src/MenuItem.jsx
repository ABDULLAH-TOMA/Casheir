import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { OrderContext } from './Context/OrderContext';
import { useContext } from 'react';

export default function MenuItem({ item }) {
  
  const {orders, setOrders} = useContext(OrderContext);
  
  function handleAddOrderClick() {
    
    const isExist = orders.some((order) => order.id === item.id)
 
    if(isExist) {
      const updateOrders = orders.map((order) => {
        if(order.id == item.id) {
                  return {
          ...order,count:order.count +1 
        }
        } else {
          return order
        }
      }) 
      setOrders(updateOrders)
        localStorage.setItem("orders",JSON.stringify(updateOrders))
    } else {
      setOrders([...orders,item])
        localStorage.setItem("orders",JSON.stringify([...orders,item]))

    }

  }
  
  
  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '14px',
        boxShadow: '0 2px 8px #0000000f',
      }}
      
    >
        <CardMedia
          component="img"
          height="150"
          image={item.image}
          alt={item.name}
          sx={{

          }}
        />
        <CardContent sx={{ flexGrow: 1, p: 2, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <Box>
                      <Typography
            gutterBottom
            variant="h6"
            title={item.name}
            sx={{ fontSize: '1rem', fontWeight: 600 }}
          >
            {item.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
            ${item.price}
          </Typography>
          </Box>

          {/* Add Order Button */}
          
          <IconButton onClick={handleAddOrderClick} color='primary' >
            <AddIcon/>
          </IconButton>
          {/* ==== Add Order Button ==== */}
          
        </CardContent>

    </Card>
  );
}