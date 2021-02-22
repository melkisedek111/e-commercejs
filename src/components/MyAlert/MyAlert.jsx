import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import {AlertContext} from '../../context/alert';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function MyAlert({message, severity}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const {setShowAlert} = useContext(AlertContext);
  return (
    <div className={classes.root} >
      <Collapse in={open}>
        <Alert
        variant="filled"
        severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
                setTimeout(() => setShowAlert({show: false, message: '', severity: ''}), 1000)
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {message}
        </Alert>
      </Collapse>
    </div>
  );
}
