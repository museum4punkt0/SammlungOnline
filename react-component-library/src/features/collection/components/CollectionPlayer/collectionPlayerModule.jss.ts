import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    contentWrapper: {
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      [theme.breakpoints.up('sm')]: {
        alignItems: 'center',
      },
    },
    content: {
      display: 'block',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      maxWidth: 1280,
      width: '100%',
      height: '100%',
      [theme.breakpoints.up('sm')]: {
        position: 'relative',
        display: 'flex',
      },

      '&:after': {
        clear: 'both',
      },
    },
    backToTopicsButtonArea: {
      position: 'relative',
      top: 0,
      left: 0,
      [theme.breakpoints.up('sm')]: {
        position: 'absolute',
      },
    },
    backToTopicsTypo: {
      textTransform: 'uppercase',
    },
    descriptionArea: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      padding: 15,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      height: '100%',
      [theme.breakpoints.up('sm')]: {
        height: 'auto',
        background: 'none !important',
        maxWidth: 470,
      },
      [`${theme.breakpoints.down('sm')} and (orientation: landscape)`]: {
        paddingTop: 48,
      },
    },
    title: {},
    imageContainer: {
      display: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
      },
    },
    image: {
      maxHeight: 'calc(80vh - 150px)',
      maxWidth: '45vw',
      [theme.breakpoints.up('lg')]: {
        maxWidth: 750,
      },
    },
    playButton: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 35,
      width: 205,
      height: 58,
      margin: '25px 25px 25px 0px',
      cursor: 'pointer',
      backgroundColor: theme.palette.text.hint,
    },
    playButtonTypo: {
      color: theme.palette.text.secondary,
      textTransform: 'uppercase',
    },
  }),
);

export default useStyles;
