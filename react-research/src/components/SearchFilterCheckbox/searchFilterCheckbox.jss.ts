import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    focus: {
      '&:focus-within': {
        outline: `4px solid #79a9f5`,
      },

      '& .MuiTypography-body1': {
        fontSize: '1rem',
        fontFamily: `ClanOTNarrow-News, Arial`,
      },
    },
  }),
);

export default useStyles;
