import { Component } from "react";
import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import ReactCountryFlag from "react-country-flag";

import GeoLocationDBX from "../../base/GeoLocationDBX";
import TitledBody from "../../nonstate/molecules/TitledBody";
import IDImage from "../../nonstate/atoms/IDImage";

const STYLE_COUNTRY_FLAG = {
  fontSize: "150%",
  marginLeft: "1%",
};

export default class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = { geoInfo: null };
  }

  async componentDidMount() {
    this.setState({
      geoInfo: await GeoLocationDBX.getInfo(),
    });
  }

  render() {
    const { geoInfo } = this.state;
    if (!geoInfo) {
      return "Loading...";
    }

    const [lat, lng] = geoInfo.latLng;
    const locationStr = `${lat}°N, ${lng}°E`;

    return (
      <Box>
        <Typography variant="h4">User</Typography>
        <Grid container justifyContent="center">
          <IDImage id={geoInfo.infoHash} />
        </Grid>

        <TitledBody title="UserID" body={geoInfo.infoHash} />
        <TitledBody title="IP" body={geoInfo.ipV4} />
        <TitledBody title="Location" body={locationStr} />
        <TitledBody
          title="Country"
          body={
            <>
              {geoInfo.countryCode}
              <ReactCountryFlag
                style={STYLE_COUNTRY_FLAG}
                countryCode={geoInfo.countryCode}
              />
            </>
          }
        />
      </Box>
    );
  }
}
