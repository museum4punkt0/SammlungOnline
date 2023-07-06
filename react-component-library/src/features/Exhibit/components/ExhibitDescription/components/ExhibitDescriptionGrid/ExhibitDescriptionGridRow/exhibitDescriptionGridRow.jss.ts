import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    title: {
      fontWeight: 'bold',
      color: theme.palette.text.secondary,
      whiteSpace: 'break-spaces',
    },
    button: {
      color: theme.palette.text.secondary,
      whiteSpace: 'break-spaces',
      wordBreak: 'break-word',
      fontWeight: 400,
      borderRadius: 0,
      textTransform: 'inherit',
      padding: 0,
      fontSize: 'inherit',
    },
    content: {
      color: theme.palette.text.secondary,
      whiteSpace: 'break-spaces',
      wordBreak: 'break-word',
      fontWeight: 400,
      lineHeight: '1.75rem !important',

      '& a': {
        color: theme.palette.text.secondary,
      },
      '& + &': {
        marginTop: '1rem',
      },
      ' a': {
        color: theme.palette.text.secondary,
      },
    },
    contentLink: {
      color: theme.palette.text.secondary,
      whiteSpace: 'break-spaces',
      wordBreak: 'break-word',
      fontWeight: 400,
      textDecoration: 'underline',

      '&:not(:first-of-type)': {
        marginTop: '.5rem',
      },
    },
    cell: {
      display: 'flex',
      justifyContent: 'space-between',
      whiteSpace: 'break-spaces',
      paddingRight: '1.5rem',

      [theme.breakpoints.down(600)]: {
        paddingRight: '0',
      },
    },

    cellLink: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'self-start',
      justifyContent: 'center',
      whiteSpace: 'break-spaces',
    },

    row: {
      padding: 12,
    },
  });
});

export default useStyles;
