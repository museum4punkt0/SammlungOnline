import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginRight: '.5rem',
      color: theme.palette.secondary.contrastText,
    },

    container: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',

      color: theme.palette.secondary.contrastText,

      '&:not(:last-of-type)': {
        marginBottom: '1rem',
      },
    },

    svg: {
      marginLeft: '.25rem',
    },

    link: {
      textDecoration: 'underline',
      width: '100%',
    },

    paragraphTwoLine: {
      fontWeight: 400,
      marginTop: '.25rem',
      // fontSize: '1rem',
      width: '100%',
    },

    paragraph: {
      fontWeight: 400,
      // fontSize: '1rem',
    },
  }),
);

export default useStyles;
