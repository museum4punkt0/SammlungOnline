import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            maxWidth: 1280,
            padding: 30,
            margin: 'auto',
            display: 'flex',
            width: '100vw',
            flexWrap: 'wrap',
            [theme.breakpoints.up('md')]: {
                justifyContent: 'flex-end',
            },
        },
        imgContainer: {
            width: '100%',
            height: '55vh',
            [theme.breakpoints.up('md')]: {
                flex: 1,
            },
        },
        imgFrame: {
            width: '100%',
            height: '100%',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            [theme.breakpoints.up('md')]: {
                flex: 1,
            },
        },
        imgPreviewContainer: {
            display: 'flex',
            overflowX: 'scroll',
            [theme.breakpoints.up('md')]: {
                flexDirection: 'column',
                maxHeight: '45vh',
                maxWidth: 200,
                overflowX: 'hidden',
                overflowY: 'scroll',
                alignItems: 'flex-end',
            },
        },
        imgFlexWrapper: {
            display: 'flex',
            flexWrap: 'nowrap',
            flexDirection: 'row',
            [theme.breakpoints.up('md')]: {
                flexDirection: 'column',
            },
        },
        imgPreview: {
            height: 86,
            width: 86,
            margin: 7,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            cursor: 'pointer',
            opacity: 0.7,
            '&:hover': {
                opacity: 1,
            },
        },
        imgAside: {
            display: 'flex',
            // 60px based on the 30px padding of parent
            maxWidth: 'calc(100vw - 60px)',
            flexDirection: 'column',
            [theme.breakpoints.up('md')]: {
                maxHeight: '55vh',
                width: 200,
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
            },
        },
        pictureCredits: {
            color: theme.palette.secondary.contrastText,
            [theme.breakpoints.up('lg')]: {
                paddingTop: 10,
            },
            textAlign: 'center',
            width: '100%',
            display: 'block',
        },
        license: {
            paddingLeft: '6px',
        },
    }),
);

export default useStyles;
