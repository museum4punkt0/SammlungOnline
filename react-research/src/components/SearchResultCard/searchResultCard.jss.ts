import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useSearchResultCardStyles = makeStyles((theme: Theme) => {
  const cardHeight = 370;

  return createStyles({
    card: {
      cursor: 'pointer',
      margin: '0.5rem',
      borderRadius: 0,
      backgroundColor: theme.palette.secondary.light,
      boxShadow: 'none',
      textAlign: 'center',
      width: '100%',
      marginBottom: '2rem',
      padding: '4px',

      [theme.breakpoints.up(375)]: {
        width: '90%',
      },

      [theme.breakpoints.up(500)]: {
        width: 'calc(50% - 1rem)',
      },

      [theme.breakpoints.up(769)]: {
        width: 'calc(33.33% - 1rem)',
      },

      [theme.breakpoints.up(1024)]: {
        margin: '1rem',
        width: 'calc(33.33% - 1rem * 2)',
      },

      minHeight: cardHeight,
      '&:hover': {
        filter: 'brightness(120%)',

        '& #main-typography': {
          textDecoration: 'underline',
        },
      },
    },
    cardLink: {
      display: 'block',
      '&:focus-visible': {
        outline: `4px solid !important`,
      },
    },
    content: {
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& *': {
        color: theme.palette.primary.dark,
      },
    },

    typography: {
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: 2,
      //height: 45,
      // maxWidth: '300px',
      padding: 0,
      textAlign: 'center',
      fontWeight: 'bold',
      cursor: 'pointer',
      color: theme.palette.primary.main,
      overflow: 'hidden',
      marginBottom: '.5rem',
    },

    typographySecond: {
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: 1,
      height: 21,
      // maxWidth: '300px',
      padding: 0,
      //fontSize: '1rem',
      textAlign: 'center',
      fontWeight: 500,
      cursor: 'pointer',
      color: theme.palette.primary.main,
      overflow: 'hidden',
      marginBottom: '.5rem',
    },

    typographyLast: {
      fontFamily: 'GTWalsheimPro-Bold, Arial',
      // marginTop: '0.25rem',
      fontSize: 'inherit',
    },
  });
});
