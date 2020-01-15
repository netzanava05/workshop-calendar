import React, { FC, useState, useMemo, useCallback } from "react";
import * as dateFn from "date-fns";
import Calendar from "./components/Calendar";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ArrowLeft from "@material-ui/icons/ArrowLeft";
import ArrowRight from "@material-ui/icons/ArrowRight";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  paper: {
    display: "inline-flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    width: "100%",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  button: {
    color: theme.palette.primary.contrastText
  }
}));

const App: FC = () => {
  const classes = useStyles();
  const [date, setDate] = useState<Date>(new Date());
  const title = dateFn.format(date, "MMMM yyyy");
  const nextMonthOfDate = dateFn.addMonths(date, 1);
  const previousMonthOfDate = dateFn.subMonths(date, 1);

  const handleNextMonth = useCallback(() => {
    console.log("next");
    setDate(nextMonthOfDate);
  }, [nextMonthOfDate]);

  const handlePreviousMonth = useCallback(() => {
    console.log("prev");
    setDate(previousMonthOfDate);
  }, [previousMonthOfDate]);

  const hasNextMonth = useMemo(() => dateFn.isSameYear(date, nextMonthOfDate), [
    date,
    nextMonthOfDate
  ]);

  const hasPreviousMonth = useMemo(
    () => dateFn.isSameYear(date, previousMonthOfDate),
    [date, previousMonthOfDate]
  );

  return (
    <div>
      <Container className={classes.root} maxWidth="sm">
        <Paper className={classes.paper} component="div">
          <Button
            disabled={!hasPreviousMonth}
            className={classes.button}
            onClick={handlePreviousMonth}
          >
            <ArrowLeft />
          </Button>
          <Typography>{title}</Typography>
          <Button
            disabled={!hasNextMonth}
            className={classes.button}
            onClick={handleNextMonth}
          >
            <ArrowRight />
          </Button>
        </Paper>
        <Calendar date={date} />
        <Paper className={classes.paper} component="div">
          <Button
            disabled={!hasPreviousMonth}
            className={classes.button}
            onClick={handlePreviousMonth}
          >
            <ArrowLeft />
          </Button>
          <Typography>{title}</Typography>
          <Button
            disabled={!hasNextMonth}
            className={classes.button}
            onClick={handleNextMonth}
          >
            <ArrowRight />
          </Button>
        </Paper>
      </Container>
    </div>
  );
};

export default App;
