import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
  return createStyles({
    card: {
      height: 320,
      background: 'none',
      boxShadow: 'none',
    },
    content: {
      '&:focus-within': {
        outline: '4px solid #000',
        outlineOffset: -4,
      },
    },
    caption: {
      display: '-webkit-box',
      color: '#000',
      padding: '0rem',
      lineClamp: 3,
      boxOrient: 'vertical',
      overflow: 'hidden',
      marginTop: '1rem',
      textAlign: 'center',
      width: '100%',
    },
    container: {
      display: 'block',
      width: '100%',
      maxWidth: '200px',
      '&:focus-visible': {
        outline: 'none',
      },
    },
  });
});

export default useStyles;
