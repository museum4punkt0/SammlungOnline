import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
  return createStyles({
    card: {
      maxHeight: 320,
      height: '100%',
      background: 'none',
      boxShadow: 'none',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      flex: 1,
      marginRight: '.5rem',

      '&:focus-visible': {
        outline: 'none',
      },
    },

    content: {
      '&:focus-within': {
        outline: '4px solid currentColor',
        outlineOffset: -4,
      },
    },

    caption: {
      display: '-webkit-box',
      color: 'currentColor',
      padding: '1rem',
      lineClamp: 3,
      boxOrient: 'vertical',
      overflow: 'hidden',
      marginTop: '0 .5rem',
      textAlign: 'center',
      width: '100%',
    },

    // container: {
    //   display: 'block',
    //   width: '100%',
    //   height: '100%',
    //   minWidth: '200px',
    //   border: 'solid red',

    //   '&:focus-visible': {
    //     outline: 'none',
    //   },
    // },
  });
});

export default useStyles;
