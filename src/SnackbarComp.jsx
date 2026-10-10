import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';



export default function SnackBarComp({openSnackbar,snackbarMessage,snackbarSeverity,handleCloseSnackbar}) {



  return (
    <div>
      <Snackbar open={openSnackbar} onClose={handleCloseSnackbar} autoHideDuration={3000} >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
