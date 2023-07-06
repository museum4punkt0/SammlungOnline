import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    toggleButton: {
      margin: 0,
      padding: '0.4375rem 1rem 0.3125rem',
      border: `1px solid #0f0900`,
      borderRadius: 0,
      color: '#0f0900',
      textTransform: 'none',
      fontFamily: 'ClanOTNarrow, Arial',
      fontSize: '1rem !important',
      lineHeight: '1.375rem !important',
      marginRight: '0.75rem !important',
      letterSpacing: '1.28px !important',
      marginBottom: '0.75rem !important',
      background: 'initial !important',
      fontWeight: 'bold',

      '&:hover': {
        textDecoration: 'none !important',
        opacity: 1,
        outline: 'solid 1px #0f0900',
      },

      '&.Mui-selected, &.Mui-selected:hover': {
        color: '#fff !important',
        background: '#0f0900 !important',
      },

      '&.Mui-disabled': {
        border: '1px solid transparent',
        color: '#666666 !important',
        background: '#d3d3d3 !important',
      },

      '&.Mui-disabled:hover': {
        textDecoration: 'none !important',
        opacity: '1 !important',
        outline: 'solid 1px transparent',
      },
    },
  }),
);

export default useStyles;
