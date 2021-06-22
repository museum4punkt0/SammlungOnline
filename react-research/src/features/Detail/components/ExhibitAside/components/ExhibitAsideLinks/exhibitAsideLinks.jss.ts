import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
    createStyles({
        content: {
            padding: 15,
            margin: '10px 0',
        },
        link: {
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.75rem',

            '& > svg': {
                marginLeft: 10,
            },
        },
        contentTopic: {
            color: '#f9ff04',
            backgroundColor: '#6f7045',
        },
        contentGuide: {
            color: '#ffffff',
            backgroundColor: '#f25b5b',
        },
        contentText: {
            color: '#000000',
            backgroundColor: '#d3d3d3',
        },
        typoTitle: {
            paddingBottom: 10,
        },
    }),
);

export default useStyles;
