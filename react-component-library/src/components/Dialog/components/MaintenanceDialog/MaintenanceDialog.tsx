import React, {useState} from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "../dialog.jss";
import {ResearchService} from "../../../../services/ResearchService";


export function MaintenanceDialog(){
  const classes = useStyles();
  const researchService = new ResearchService();
  const { loading, data } = researchService.getMaintenanceModalData();

  const [isOpen, setIsOpen] = useState<boolean>(true);

  const getDialogVariant = () => {
    if (data?.showMaintenancePopup && data?.maintenanceText && data?.maintenanceTextLong) return 'md';
    return 'xs';
  };

  const getDialogContentVariant = () => {
    if (data?.showMaintenancePopup && data?.maintenanceText && data?.maintenanceTextLong) return 6;
    return 12;
  };

  return (
    <>
      <Dialog
        style={{ zIndex: 1400 }}
        fullWidth
        maxWidth={getDialogVariant()}
        open={isOpen && !loading && data && data?.showMaintenancePopup}
        onClose={() => {setIsOpen(false);}}
      >
        {isOpen && !loading && data && data?.showMaintenancePopup && (
          <>
            <DialogTitle className={classes.container} disableTypography={true}>
              <div className={classes.header}>
                <Typography variant={'h3'} className={classes.title}>
                  {data.maintenanceText}
                </Typography>
                <IconButton
                  data-cy="dialog-close"
                  onClick={() => {setIsOpen(false);}}
                  className={classes.closeButton}
                >
                  <CloseIcon fontSize="large" />
                </IconButton>
              </div>
            </DialogTitle>

            <DialogContent className={classes.container}>
              <div className={classes.contentWrapper}>
                {data.maintenanceTextLong && (
                  <Grid
                    item={true}
                    className={classes.innerContent}
                    md={getDialogContentVariant()}
                  >
                    <Typography
                      className={classes.sectionRichText}
                      component={'div'}
                      variant='body1'
                      dangerouslySetInnerHTML={{
                        __html: data.maintenanceTextLong
                      }}
                    />
                  </Grid>
                )}
              </div>
            </DialogContent>
          </>
        )}
      </Dialog>
    </>
  );

}