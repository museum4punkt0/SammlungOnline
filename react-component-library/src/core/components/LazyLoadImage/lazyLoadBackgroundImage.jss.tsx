import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
  return createStyles({
    image: {
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
    loaderContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      left: 0,
      top: 0,
    },
  });
});

export default useStyles;
