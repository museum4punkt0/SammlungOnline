import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    creditLine: {
      marginTop: '2rem',
      lineHeight: '1.5rem',
      fontSize: '1rem',
    },
  }),
);

export default useStyles;
