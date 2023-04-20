import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
    },

    moduleContent: {
      minHeight: 240,
      width: '100%',
      height: '100%',
      position: 'relative',
    },

    breadcrumb: {
      marginBottom: '1rem',
      marginTop: '.5rem',
      fontWeight: 600,

      '& a': {
        cursor: 'pointer',
        color: 'inherit',
      },
    },

    sectionWrapper: {
      paddingLeft: '1rem',
      paddingRight: '1rem',
      paddingBottom: '4rem',

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

    sectionWrapperInner: {
      maxWidth: 1280,
      margin: '0 auto',
      width: '100%',
    },
  }),
);

export default useStyles;
