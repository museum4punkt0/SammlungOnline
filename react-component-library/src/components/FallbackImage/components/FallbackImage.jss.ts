import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    container: {
      display: 'flex',
      color: theme.palette.primary.main,
      border: `2px solid ${theme.palette.primary.main}`,
      height: '100%',
      width: '100%',
      margin: '0 auto',
      padding: '0 1rem',
      flexWrap: 'wrap',
      alignContent: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    },
    headline: {
      textTransform: 'uppercase',
    },
  });
});

export default useStyles;
