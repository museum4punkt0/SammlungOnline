import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    navigation: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingBottom: '.5rem',
      maxWidth: 1280,
      margin: '0 auto',
      flexDirection: 'column',
    },

    svgContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
    },
    svgLink: {
      color: '#0F0900 !important',

      '& svg': {
        color: 'currentColor',
        fontSize: '1.75rem !important',
      },

      '&:hover': {
        color: '#79a9f5 !important',
      },
    },

    breadcrumb: {
      marginBottom: '1rem',
      marginTop: '.5rem',
      fontWeight: 600,
      color: 'inherit',

      '& a': {
        cursor: 'pointer',
        color: 'inherit',

        '&:focus-visible': {
          outline: `4px solid !important`,
        },
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

    overlayWrapper: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      zIndex: 2,

      '& #actions-zoom': {
        width: '100%',
        height: '100%',
        borderRadius: '0',
        color: 'transparent',

        '& span': {
          color: 'inherit',

          '& svg': {
            width: '4rem',
            height: '4rem',
          },
        },

        '&:hover': {
          color: '#FFFFFF',

          '& span': {
            color: 'inherit',

            '& svg': {
              color: 'inherit',
            },
          },
        },
      },
    },
  });
});

export default useStyles;
