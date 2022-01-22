import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    content: {
      paddingBottom: 60,
      paddingLeft: 20,
      paddingRight: 20,
    }
  }),
);

export default useStyles;
