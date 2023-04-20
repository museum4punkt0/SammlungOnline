import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => {
  const lgHeight = 330;
  const mdHeight = 220;
  const xsHeight = 395;

  return createStyles({
    card: {
      minWidth: '250px',
      //maxWidth: 600,
      height: xsHeight,
      width: '100%',
      cursor: 'pointer',
      borderRadius: 0,
      backgroundColor: theme.palette.secondary.main,
      boxShadow: 'none',
      textAlign: 'left',
      marginRight: '.5rem',
      [theme.breakpoints.up('sm')]: {
        height: mdHeight,
      },
      [theme.breakpoints.up('lg')]: {
        height: lgHeight,
      },
    },
    cardInner: {
      height: '100%',
      position: 'relative',
    },
    cardMedia: {
      minWidth: '250px',
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
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
      maxHeight: '100%',
      // top: -Math.abs(xsHeight),
      height: xsHeight,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      textDecoration: 'none',

      '&:hover': {
        '& button span': {
          textDecoration: 'underline',
        },
      },
      [theme.breakpoints.up('sm')]: {
        height: lgHeight,
        // top: -Math.abs(mdHeight),
      },
      [theme.breakpoints.up('lg')]: {
        height: lgHeight,
        // top: -Math.abs(lgHeight),
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
      maxHeight: '100%',
      overflow: 'hidden',
      overflowY: 'scroll',
      [theme.breakpoints.up('sm')]: {
        width: '100%',
      },
      [theme.breakpoints.up('lg')]: {
        width: '66%',
      },
    },
    cardTitleTypo: {
      textTransform: 'uppercase',
    },
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
      paddingLeft: '4px',
      '&:focus-visible': {
        outline: `4px solid #fff !important`,
        boxShadow: '0px 0px',
      },
    },
    cardDiscoverButtonTypo: {
      textTransform: 'uppercase',
    },
  });
});

export default useStyles;
