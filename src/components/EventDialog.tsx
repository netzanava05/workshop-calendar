import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { FC, useState, useCallback } from "react";
import EventData from "../types/EventData";

const useStyles = makeStyles(theme => ({
  dialog: {
    width: "400px"
  },
  buttonContainer: {
    padding: theme.spacing(2, 3)
  }
}));

interface EventDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: { description: string; eventAt: Date; title: string }) => void;
  eventData: EventData;
}

const EventDialog: FC<EventDialogProps> = props => {
  const { open, onClose, onSave, eventData } = props;
  const classes = useStyles();
  const [description, setDescription] = useState<string>("");

  const handleClose = useCallback(() => {
    setDescription("");
    onClose();
  }, [onClose]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setDescription(event.target.value);
    },
    []
  );

  const handleClickSave = useCallback(() => {
    onSave({
      description,
      title: eventData.title,
      eventAt: eventData.eventAt
    });

    handleClose();
  }, [description, eventData.eventAt, eventData.title, handleClose, onSave]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onEnter={() => setDescription(eventData.description)}
      fullWidth
    >
      <DialogTitle>{eventData.title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Description"
          placeholder="Description"
          defaultValue={eventData.description}
          fullWidth
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions className={classes.buttonContainer}>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClickSave} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventDialog;
