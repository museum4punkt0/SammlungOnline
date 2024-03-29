import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    extraPadding: {
      paddingLeft: 10,
      paddingRight: 10,
      border: 'solid red',
    },
  }),
);

export default useStyles;
