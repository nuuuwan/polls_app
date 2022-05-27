import SimpleLink from "./SimpleLink";

const URL_BASE = "https://www.google.com/maps/search/";

export default function GoogleMapsLink({ searchText }) {
  const href = URL_BASE + encodeURIComponent(searchText);
  return <SimpleLink href={href} label={searchText} />;
}
