import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
    createStyles({
        actionsContainer: {
            display: 'flex',
            justifyContent: 'flex-end',
        },
    }),
);

export default useStyles;
