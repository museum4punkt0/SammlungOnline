import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    contentWrapper: {
      maxWidth: '1280px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: '.75rem 0',
    },
    flipPagesAreaInside: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    flipPagesArea: {
      [theme.breakpoints.up('lg')]: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      '& .MuiButtonBase-root': {
        padding: 0,
      },
    },
    flipViewArea: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',

      '& .MuiButtonBase-root': {
        marginRight: -12,

        '&:hover svg': {
          color: '#79a9f5',
        },
      },
    },
    pagesTypo: {
      color: theme.palette.text.secondary,
      padding: '0 35px',
    },
    pageCount: {
      color: theme.palette.text.secondary,
      paddingTop: 10,
      [theme.breakpoints.up('lg')]: {
        padding: '0 35px',
      },
    },
  }),
);

export default useStyles;
