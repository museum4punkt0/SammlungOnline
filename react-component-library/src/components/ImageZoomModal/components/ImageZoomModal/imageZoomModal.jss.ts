import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      position: 'relative',
      height: '100vh',
      width: '100vw',
      display: 'flex',
    },
    closeButton: {
      position: 'absolute',
      right: 0,
      top: 0,
      color: '#fff',
      marginTop: '0px',
      '@media (max-width: 500px)': {
        marginTop: '5%'
      }
    },
  }),
);

export default useStyles;
