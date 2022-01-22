import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dots: {
      transition: theme.transitions.create(['background-color'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.standard,
      }),
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      bottom: theme.spacing(2),
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
  }),
);

export default useStyles;
