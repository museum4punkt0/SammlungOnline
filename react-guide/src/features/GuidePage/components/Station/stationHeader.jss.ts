import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      maxWidth: '50rem',
      width: '100%',
    },
    headerTitle: {
      width: '100%',
    },
    divider: {
      height: 6,
      marginBottom: '1rem',
      backgroundColor: theme.palette.secondary.dark,
    },
    roomHeader: {
      backgroundColor: theme.palette.secondary.dark,
    },
  }),
);

export default useStyles;
