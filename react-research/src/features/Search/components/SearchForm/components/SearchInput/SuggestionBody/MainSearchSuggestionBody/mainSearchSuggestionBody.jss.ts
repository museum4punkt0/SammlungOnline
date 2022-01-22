import { makeStyles, Theme } from '@material-ui/core/styles';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useStyles = makeStyles((theme: Theme) => ({
  optionWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  optionField: {
    display: 'flex',
    width: '15%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    ['@media (max-width:1100px)']: {
      width: '25%',
    },
    ['@media (max-width:700px)']: {
      display: 'none!important',
    },
  },
  optionValueWrapper: {
    width: '70%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'start',
    ['@media (max-width:1100px)']: {
      width: '65%',
    },
    ['@media (max-width:700px)']: {
      width: '85%',
    },
  },
  optionValue: {
    ['@media (max-width:2247px)']: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
  optionCounter: {
    width: '10%',
    display: 'flex',
    justifyContent: 'flex-end',
    ['@media (max-width:1100px)']: {
      width: '10%',
    },
    ['@media (max-width:650px)']: {
      width: '15%',
    },
  },
}));
