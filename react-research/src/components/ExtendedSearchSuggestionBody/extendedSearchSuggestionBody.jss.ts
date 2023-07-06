import { makeStyles, Theme } from '@material-ui/core/styles';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useStyles = makeStyles((theme: Theme) => ({
  optionWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  optionValueWrapper: {
    width: '100%', // -10% optionCounter
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'start',
    ['@media (max-width:700px)']: {
      width: '100%', // -15% optionCounter
    },
  },
  optionValue: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  optionCounter: {
    width: '10%',
    display: 'flex',
    justifyContent: 'flex-end',
    ['@media (max-width:700px)']: {
      width: '15%',
    },
  },
}));
