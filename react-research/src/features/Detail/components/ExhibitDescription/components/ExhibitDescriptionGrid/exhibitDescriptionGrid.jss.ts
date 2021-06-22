import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            '& > :nth-child(odd)': {
                backgroundColor: '#e8e8e8',
            },
        },
    }),
);

export default useStyles;
