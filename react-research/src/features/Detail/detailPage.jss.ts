import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    wrapper: {
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
    },
    content: {
      flex: 1,
      margin: '0 auto',
      height: '100%',
      maxWidth: 1280,
      width: '100%',
      padding: '0 10px',
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.secondary.contrastText,
      transition: theme.transitions.create(['height'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    navigation: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingBottom: '10px',
    },
    backButton: {
      textTransform: 'uppercase',
      color: 'inherit',
    },
    objectActions: {
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    navText: {
      fontSize: 11,
      marginTop: 16,
    },
    iconButton: {
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
      padding: 0,
    },
    hideOnDesktop: {
      [theme.breakpoints.up('sm')]: {
        display: 'none !important',
      },
    },
    imageZoom: {
      color: theme.palette.text.primary,
    },
  });
});

export default useStyles;
