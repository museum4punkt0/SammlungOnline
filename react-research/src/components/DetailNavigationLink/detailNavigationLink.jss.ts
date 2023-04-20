import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    link: {
      textDecoration: 'none',
      display: 'block',
      color: 'inherit',
      fontFamily: 'ClanOTNarrow, Arial',
      cursor: 'pointer',
      outlineOffset: '2px',
      '&:focus': {
        outline: `4px solid`,
      },
    },

    iconButton: {
      display: 'flex',
      flexDirection: 'column',
      padding: 0,
      '& .MuiIconButton-label': {
        alignItems: 'flex-start !important',
      },
    },

    iconButtonContainer: {
      display: 'flex',
      flexDirection: 'column',
    },

    linkText: {
      textTransform: 'none',
      color: 'inherit',
      fontSize: '.75rem',
      marginTop: '0.1875rem',
    },

    infoTextWrapper: {
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: 2,
      height: 40,
      maxWidth: 200,
      marginTop: '.125rem',
      padding: 0,
      overflow: 'hidden',
    },

    infoText: {
      lineHeight: '1.35rem',
      color: 'inherit',
      fontSize: '.7rem',
    },
  }),
);

export default useStyles;
