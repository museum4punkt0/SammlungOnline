import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      margin: 'auto',
      minWidth: 250,
      height: 250,
      padding: 16,
      borderRadius: 0,
      backgroundColor: theme.palette.secondary.main,
      boxShadow: 'none',
      cursor: 'pointer',
      '&:hover': {
        '& h3': {
          textDecoration: 'underline',
        },
        '& svg': {
          fill: theme.palette.secondary.main,
        },
      },
    },
    cardContent: {},
    cardTitleArea: {
      display: 'flex',
      width: '100%',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
    },
    cardTitleWrapper: {
      display: 'flex',
      flexGrow: 2,
      justifyContent: 'space-between',
      alignItems: 'center',
      '& :focus-visible': {
        outline: '4px solid',
        boxShadow: 'none',
      },
    },
    cardTitleTypo: {
      [theme.breakpoints.down('xs')]: {
        fontSize: '1.7rem',
      },
      '&:hover, & :hover': {
        textDecoration: 'undeline',
      },
    },
    cardSubtitleTypo: {
      paddingTop: 10,
    },
  }),
);

export default useStyles;
