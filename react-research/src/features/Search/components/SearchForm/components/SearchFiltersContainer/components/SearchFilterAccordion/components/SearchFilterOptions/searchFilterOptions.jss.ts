import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      margin: '20px 10px 10px 5px',
      width: '100%',
    },
    headline: {
      marginBottom: 10,
      '& span': {
        fontWeight: 'bold',
      },
    },
  }),
);

export default useStyles;
