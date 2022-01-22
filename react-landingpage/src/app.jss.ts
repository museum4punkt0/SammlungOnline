import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      minHeight: '100vh',
      overflowX: 'hidden',
      display: 'flex',
    },
    grow: {
      flexGrow: 1,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflowX: 'hidden',
    },
    loadingWrapper: {
      height: '100vh',
      width: '100vw',
      backgroundColor: '#000000',
    },
    wrapper: {
      height: '100%',
      width: '100%',
    },
    loadingSpinner: {
      position: 'relative',
      top: '50vh',
    },
  }),
);

export default useStyles;
