import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      transition: theme.transitions.create(['height'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.enteringScreen,
      }),

      // backgroundColor: theme.palette.primary.main,
      backgroundColor: '#feffe4',
    },

    gridContainer: {
      maxWidth: '1312px',
      margin: '0 auto',
      width: '100%',
    },
    titleGridItem: {
      display: 'block',
    },
    titleArrowButton: {
      //color: theme.palette.primary.contrastText,
      color: 'black',
    },
    buttonTitle: {
      '& > span': {
        display: 'block',
      },
    },
    titleButton: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      textAlign: 'left',
      color: 'black',
    },
    titleButtonTypo: {
      //color: theme.palette.primary.contrastText,
      color: 'black',
      fontSize: '1.25rem',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  }),
);

export default useStyles;
