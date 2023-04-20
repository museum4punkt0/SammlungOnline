import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    advancedSearchAccordion: {
      boxShadow: 'none',
      borderBottomColor: theme.palette.primary.main,
      borderBottomWidth: 2,
      borderBottomStyle: 'solid',
      '&.Mui-expanded': {
        margin: 0,
        paddingBottom: '1.875rem',
      },
      '&:last-child': {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomWidth: 4,
      },
      '&.MuiAccordionSummary-root': {
        borderRadius: 0,
        borderBottomLeftRadius: 0,
      },
    },
    toggleButtonOptions: {
      margin: '20px 10px 10px 5px',
      width: '100%',
    },
    headline: {
      marginBottom: 10,
      '& span': {
        fontWeight: 'bold',
      },
    },
    accordionDetails: {
      '&.MuiAccordionDetails-root': {
        flexFlow: 'row wrap',
        marginLeft: -5,
        marginRight: -5,
      },
    },
  }),
);

export default useStyles;
