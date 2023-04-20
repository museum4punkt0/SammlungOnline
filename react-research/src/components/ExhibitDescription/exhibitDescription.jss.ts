import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxWidth: 1280,
      margin: '0 auto',
    },

    separator: {
      height: 3,
      marginBottom: '1rem',
      backgroundColor: theme.palette.primary.main,
    },

    contentGrid: {
      padding: '2rem 0',
    },
    titleContainer: {
      minHeight: '104px',
    },

    title: {
      color: theme.palette.text.secondary,
      marginBottom: '.5rem',
    },

    titleSecond: {
      color: theme.palette.text.secondary,
      fontFamily: 'GTWalsheimPro-Bold, Arial',
      '&:not(:last-of-type)': {
        marginBottom: '.25rem',
      },
    },

    actions: {
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
  }),
);

export default useStyles;
