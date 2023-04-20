import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    contrastText: {
      color: theme.palette.text.secondary,
      whiteSpace: 'break-spaces',
    },

    contrastTextHeader: {
      color: theme.palette.text.secondary,
      whiteSpace: 'break-spaces',
    },

    contrastTextTitle: {
      color: theme.palette.text.secondary,
      whiteSpace: 'break-spaces',
      fontFamily: 'GTWalsheimPro-Bold, Arial',
    },

    accordionSummary: {
      '&:hover': {
        '& h4': {
          textDecoration: 'underline',
        },
      },
    },
    accordionSummaryIcon: {
      fontSize: '2rem !important',
    },

    accordionElement: {
      borderTop: 'solid 1px',
      borderColor: theme.palette.primary.main,
      boxShadow: 'none',
      margin: '0 !important',
      color: '#22201E',

      '&:first-child': {
        borderRadius: 0,
        borderTop: 0,
      },

      '&:not(:last-child)': {
        borderBottom: 0,
      },

      '&:before': {
        display: 'none',
      },

      '& .MuiAccordionSummary-root': {
        minHeight: '4rem',

        '&:hover': {
          textDecoration: 'underline !important',
          backgroundColor: 'transparent',
        },
      },
    },

    listItemIcon: {
      color: '#000000',
      'min-width': '1rem',
      'align-self': 'flex-start',
      margin: '6px 0px',
    },

    listItemText: {
      whiteSpace: 'pre-wrap',
    },

    listTitle: {
      color: theme.palette.text.secondary,
      whiteSpace: 'break-spaces',
      padding: '1rem 0 1.5rem',
      fontFamily: 'GTWalsheimPro-Bold, Arial',
      lineHeight: 1,
    },

    accordionListRow: {
      display: 'flex',
      flexWrap: 'wrap',
      padding: '0 0 .5rem',
      margin: '0',

      '& li': {
        display: 'flex',
        with: 'auto',
        padding: '0 .5rem .25rem 0',
        listStyle: 'none',

        '& a': {
          textDecoration: 'underline',
          fontWeight: '400 !important',
          // fontSize: '.875rem',
          alignItems: 'center',
        },

        '& p': {
          fontWeight: '400 !important',
          // fontSize: '.875rem',
          marginBottom: '0 !important',
        },

        '& span': {
          margin: '0 .5rem 0 .5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',

          '& svg': {
            fontSize: '0.875rem !important',
            marginLeft: '.25rem',
          },
        },
      },
    },

    icon: {
      margin: '0 !important',
    },

    accordionListColumn: {
      display: 'flex',
      flexDirection: 'column',
      padding: '0 0 .5rem',
      margin: '0',

      '& li': {
        display: 'flex',
        with: '100%',
        padding: '0 0 .25rem',
        listStyle: 'none',

        '& a': {
          textDecoration: 'underline',
          fontWeight: '400 !important',
          // fontSize: '.875rem',
          display: 'flex !important',
          alignItems: 'center',
        },

        '& p': {
          fontWeight: '400 !important',
          // fontSize: '.875rem',
          display: 'flex !important',
          marginBottom: '0 !important',
        },

        '& span': {
          margin: '0 .5rem 0 .5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',

          '& svg': {
            fontSize: '0.875rem !important',
            marginLeft: '.25rem',
          },
        },
      },
    },
  }),
);

export default useStyles;
