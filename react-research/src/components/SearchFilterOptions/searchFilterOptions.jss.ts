import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      margin: '20px 10px 10px 5px',
      width: '100%',
    },

    containerHeader: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      marginBottom: '.25rem',
    },

    headline: {
      marginRight: '.5rem',
    },
  }),
);

export default useStyles;
