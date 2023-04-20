import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      // height: '95vh',

      [theme.breakpoints.up('sm')]: {
        height: '54rem',
      },
    },
    subtitle: {
      color: '#fff',
    },
    title: {
      color: '#f25b5b',
    },
    text: {
      color: '#fff',
    },
  }),
);

export default useStyles;
