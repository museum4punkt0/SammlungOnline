import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import icon from '../assets/external-white.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      padding: '1rem',
    },
    footerGrid: {
      paddingTop: '1rem',
      paddingBottom: '1rem',
    },
    link: {},
    linkExternal: {
      position: 'relative',
      '& span': {
        background: `url(${icon}) no-repeat right`,
        backgroundSize: '10px 10px',
        paddingRight: '1rem',
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
  }),
);

export default useStyles;
