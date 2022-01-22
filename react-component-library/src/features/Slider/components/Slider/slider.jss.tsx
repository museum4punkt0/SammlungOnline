import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    sliderContainer: {
      // height: '35vh',
      // maxWidth: 1280 + 46 + 46,
      margin: '0 auto',
    },
    sliderContent: {
      transition: 'transform cubic-bezier(0.4, 0, 0.2, 1) 750',
      marginLeft: '0',
      marginRight: '0',
      display: 'flex',
      height: '100%',
      padding: 0,
    },
    dotWrapper: {
      margin: '2rem',
    },
    dot: {
      transition: theme.transitions.create(['background-color'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.standard,
      }),
      padding: theme.spacing(1),
      marginRight: theme.spacing(3),
      borderRadius: '50%',
      backgroundColor: theme.palette.primary.contrastText,
      position: 'relative',
      '&:focus': {},
      '&:hover': {},
    },
    dotActive: {
      '&:before': {
        content: 'no-open-quote',
        backgroundColor: theme.palette.primary.contrastText,
        padding: theme.spacing(2),
        marginRight: theme.spacing(3),
        borderRadius: '50%',
        opacity: '0.5',
        position: 'absolute',
        top: '-50%',
        left: '-50%',
      },
    },
  });
});

export default useStyles;
