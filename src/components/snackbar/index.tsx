import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { useContext } from 'react';
import { AuthContext } from '../../Providers/authContext';

type VerticalPosition = 'top' | 'bottom';
type HorizontalPosition = 'left' | 'center' | 'right';

export default function PositionedSnackbar() {
  const { vertical, horizontal, open, handleClick, handleClose } = useContext(AuthContext);

  const buttons = (
    <React.Fragment>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={() => handleClick({ vertical: 'top' as VerticalPosition, horizontal: 'center' as HorizontalPosition })}>
          Top-Center
        </Button>
      </Box>
      <Grid container sx={{ justifyContent: 'center' }}>
        <Grid size={6}>
          <Button onClick={() => handleClick({ vertical: 'top' as VerticalPosition, horizontal: 'left' as HorizontalPosition })}>
            Top-Left
          </Button>
        </Grid>
        <Grid sx={{ textAlign: 'right' }} size={6}>
          <Button onClick={() => handleClick({ vertical: 'top' as VerticalPosition, horizontal: 'right' as HorizontalPosition })}>
            Top-Right
          </Button>
        </Grid>
        <Grid size={6}>
          <Button onClick={() => handleClick({ vertical: 'bottom' as VerticalPosition, horizontal: 'left' as HorizontalPosition })}>
            Bottom-Left
          </Button>
        </Grid>
        <Grid sx={{ textAlign: 'right' }} size={6}>
          <Button onClick={() => handleClick({ vertical: 'bottom' as VerticalPosition, horizontal: 'right' as HorizontalPosition })}>
            Bottom-Right
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={() => handleClick({ vertical: 'bottom' as VerticalPosition, horizontal: 'center' as HorizontalPosition })}>
          Bottom-Center
        </Button>
      </Box>
    </React.Fragment>
  );

  return (
    <Box sx={{ width: 500 }}>
      {buttons}
      <Snackbar
        anchorOrigin={{ vertical: vertical as VerticalPosition, horizontal: horizontal as HorizontalPosition }}
        open={open}
        onClose={handleClose}
        message="I love snacks"
        key={vertical + horizontal}
      />
    </Box>
  );
}
