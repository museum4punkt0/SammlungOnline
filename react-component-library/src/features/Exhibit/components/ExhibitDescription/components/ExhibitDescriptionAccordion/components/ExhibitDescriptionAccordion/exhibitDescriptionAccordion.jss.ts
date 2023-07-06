import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconclassRow: {
      '& > div': {
        display: 'flex',
        flexDirection: 'row',
        '& a': {
          color: theme.palette.text.secondary,
        },
        '& [target*="_blank"]': {
          '&::after ': {
            content: `url('data:image/svg+xml; utf8, <svg class="makeStyles-svg-291" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 195 191"><g fill="000"><path d="M185.818,0.161 L128.778,0.161 C123.807,0.161 119.778,4.19 119.778,9.161 C119.778,14.132 123.807,18.161 128.778,18.161 L164.09,18.161 L77.79,104.461 C74.275,107.976 74.275,113.674 77.79,117.189 C79.548,118.946 81.851,119.825 84.154,119.825 C86.457,119.825 88.76,118.946 90.518,117.189 L176.818,30.889 L176.818,66.202 C176.818,71.173 180.847,75.202 185.818,75.202 C190.789,75.202 194.818,71.173 194.818,66.202 L194.818,9.162 C194.818,4.19 190.789,0.161 185.818,0.161 Z"></path><path d="M149,75.201 C144.029,75.201 140,79.23 140,84.201 L140,172.657 L18,172.657 L18,50.657 L111.778,50.657 C116.749,50.657 120.778,46.628 120.778,41.657 C120.778,36.686 116.749,32.657 111.778,32.657 L9,32.657 C4.029,32.657 0,36.686 0,41.657 L0,181.657 C0,186.628 4.029,190.657 9,190.657 L149,190.657 C153.971,190.657 158,186.628 158,181.657 L158,84.201 C158,79.23 153.971,75.201 149,75.201 Z"></path></g></svg>')`,
            display: 'inline-block',
            paddingLeft: '.25rem',
          },
        },
        '& [data-link-type="internal"]': {
          display: 'inline-block !important',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: '50vw',
          overflow: 'hidden'
        }
      },
    },
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
      //fontFamily: 'GTWalsheimPro-Bold, Arial',
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
      padding: '0 0 .5rem 0',
      margin: '0',

      '& li': {
        display: 'flex',
        with: 'auto',
        padding: '0 .5rem .25rem 0',
        listStyle: 'none',

        '& a': {
          textDecoration: 'underline',
          fontWeight: '400 !important',
        },

        '& p': {
          fontWeight: '400 !important',
          marginBottom: '0 !important',
        },

        '& span': {
          margin: '0 .5rem 0 0',
          display: 'flex',
          justifyContent: 'center',
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
      padding: '0 0 .5rem 0',
      margin: '0',

      '& li': {
        display: 'flex',
        with: '100%',
        padding: '0 0 1rem 0',
        listStyle: 'none',
        lineHeight: '1.5rem',

        '& a': {
          textDecoration: 'underline',
          fontWeight: '400 !important',
          display: 'flex !important',
        },

        '& p': {
          fontWeight: '400 !important',
          display: 'flex !important',
          marginBottom: '0 !important',
        },

        '& span': {
          margin: '0 .5rem 0 0',
          display: 'flex',
          justifyContent: 'center',
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
