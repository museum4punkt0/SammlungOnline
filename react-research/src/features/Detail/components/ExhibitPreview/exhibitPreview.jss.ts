import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            justifyContent: 'space-between',
            maxWidth: 1280,
            paddingBottom: 30,
            margin: 'auto',
            flexWrap: 'wrap',
        },
        imgContainer: {
            width: '100%',
            height: '600px',
            maxWidth: '400px',
            [theme.breakpoints.down('md')]: {
                height: '600px',
            },
            [theme.breakpoints.down('sm')]: {
                height: '350px',
            },
        },
        imgPreviewContainer: {
            display: 'flex',
            alignItems: 'flex-end',
            overflowX: 'scroll',
            maxHeight: 300,
            [theme.breakpoints.up('md')]: {
                flexDirection: 'column',
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
            '& > div': {
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
                '&.active': {
                    opacity: 1,
                },
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
            display: 'block',
            width: '100%',
            color: theme.palette.secondary.contrastText,
            paddingTop: '1rem',
            textAlign: 'center',
        },
        license: {
            paddingLeft: '6px',
        },
    }),
);

export default useStyles;
