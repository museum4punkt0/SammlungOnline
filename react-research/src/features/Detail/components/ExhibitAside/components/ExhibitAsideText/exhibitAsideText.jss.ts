import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      marginTop: 15,
      fontWeight: 'bold',
      color: theme.palette.secondary.contrastText,
    },
    container: {
      color: theme.palette.secondary.contrastText,
    },
  }),
);

export default useStyles;
