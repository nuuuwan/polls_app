import { Component } from "react";
import * as React from "react";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";

import ReactCountryFlag from "react-country-flag";

import TitledBody from "../../nonstate/molecules/TitledBody";
import IDAvatar from "../../nonstate/molecules/IDAvatar";
import GoogleMapsLink from "../../nonstate/atoms/GoogleMapsLink";
import SimpleLink from "../../nonstate/atoms/SimpleLink";

const URL_WHATISMYIP = "https://whatismyipaddress.com/";

const STYLE_COUNTRY_FLAG = {
  fontSize: "150%",
  marginLeft: "1%",
};

export default class UserPage extends Component {
  render() {
    const { geoInfo } = this.props;

    const [lat, lng] = geoInfo.latLng;
    const locationStr = `${lat}°, ${lng}°`;

    return (
      <Paper sx={{ m: 2, p: 3 }}>
        <Grid container justifyContent="center">
          <IDAvatar id={geoInfo.infoHash} size={120} />
        </Grid>

        <TitledBody title="UserID" body={geoInfo.infoHash} />
        <TitledBody
          title="IP"
          body={<SimpleLink href={URL_WHATISMYIP} label={geoInfo.ipV4} />}
        />
        <TitledBody
          title="Location"
          body={<GoogleMapsLink searchText={locationStr} />}
        />
        <TitledBody
          title="Country"
          body={
            <>
              {geoInfo.countryName}
              <ReactCountryFlag
                style={STYLE_COUNTRY_FLAG}
                countryCode={geoInfo.countryCode}
              />
            </>
          }
        />
        <Alert severity="info">
          This is a auto-generated user account, based on your location, country
          and IP address.
        </Alert>
      </Paper>
    );
  }
}
