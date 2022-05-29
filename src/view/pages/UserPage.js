import { Component } from "react";
import ReactCountryFlag from "react-country-flag";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import GoogleMapsLink from "../../view/atoms/GoogleMapsLink";
import SimpleLink from "../../view/atoms/SimpleLink";
import IDAvatar from "../../view/molecules/IDAvatar";
import TitledBody from "../../view/molecules/TitledBody";

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
      <Box sx={{ m: 1, p: 1 }}>
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
      </Box>
    );
  }
}
