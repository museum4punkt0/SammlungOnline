import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    content: {
      flex: 1,
      height: '100%',
      width: '100%',
      backgroundColor: theme.palette.secondary.light,
    },
    topicsCarousel: {
      backgroundColor: '#000000',
      padding: '2rem 1rem',
    },
    toursCarousel: {
      backgroundColor: '#d3d3d3',
      padding: '2rem 1rem',
    },
  });
});

export default useStyles;
