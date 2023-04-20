import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    cardWrapper: {
      display: 'flex',
      justifyContent: 'center',
      padding: '2rem 0',
    },
  }),
);

export default useStyles;
