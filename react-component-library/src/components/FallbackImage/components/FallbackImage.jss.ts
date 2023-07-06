import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
  return createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      color: 'inherit',
      border: `2px solid`,
      height: '100%',
      width: '100%',
      margin: '0 auto',
      padding: '0 1rem',
      flexWrap: 'wrap',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    },
    headline: {
      color: 'inherit',
      textTransform: 'uppercase',
      marginBottom: '0.5rem',
    },
    secondary: {
      fontSize: '.9rem',
    },
  });
});

export default useStyles;
