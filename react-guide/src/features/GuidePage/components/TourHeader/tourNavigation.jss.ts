import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backButtonWrapper: {
      maxWidth: 1280,
      margin: '0 auto',
      //paddingLeft: 16,
      //paddingRight: 16,
      display: 'flex',
      justifyContent: 'space-between',
    },
    backButton: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      color: 'inherit',
      textTransform: 'uppercase',
      padding: '0',
      width: '100%',
      '&:hover': {
        background: 'none',
        '& span': {
          textDecoration: 'underline',
          textDecorationColor: theme.palette.primary.main,
        },
        '& svg': {
          color: theme.palette.primary.dark,
        },
      },
    },
    linkText: {
      lineHeight: '1.2rem',
      textTransform: 'uppercase',
      color: theme.palette.primary.main,
    },
    content: {
      maxWidth: '50rem',
      width: '100%',
    },
    headerTitle: {
      width: '100%',
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
    iconHover: {
      '&:hover': {
        color: theme.palette.primary.dark,
      },
    },
  }),
);

export default useStyles;
