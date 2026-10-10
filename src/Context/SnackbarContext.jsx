import { createContext, useState } from "react";
import SnackbarComp from "../SnackbarComp";


  // eslint-disable-next-line react-refresh/only-export-components 
export const SnackbarContext = createContext(null);



export const  SnackbarProvider = ({children}) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState("")

  function handleOpenSnackbar(massege,severity) {
    setOpenSnackbar(true)
    setSnackbarMessage(massege)
    setSnackbarSeverity(severity)
  }

  function handleCloseSnackbar() {
    setOpenSnackbar(false)
  }

  


  return (
    <>
    <SnackbarComp snackbarSeverity= {snackbarSeverity} openSnackbar ={openSnackbar} handleCloseSnackbar={handleCloseSnackbar} snackbarMessage={snackbarMessage} />
    <SnackbarContext.Provider value={{handleOpenSnackbar}}>
      {children}
    </SnackbarContext.Provider>
    </>
    
  )
}