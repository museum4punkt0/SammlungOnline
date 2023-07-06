import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: theme.palette.grey[300],
      padding: '0 !important',
    },

    contentWrapper: {
      display: 'flex',
      flexWrap: 'wrap',
      padding: '1.5rem !important',
    },

    innerContent: {
      display: 'flex',
      flexDirection: 'column',

      [theme.breakpoints.up(960)]: {
        paddingRight: '1rem',
      },

      '& + &': {
        marginTop: '1.5rem !important',
        [theme.breakpoints.up(960)]: {
          marginTop: '0 !important',
          paddingLeft: '1rem',
          borderLeft: 'solid 2px',
          paddingRight: '0',
        },
      },
    },

    header: {
      display: 'flex',
      padding: '1.5rem',
    },

    title: {
      color: theme.palette.secondary.contrastText,
      textAlign: 'center',
      flex: '1',
    },

    closeButton: {
      padding: '0 !important',
      marginLeft: '.75rem',
    },

    sectionTitle: { textTransform: 'capitalize' },

    sectionRichText: {
      color: theme.palette.secondary.contrastText,
      padding: '1rem 0',
      minHeight: '4rem',
      fontFamily: 'ClanOTNarrow-News, Arial',
      height: '100%',

      '& p': {
        marginBottom: '.75rem',
      },

      '& b': {
        fontWeight: 'bold',
      },

      '& a': {
        color: theme.palette.secondary.contrastText,
        textDecoration: 'underline',
        fontWeight: 400,

        '&:hover': {
          textDecoration: 'underline',
        },

        '& svg': {
          marginLeft: '.25rem',
        },
      },
    },

    sectionButton: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '.5rem',
    },

    sectionButtonLink: {
      color: theme.palette.secondary.contrastText,
    },
  }),
);

export default useStyles;
