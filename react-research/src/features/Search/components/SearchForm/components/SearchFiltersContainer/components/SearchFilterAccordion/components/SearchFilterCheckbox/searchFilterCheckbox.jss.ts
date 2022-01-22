import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    focus: {
      '&:focus-within': {
        outline: `4px solid ${theme.palette.secondary.main}`,
      },
    },
  }),
);

export default useStyles;
