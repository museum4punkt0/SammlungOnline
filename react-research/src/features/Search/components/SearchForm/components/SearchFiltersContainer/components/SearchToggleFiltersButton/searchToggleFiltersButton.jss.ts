import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchIconContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '60px',
      height: '60px',
      backgroundColor: theme.palette.primary.main,
      borderRadius: 0,
      '& path ': {
        color: '#ffffff',
      },
    },
    button: {
      height: 56,
      width: 56,
    },
    searchIcon: {
      color: '#ffffff',
    },
    advancedSearchContainer: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      userSelect: 'none',
      borderBottomColor: theme.palette.primary.main,
      borderBottomWidth: 4,
      borderBottomStyle: 'solid',
      flexFlow: 'row wrap',
      borderBottom: 'solid 4px ',
      paddingTop: '1.25rem',
    },
    moreSearchContainer: {
      borderBottomColor: theme.palette.primary.main,
      borderBottomWidth: 2,
      borderBottomStyle: 'solid',
      '&.MuiSvgIcon-root': {
        marginLeft: -5,
        marginRight: 5,
      },
    },
    addIcon: { marginLeft: -5, marginRight: 5, fill: '#000' },
    expandIcon: {
      width: 55,
      height: 55,
      marginLeft: '-12px',
      fill: '#000',
      transition: theme.transitions.create(['transform'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    expandIconExpandedState: {
      transform: 'rotate(180deg)',
    },
    addAttributeContainer: {
      display: 'flex',
      alignItems: 'center',
      height: '3.75rem',
      cursor: 'pointer',
      width: '100%',
      padding: '6px 0',
    },
    clearButton: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.light,
      width: '3.75rem',
      height: '3.75rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 0,
      marginLeft: '0.875rem',
    },
    clearContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    icon: {
      color: 'white',
    },
  }),
);

export default useStyles;
