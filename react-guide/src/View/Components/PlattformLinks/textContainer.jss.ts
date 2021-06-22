import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
    createStyles({
        content: {
            padding: 15,
            marginTop: 10,
        },
        link: {
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.75rem',

            '&> svg': {
                marginLeft: 10,
            },
        },
        contentTopic: {
            backgroundColor: '#6f7045',
        },
        contentGuide: {
            backgroundColor: '#f25b5b',
        },
        contentText: {
            backgroundColor: '#d3d3d3',
        },
        typoTitle: {
            paddingBottom: 10,
        },
        typoTopic: {
            color: '#f9ff04',
        },
        typoGuide: {
            color: '#ffffff',
        },
        typoText: {
            color: '#000000',
        },
    }),
);

export default useStyles;
