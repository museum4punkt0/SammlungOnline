import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    link: {
      textDecoration: 'none',
      color: 'inherit',
      fontFamily: 'ClanOTNarrow, Arial',
      cursor: 'pointer',
      '&:focus': {
        outline: `4px solid`,
      },
    },
    linkText: {
      textTransform: 'uppercase',
      color: 'inherit',
    },
    navigationTextTypography: {
      fontSize: 11,
      color: 'black',
    },
    navText: {
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: 2,
      height: 45,
      maxWidth: 200,
      marginTop: 16,
      padding: 0,
      overflow: 'hidden',
    },
    iconButton: {
      padding: 0,
      outlineOffset: '4px',
    },
  }),
);

export default useStyles;
