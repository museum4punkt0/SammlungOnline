import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { navHeight } from 'smb-react-components-library';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            marginTop: navHeight,
            height: '100%',
            backgroundColor: theme.palette.primary.main,
        },
        collectionPlayerHeight: {
            height: '80vh',
        },
        collectionPreviewHeight: {
            height: '80vh',
            [theme.breakpoints.down('xs')]: {
                height: 'auto',
            },
            [`${theme.breakpoints.down('sm')} and (orientation: landscape)`]: {
                height: 'auto',
            },
        },
        collectionsDiscoverModule: {
            marginTop: 50,
        },

        footerCard: {
            display: 'inline-grid',
            border: 'none',
            borderRadius: 0,
            boxShadow: 'none',
            backgroundColor: 'transparent',
            margin: 'auto',
            padding: '12px',
            width: '270px',
            color: theme.palette.primary.contrastText,
        },
        footerWrapper: {
            backgroundColor: theme.palette.primary.main,
        },
    }),
);

export default useStyles;
