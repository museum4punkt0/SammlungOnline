import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      paddingTop: 45,
      paddingBottom: 45,
      paddingLeft: 0,
      paddingRight: 0,
    },
    standalone: {
      paddingTop: 45,
      paddingBottom: 45,
      paddingLeft: 20,
      paddingRight: 20,
    },
    contentWrapper: {
      maxWidth: 1280,
      margin: 'auto',
    },
    headlineWrapper: {
      display: 'flex',
      alignItems: 'baseline',
      flexDirection: 'column',
      fontSize: '1.6rem'
    },
    horizontalLine: {
      marginTop: 10,
      height: 6,
    },
    headlineOverride: {
      fontSize: '1.6rem'
    },
    textArea: {
      marginTop: 40,
      padding: '45px 30px 30px 30px',
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      
    },
    textContent: {
      [theme.breakpoints.up('md')]: {
        maxWidth: '70%',
      }
    },
    buttonArea: {
      display: 'flex'
    },
    buttonLink: {
      padding: '0',
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
