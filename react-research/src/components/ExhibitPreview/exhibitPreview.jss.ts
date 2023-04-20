import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
const navHeight = 150;
const navigationHeight = 160;
const maxVh = navHeight + navigationHeight;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: 1280,
      paddingBottom: '1rem',
      margin: '0 auto',
      minHeight: `calc(95vh - ${navHeight}px)`,
      height: `calc(95vh - ${navHeight}px)`,
      [theme.breakpoints.up(375)]: {
        minHeight: `calc(95vh - ${maxVh}px)`,
        height: `calc(95vh - ${maxVh}px)`,
      },
    },
    svg: {
      marginLeft: '.25rem',
    },

    imgContainer: {
      position: 'relative',
      width: '100%',
      // minHeight: `80vh`,
      height: `100%`,
      maxHeight: '1024px',
      maxWidth: '1024px',
      margin: '0 auto',
    },

    imgFlexWrapper: {
      display: 'flex',
      width: '100%',
      overflowX: 'auto',
      minHeight: '124px !important',
    },

    imgFlexWrapperInner: {
      display: 'flex',
      width: 'auto',
      margin: '0 auto',

      '& > div': {
        height: '100px !important',
        minWidth: '100px !important',
        margin: 7,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        background: '#00000029',
        cursor: 'pointer',
        opacity: 0.7,

        '&:hover': {
          opacity: 1,
        },

        '&.active': {
          opacity: 1,
        },

        '&.selected': {
          border: 'solid 2px',
        },
      },
    },

    imgAside: {
      display: 'flex',
      // 60px based on the 30px padding of parent
      maxWidth: 'calc(100vw - 60px)',
      flexDirection: 'column',
      [theme.breakpoints.up('md')]: {
        maxHeight: '55vh',
        width: 200,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
      },
    },

    pictureCreditsWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginTop: '1rem',
    },

    pictureCredits: {
      display: 'block',
      flexWrap: 'wrap',
      width: '100%',
      paddingRight: '.125rem',
      color: theme.palette.secondary.contrastText,
      textAlign: 'center',
    },

    license: {
      paddingLeft: '6px',
      textDecoration: 'underline',
      fontWeight: 400,
      fontFamily: 'ClanOTNarrow, Arial',
      whiteSpace: 'nowrap',
    },
  }),
);

export default useStyles;
