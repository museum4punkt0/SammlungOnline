import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            minHeight: '100vh',
            backgroundColor: theme.palette.primary.light,
        },
        headerOffset: {
            marginTop: '5.625rem',
        },

        text: {
            marginTop: '6.25rem',
            paddingBottom: '6.25rem',
            paddingRight: '1rem',
            paddingLeft: '1rem',
            minHeight: '100vh',
            maxWidth: '62rem',
        },

        footerWrapper: {
            backgroundColor: theme.palette.primary.main,
        },
        iframe: {
            border: 0,
            height: 200,
            width: '100%',
        },
    }),
);

export default useStyles;
