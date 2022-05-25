import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const REGEX_MD_LINK = /\[.*\]\(.*\)/gm;
const REGEX_MD_LINK_LABEL = /\[.*\]/gm;
const REGEX_MD_LINK_HREF = /\(.*\)/gm;

function parseLink(link) {
  const labelPart = link.match(REGEX_MD_LINK_LABEL)[0];
  const hrefPart = link.match(REGEX_MD_LINK_HREF)[0];

  return {
    infoType: "link",
    label: labelPart.substring(1, labelPart.length - 1),
    href: hrefPart.substring(1, hrefPart.length - 1),
  };
}

function parseParagraph(paragraph) {
  const links = paragraph.match(REGEX_MD_LINK);
  if (!links) {
    return [
      {
        infoType: "text",
        text: paragraph,
      },
    ];
  }

  let paragraphInfoList = [];
  let i = 0;
  for (let link of links) {
    const iLinkStart = paragraph.indexOf(link);
    const iLinkEnd = iLinkStart + link.length;

    paragraphInfoList.push({
      infoType: "text",
      text: paragraph.substring(i, iLinkStart),
    });
    paragraphInfoList.push(parseLink(link));
    i = iLinkEnd;
  }
  paragraphInfoList.push({
    infoType: "text",
    text: paragraph.substring(i),
  });

  return paragraphInfoList;
}

export default function FAQParagraph({ paragraph }) {
  const paragraphInfoList = parseParagraph(paragraph);
  return (
    <>
      {paragraphInfoList.map(function (info, iInfo) {
        const key = "paragraph-info-" + iInfo;
        switch (info.infoType) {
          case "link":
            return (
              <Link key={key} href={info.href} sx={{ textDecoration: "none" }}>
                <Typography variant="body2" component="span">
                  {info.label}
                </Typography>
              </Link>
            );
          default:
            return (
              <Typography key={key} variant="body2" component="span">
                {info.text}
              </Typography>
            );
        }
      })}
    </>
  );
}
