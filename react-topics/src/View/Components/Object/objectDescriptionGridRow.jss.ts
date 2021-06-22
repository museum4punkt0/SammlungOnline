import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        contrastText: {
            color: theme.palette.text.secondary,
        },
        boldText: {
            fontWeight: 'bold',
        },
        rowColored: {
            backgroundColor: '#e8e8e8',
        },
        cell: {
            padding: 12,
        },
    }),
);

export default useStyles;
