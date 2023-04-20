import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    contentTopic: {
      color: '#0f0900',
      backgroundColor: '#F9FF4B',
    },

    contentGuide: {
      color: '#0f0900',
      backgroundColor: '#FF5252',
    },

    contentText: {
      color: '#0f0900',
      backgroundColor: '#d3d3d3',
    },
  }),
);

export default useStyles;
