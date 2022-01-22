import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    actionsContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
    },
  }),
);

export default useStyles;
