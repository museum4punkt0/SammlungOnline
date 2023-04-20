import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      flexGrow: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingBottom: 12,
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'flex-start',
      },
    },
    shrink: {
      maxWidth: '100%',
      flexBasis: 'auto',
      [theme.breakpoints.up('sm')]: {
        flex: '0 0 auto',
      },
    },
    root: {
      fontWeight: 'bold',
      letterSpacing: '20px',
    },
    disabled: {
      opacity: 0.2,
    },
    focus: {
      '&:focus-visible': {
        outline: `4px solid !important`,
      },
    },
    switchBase: {
      color: '#000000',
      '&$checked': {
        color: '#79a9f5',
      },
      '&$checked + $track': {
        backgroundColor: theme.palette.secondary.light,
        opacity: 1,
      },
    },
    checked: {},
    track: {
      backgroundColor: theme.palette.secondary.light,
      border: `2px solid ${theme.palette.primary.main}`,
      opacity: 1,
    },
  }),
);

export default useStyles;
