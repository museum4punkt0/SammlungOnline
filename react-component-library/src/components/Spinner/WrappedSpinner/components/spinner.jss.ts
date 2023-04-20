import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    loadingWrapper: {
      height: 'calc(100vh)',
      width: '100vw',
      top: '-100px',
      position: 'relative',
      backgroundColor: '#0F0900',
    },
    wrapper: {
      height: '100%',
      width: '100%',
    },
    loadingSpinner: {
      position: 'relative',
      top: '50%',
    },
  }),
);

export default useStyles;
