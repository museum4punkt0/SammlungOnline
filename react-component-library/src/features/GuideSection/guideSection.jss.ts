import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    content: {
      paddingBottom: 60,
      paddingLeft: 20,
      paddingRight: 20,
    },
  }),
);

export default useStyles;
