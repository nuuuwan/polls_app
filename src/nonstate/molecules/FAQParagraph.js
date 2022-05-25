import Box from "@mui/material/Box";

import FAQParagraphItem from "./FAQParagraphItem";

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
    <Box sx={{ m: 1 }}>
      {paragraphInfoList.map(function (info, iInfo) {
        return <FAQParagraphItem key={"paragraph-info-" + iInfo} info={info} />;
      })}
    </Box>
  );
}
