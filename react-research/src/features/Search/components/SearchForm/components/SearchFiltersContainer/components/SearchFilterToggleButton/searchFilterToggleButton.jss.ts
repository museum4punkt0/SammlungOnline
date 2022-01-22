import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toggleButton: {
      margin: 0,
      padding: '2px 11px',
      border: `2px solid ${theme.palette.primary.main}`,
      borderRadius: 4,
      color: theme.palette.primary.dark,
      textTransform: 'capitalize',
      '&.Mui-selected, &.Mui-selected:hover': {
        color: theme.palette.primary.light,
        backgroundColor: theme.palette.primary.main,
      },
    },
  }),
);

export default useStyles;
