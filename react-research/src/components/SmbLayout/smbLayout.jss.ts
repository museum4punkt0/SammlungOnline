import { makeStyles, createStyles } from '@material-ui/core/styles';

// import { navHeight } from '@smb/smb-react-components-library';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      minHeight: '100vh',
      overflowX: 'hidden',
      display: 'flex',
      width: '100%',
    },
    grow: {
      flexGrow: 1,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflowX: 'hidden',
    },
    wrapper: {
      height: '100%',
      width: '100%',
      //marginTop: navHeight,
    },
    loadingWrapper: {
      height: '100vh',
      width: '100vw',
      backgroundColor: '#000000',
    },
    loadingSpinner: {
      position: 'relative',
      top: '50vh',
    },
    footerWrapper: {
      backgroundColor: 'black',
    },
  }),
);

export default useStyles;
