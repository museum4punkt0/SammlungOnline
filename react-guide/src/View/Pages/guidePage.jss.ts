import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            backgroundColor: theme.palette.primary.light,
        },
        slider: {
            // height: '95vh',
            [theme.breakpoints.up('sm')]: {
                height: '80vh',
            },
        },
        slideContentWrapper: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            margin: 'auto',
            height: '100%',
            maxWidth: '1280px',
            width: '100%',
        },
        slideContent: {
            padding: '56px',
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '75%',
            },
            [theme.breakpoints.up('lg')]: {
                padding: 0,
                width: '40%',
            },
        },
        slideContentSubtitle: {
            color: theme.palette.primary.contrastText,
            paddingTop: 10,
        },
        slideTitle: {
            color: theme.palette.secondary.main,
        },


        guideDescription: {

        },

        testFiller: {
            width: '100%',
            height: '100rem'
        },



    }),
);

export default useStyles;