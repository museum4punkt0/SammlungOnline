import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { navHeight } from '@smb/smb-react-components-library';

const useStyles = makeStyles((theme: Theme) =>
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
    wrapper: {
      height: '100%',
      width: '100%',
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
    cookieContainer: {
      color: 'red',
    },
  }),
);

export default useStyles;
