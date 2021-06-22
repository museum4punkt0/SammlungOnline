import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => {
    const lgHeight = 330;
    const mdHeight = 220;
    const xsHeight = 395;

    return createStyles({
        card: {
            minWidth: '250px',
            height: xsHeight,

            borderRadius: 0,
            backgroundColor: theme.palette.secondary.main,
            boxShadow: 'none',
            textAlign: 'left',
            [theme.breakpoints.up('sm')]: {
                height: mdHeight,
            },

            [theme.breakpoints.up('lg')]: {
                height: lgHeight,
            },
        },
        cardMedia: {
            minWidth: '250px',

            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            cursor: 'pointer',
            [theme.breakpoints.only('xs')]: {
                height: xsHeight,
            },
            [theme.breakpoints.up('sm')]: {
                height: mdHeight,
            },
            [theme.breakpoints.up('lg')]: {
                height: lgHeight,
            },
        },
        cardContent: {
            textAlign: 'left',
            position: 'relative',
            top: -Math.abs(xsHeight),
            height: xsHeight,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',

            [theme.breakpoints.up('sm')]: {
                height: lgHeight,
                top: -Math.abs(mdHeight),
            },
            [theme.breakpoints.up('lg')]: {
                height: lgHeight,
                top: -Math.abs(lgHeight),
            },
            '& *': {
                color: theme.palette.primary.contrastText,
            },
        },
        cardHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
        },
        cardTitleArea: {
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
            width: '100%',
            paddingTop: '15px',
            [theme.breakpoints.up('sm')]: {
                width: '100%',
            },
            [theme.breakpoints.up('lg')]: {
                width: '66%',
            },
        },
        cardTitleTypo: {
            [theme.breakpoints.down('md')]: {
                fontSize: '1.4rem',
            },
        },
        cardSubtitleTypo: {
            paddingTop: '10px',
            [theme.breakpoints.down('md')]: {
                display: '-webkit-box',
                lineClamp: 5,
                boxOrient: 'vertical',
                overflow: 'hidden',
            },
        },
        cardCountArea: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        cardDiscoverButton: {
            padding: 0,
            '&:hover': { textDecoration: 'underline' },
            '&:focus-visible': {
                outline: '1px solid #000',
                boxShadow: '1px 1px 2px #d3d3d3, -1px -1px 2px #ededed',
            },
        },
        cardDiscoverButtonTypo: {
            textTransform: 'uppercase',
        },
        link: {
            cursor: 'pointer',
        },
    });
});

export default useStyles;
