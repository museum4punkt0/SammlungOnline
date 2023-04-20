import { makeStyles, createStyles } from '@material-ui/core/styles';

const useInputStyles = makeStyles(() =>
  createStyles({
    root: {
      '& input': {
        height: '100%',
      },

      '& label + .MuiInput-formControl': {
        width: '100%',
      },

      '& .MuiInputLabel-formControl': {
        top: '0rem',
      },

      '& .MuiFormControl-root': {
        flexDirection: 'unset',
      },
    },
  }),
);

export default useInputStyles;
