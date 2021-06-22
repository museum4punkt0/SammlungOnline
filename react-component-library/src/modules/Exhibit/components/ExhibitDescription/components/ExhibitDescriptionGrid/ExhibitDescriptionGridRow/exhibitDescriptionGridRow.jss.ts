import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    title: {
      fontWeight: 'bold',
      color: theme.palette.text.secondary,
      whiteSpace: 'break-spaces',
    },
    content: {
      color: theme.palette.text.secondary,
      whiteSpace: 'break-spaces',
    },
    cell: {
      whiteSpace: 'break-spaces',
    },
    row: {
      padding: 12,
    },
  });
});

export default useStyles;
