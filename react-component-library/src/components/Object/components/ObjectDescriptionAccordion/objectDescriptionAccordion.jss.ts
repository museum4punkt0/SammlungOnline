import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    spacingTop: {
      marginTop: 50,
    },
    accordionWrapper: {
      borderTop: 'solid 3px',
      borderBottom: 'solid 3px',
    },
  }),
);

export default useStyles;
