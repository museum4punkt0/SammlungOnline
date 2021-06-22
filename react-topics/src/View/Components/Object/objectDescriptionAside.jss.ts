import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        asideContainer: {
            '& > :nth-child(3)': {
                [theme.breakpoints.down('md')]: {
                    marginBottom: 10,
                },
            },
        },
        spacer: {
            paddingBottom: 15,
        },
        txtBold: {
            fontWeight: 'bold',
            color: theme.palette.secondary.contrastText,
        },
        contrastText: {
            color: theme.palette.secondary.contrastText,
        },
        txtElement: {
            marginTop: 15,
        },
        outboundLinks: {
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
        },
    }),
);

export default useStyles;
