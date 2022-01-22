import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => {
  const lgHeight = 330;
  const mdHeight = 220;
  const xsHeight = 395;

  return createStyles({
    card: {
      //margin: '0 1rem',
      minWidth: '250px',
      height: xsHeight,

      borderRadius: 0,
      backgroundColor: theme.palette.secondary.main,
      boxShadow: 'none',
      textAlign: 'left',
      [theme.breakpoints.up('sm')]: {
        height: mdHeight,
      },

      [theme.breakpoints.up('lg')]: {
        height: lgHeight,
        // width: '566px',
      },
    },
    cardMedia: {
      minWidth: '250px',

      backgroundPosition: 'center center',
      backgroundSize: 'cover',
      cursor: 'pointer',
      [theme.breakpoints.only('xs')]: {
        height: xsHeight,
      },
      [theme.breakpoints.up('sm')]: {
        height: mdHeight,
      },
      [theme.breakpoints.up('lg')]: {
        height: lgHeight,
      },
    },
    cardContent: {
      textAlign: 'left',
      position: 'relative',
      top: -Math.abs(xsHeight),
      height: xsHeight,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',

      [theme.breakpoints.up('sm')]: {
        height: lgHeight,
        top: -Math.abs(mdHeight),
      },
      [theme.breakpoints.up('lg')]: {
        height: lgHeight,
        top: -Math.abs(lgHeight),
      },
      '& *': {
        color: theme.palette.primary.contrastText,
      },
    },
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
    },
    cardTitleArea: {
      display: 'flex',
      alignItems: 'flex-start',
      flexDirection: 'column',
      width: '100%',
      paddingTop: '15px',
      [theme.breakpoints.up('sm')]: {
        width: '100%',
      },
      [theme.breakpoints.up('lg')]: {
        width: '66%',
      },
    },
    cardTitleTypo: {},
    cardSubtitleTypo: {
      paddingTop: '10px',
    },
    cardCountArea: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    cardDiscoverButton: {
      padding: 0,
    },
    cardDiscoverButtonTypo: {
      textTransform: 'uppercase',
    },
  });
});

export default useStyles;
