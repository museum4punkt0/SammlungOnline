import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    advancedWrapper: {
      display: 'flex',
      flexDirection: 'column',

      '&:not(:last-of-type)': {
        marginBottom: '2rem',
      },
    },

    advancedContainer: {
      '& .MuiGrid-spacing-xs-1': {
        margin: '0 !important',
      },
    },

    headline: {
      display: 'flex',
      margin: 0,
      marginBottom: '1rem',
    },

    text: {
      margin: '1.5rem 0 0',
    },
  }),
);

export default useStyles;
