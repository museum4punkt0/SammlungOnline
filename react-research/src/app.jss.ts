import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
  return createStyles({
    loadingWrapper: {
      height: '100vh',
      width: '100vw',
      backgroundColor: '#000000',
    },
    loadingSpinner: {
      position: 'relative',
      top: '50vh',
    },
  });
});

export default useStyles;
