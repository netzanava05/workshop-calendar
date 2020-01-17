import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import * as dateFn from "date-fns";
import React, { FC, useState, useCallback } from "react";
import EventDialog from "./EventDialog";
import EventData from "../types/EventData";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(theme => ({
  gridContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#e3f2fd",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "flex-end"
    }
  },
  item: {
    display: "inline-flex",
    [theme.breakpoints.up("sm")]: {
      display: "block",
      width: "60px"
    }
  },
  divider: {
    visibility: "visible"
  },
  button: {
    width: "100%",
    padding: theme.spacing(2),
    justifyContent: "flex-start",
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(2, 1)
    }
  },
  dummy: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
      visibility: "hidden"
    }
  },
  mark: {
    [theme.breakpoints.up("sm")]: {
      border: "none",
      position: "relative",
      justifyContent: "center",
      "&::before": {
        content: "''",
        position: "absolute",
        left: 0,
        top: 0,
        border: "5px solid transparent",
        borderLeftColor: "red",
        borderTopColor: "red"
      }
    }
  },
  description: {
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  date: {
    marginRight: theme.spacing(2),
    minWidth: theme.spacing(2.5),
    [theme.breakpoints.up("sm")]: {
      marginRight: theme.spacing(0)
    }
  },
  tooltip: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.typography.body2.fontSize,
      display: "block",
      padding: theme.spacing(1.5)
    }
  }
}));

function buildDaysInMonth(date: Date): Array<number> {
  const daysAmount = dateFn.getDaysInMonth(date);
  return [...Array(daysAmount)].map((_, index) => ++index);
}

function getStartDay(date: Date): Array<number> {
  const dates = buildDaysInMonth(date);
  const startDate = dateFn.startOfMonth(date);
  const dummyDate = [...Array(startDate.getDay())].map(i => 0);
  return startDate.getDay() === 1 ? dates : dummyDate.concat(dates);
}

interface CalendarProps {
  currentDate: Date;
  eventData?: EventData;
}

const Calendar: FC<CalendarProps> = props => {
  const classes = useStyles();
  const { currentDate } = props;
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [eventDatas, setEventDatas] = useState<{ [title: string]: EventData }>({
    "1 January 2020": {
      eventAt: new Date(2020, 1, 1),
      description: "New Year",
      title: "1 January 2020"
    }
  });
  const [eventData, setEventData] = useState<EventData>({
    description: "",
    eventAt: currentDate,
    title: ""
  });
  const dateToDisplay = getStartDay(currentDate);

  const handleOpenDialog = useCallback(
    (value: number) => {
      const dateTitle = `${value} ${dateFn.format(currentDate, "MMMM yyyy")}`;
      const existingEvent = eventDatas[dateTitle];
      if (existingEvent) {
        setEventData({
          description: existingEvent.description,
          title: dateTitle,
          eventAt: new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            value
          )
        });
      } else {
        setEventData({
          description: "",
          title: dateTitle,
          eventAt: new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            value
          )
        });
      }
      setOpenDialog(true);
    },
    [currentDate, eventDatas]
  );

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
  }, []);

  const addEventData = useCallback(
    (newEvent: EventData) => {
      setEventDatas({ ...eventDatas, [newEvent.title]: newEvent });
    },
    [eventDatas]
  );

  return (
    <Grid className={classes.gridContainer} container>
      {dateToDisplay.map((value, index) => (
        <div
          className={clsx(
            { [classes.dummy]: dateToDisplay[index] === 0 },
            {
              [classes.mark]: !!eventDatas[
                `${value} ${dateFn.format(currentDate, "MMMM yyyy")}`
              ]?.description
            }
          )}
          key={index}
        >
          <Tooltip
            title={
              eventDatas[`${value} ${dateFn.format(currentDate, "MMMM yyyy")}`]
                ? eventDatas[
                    `${value} ${dateFn.format(currentDate, "MMMM yyyy")}`
                  ].description
                : ""
            }
            classes={{ tooltip: classes.tooltip }}
            placement="right"
          >
            <Button
              className={classes.button}
              onClick={() => handleOpenDialog(value)}
            >
              <Grid item className={clsx([classes.item])}>
                <Typography className={classes.date}>{value}</Typography>
                <Typography className={classes.description}>
                  {eventDatas[
                    `${value} ${dateFn.format(currentDate, "MMMM yyyy")}`
                  ] &&
                    eventDatas[
                      `${value} ${dateFn.format(currentDate, "MMMM yyyy")}`
                    ].description}
                </Typography>
              </Grid>
            </Button>
          </Tooltip>
          <Divider className={classes.divider} />
        </div>
      ))}
      <EventDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSave={addEventData}
        eventData={eventData}
      />
    </Grid>
  );
};

export default Calendar;
