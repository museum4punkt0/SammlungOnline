import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      paddingTop: 45,
      paddingBottom: 60,
      paddingLeft: 10,
      paddingRight: 10,
    },
    contentWrapper: {
      maxWidth: 1280,
      margin: 'auto',
    },
    horizontalLine: {
      marginTop: 10,
      height: 6,
    },

    textArea: {
      marginTop: 40,
      padding: '45px 30px 30px 30px',
    },
    textContent: {
      marginTop: 30,
      [theme.breakpoints.up('lg')]: {
        maxWidth: '50%',
      },
    },
    buttonArea: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    buttonLink: {
      textTransform: 'uppercase',
      fontSize: '1.125rem',
      fontWeight: 'bold',
      '&:hover': {
        textDecoration: 'underline',
        '&*': {
          color: 'white',
        },
      },
    },
    buttonLinkArrow: {
      marginLeft: 10,
      color: 'white',
    },
  }),
);

export default useStyles;
