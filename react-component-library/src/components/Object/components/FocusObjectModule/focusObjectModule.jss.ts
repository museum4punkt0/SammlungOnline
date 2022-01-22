import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: 'relative',
      width: '100%',
      margin: '0 auto',
      padding: '0 70px',
      paddingTop: '52px',
      overflow: 'hidden',
      // TODO: use Theme color
      backgroundColor: '#e8fffa',
    },
    title: theme.typography.h2,
  }),
);

export default useStyles;
