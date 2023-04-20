import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      minHeight: '100vh',
      overflowX: 'hidden',
      flexDirection: 'column',
      display: 'flex',
    },

    loadingWrapper: {
      height: '100vh',
      width: '100vw',
      backgroundColor: '#000',
    },

    wrapper: {
      height: '100%',
      width: '100%',
      minHeight: 'calc(100vh - 100px)',
      flexGrow: 1,
    },

    loadingSpinner: {
      position: 'relative',
      top: '50vh',
    },
  }),
);

export default useStyles;
