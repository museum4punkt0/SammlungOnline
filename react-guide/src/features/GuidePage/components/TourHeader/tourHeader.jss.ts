import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      maxWidth: '50rem',
      width: '100%',
    },
    headerTitle: {
      width: '100%',
      color: '#f25b5b',
    },
    divider: {
      height: 5,
      backgroundColor: theme.palette.secondary.dark,
    },
    root: {
      fontWeight: 'bold',
      letterSpacing: '20px',
    },
    disabled: {
      opacity: 0.2,
    },
    switchBase: {
      color: '#000000',
      '&$checked': {
        color: theme.palette.secondary.main,
      },
      '&$checked + $track': {
        backgroundColor: theme.palette.primary.light,
        opacity: 1,
      },
    },
    checked: {},
    track: {
      backgroundColor: theme.palette.primary.light,
      border: `2px solid ${theme.palette.primary.main}`,
      opacity: 1,
    },
  }),
);

export default useStyles;
