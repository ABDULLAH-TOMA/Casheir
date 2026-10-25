import {create} from 'zustand'
import dataFoods from './data/foodsData.json'


export const useCasheirStore = create((set, get) => ({
  dataFoods,
  orders: {},

  handleAddOrderClick:(item) => {

    const orders = get().orders
    
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
      // setOrders(updateOrders)
        localStorage.setItem("orders",JSON.stringify(updateOrders))
    } else {
      // setOrders([...orders,item])
        // localStorage.setItem("orders",JSON.stringify([...orders,item]))

    }

    set((state) => ({
      
    }))
  }

}))

