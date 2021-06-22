import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            maxWidth: 1280,
            padding: 30,
            margin: 'auto',
        },
        separator: {
            height: 3,
            backgroundColor: theme.palette.primary.main,
        },
        titleGrid: {
            paddingTop: 24,
        },
        contentGrid: {
            paddingTop: 24,
        },
        largeText: {
            lineHeight: 1.5,
        },
        objectActions: {
            [theme.breakpoints.down('sm')]: {
                display: 'none',
            },
        },
        contrastText: {
            color: theme.palette.text.secondary,
            textTransform: 'none',
        },
        boldText: {
            fontWeight: 'bold',
        },
    }),
);

export default useStyles;
