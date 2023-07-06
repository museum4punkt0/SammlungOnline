import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme =>
  createStyles({
    langSelector: {
      textTransform: 'uppercase',
      display: 'flex',
      justifyContent: 'center',
      flex: 1,
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
      },
    },
    selectorButtonNoHover: {
      border: 'none',
      cursor: 'pointer',
      backgroundColor: theme.palette.background.paper,
    },
    selectorButton: {
      borderRadius: '50%',
      border: 'none',
      padding: '6px',
      cursor: 'pointer',
      backgroundColor: theme.palette.background.paper,
      '&:hover': {
        color: theme.palette.background.paper,
        backgroundColor: '#0F0900',
      },
    },
    langOption: {
      margin: '.5rem',
      cursor: 'pointer',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    currentLang: {
      textDecoration: 'underline',
    },
  }),
);

export default useStyles;
