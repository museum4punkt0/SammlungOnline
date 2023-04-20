import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import icon from '../assets/external-white.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sectionWrapper: {
      background: '#0F0900',
      paddingBottom: '3.75rem',
      paddingLeft: '1rem',
      paddingRight: '1rem',
      [theme.breakpoints.up(500)]: {
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
      },
      [theme.breakpoints.up(678)]: {
        paddingLeft: '2rem',
        paddingRight: '2rem',
      },
      [theme.breakpoints.up(1024)]: {
        paddingLeft: '3rem',
        paddingRight: '3rem',
      },
      [theme.breakpoints.up('lg')]: {
        paddingLeft: '4rem',
        paddingRight: '4rem',
      },
    },
    footerGrid: {
      paddingTop: '3rem',
      paddingBottom: '3rem',
    },
    link: {
      marginBottom: '1rem',
    },
    linkExternal: {
      marginBottom: '1rem',
      position: 'relative',
      '& span': {
        background: `url(${icon}) no-repeat right`,
        backgroundSize: '0.875rem',
        paddingRight: '1.5rem',
      },
    },
    footerCard: {
      display: 'inline-grid',
      border: 'none',
      borderRadius: 0,
      boxShadow: 'none',
      backgroundColor: 'transparent',
      margin: '0 auto',
      padding: '0.75rem 0',
      color: theme.palette.primary.contrastText,
    },

    maxWidth: {
      width: '100%',
      maxWidth: 1280,
      margin: '0 auto',
    },
  }),
);

export default useStyles;
