import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      maxWidth: '50rem',
      width: '100%',
    },
    headerTitle: {
      width: '100%',
      marginBottom: '1rem',
      color: '#f25b5b',
    },
    divider: {
      height: 5,
      backgroundColor: theme.palette.secondary.dark,
    },
    returnTopButton: {
      '&:focus-visible': {
        outlineOffset: '2px',
        outline: `4px solid ${theme.palette.primary.main}`,
        boxShadow: '0px 0px',
      },
      '&:hover': {
        textDecoration: 'underline',
        textDecorationThickness: '0.3em',
        textDecorationColor: theme.palette.primary.main,
      },
    },
  }),
);

export default useStyles;
