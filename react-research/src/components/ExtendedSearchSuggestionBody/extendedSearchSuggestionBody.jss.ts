import { makeStyles, Theme } from '@material-ui/core/styles';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useStyles = makeStyles((theme: Theme) => ({
  optionWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  optionValueWrapper: {
    width: '90%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'start',
    ['@media (max-width:700px)']: {
      width: '85%',
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
