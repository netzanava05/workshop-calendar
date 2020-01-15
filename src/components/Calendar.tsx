import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import * as dateFn from "date-fns";
import React, { FC } from "react";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  list: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      alignItems: "flex-end"
    }
  },
  item: {
    padding: theme.spacing(1),
    width: "100%"
  },
  itemContainer: {
    justifyContent: "flex-start"
  },
  button: {
    minWidth: "60px"
  }
}));

function buildDaysInMonth(date: Date): Array<number> {
  const daysAmount = dateFn.getDaysInMonth(date);
  return [...Array(daysAmount)].map((_, index) => ++index);
}

interface CalendarProps {
  date: Date;
}

const Calendar: FC<CalendarProps> = props => {
  const classes = useStyles();
  const { date } = props;
  return (
    <Grid justify="center" className={classes.list} container>
      {buildDaysInMonth(date).map((value, index) => (
        <div className={classes.itemContainer} key={index}>
          <Grid item className={classes.item}>
            <Button className={classes.button}>{value}</Button>
          </Grid>
          <Divider />
        </div>
      ))}
    </Grid>
  );
};

export default Calendar;
