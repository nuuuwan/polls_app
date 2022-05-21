import React, { Component } from "react";
import PollPage from "./stateful/pages/PollPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default class App extends Component {
  render() {
    const theme = createTheme({
      typography: {
        fontFamily: ["PT Sans", "sans-serif"].join(","),
        fontSize: 14,
      },
    });

    return (
      <ThemeProvider theme={theme}>
        <PollPage />
      </ThemeProvider>
    );
  }
}
