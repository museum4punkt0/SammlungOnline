import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxWidth: 1280,
      padding: '30 0',
    },
    separator: {
      height: 3,
      marginBottom: 30,
      backgroundColor: theme.palette.primary.main,
    },
    titleGrid: {
      paddingTop: 24,
    },
    contentGrid: {
      padding: '30px 0',
    },
    title: {
      color: theme.palette.text.secondary,
      whiteSpace: 'break-spaces',
      textTransform: 'none',
      fontWeight: 'bold',
      lineHeight: 1.5,
    },
    actions: {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
  }),
);

export default useStyles;
