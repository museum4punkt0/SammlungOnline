import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingBottom: '2rem',
    },
    capitalize: { textTransform: 'capitalize' },
    verticalLine: {
      [theme.breakpoints.up('lg')]: {
        position: 'relative',
        '&::before': {
          content: "''",
          display: 'block',
          height: '50%',
          width: 2,
          position: 'absolute',
          left: '50%',
          top: '1rem',
          backgroundColor: 'black',
        },
      },
    },
    content: {
      backgroundColor: theme.palette.grey[300],
    },
    downloadDialogTitle: {
      color: theme.palette.secondary.contrastText,
      textAlign: 'center',
      paddingBottom: '1rem',
    },
    downloadDialogDownloadLink: {
      color: theme.palette.secondary.contrastText,
    },
    downloadImageButton: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    downloadDialogCloseButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
    },
    downloadDialogContentTypo: {
      color: theme.palette.secondary.contrastText,
      padding: '1rem 0',
      minHeight: '4rem',
    },
  }),
);

export default useStyles;
