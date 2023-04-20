export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

export const shortenPermalink = (link: string) => {
  const lastSegmentIdx = link.lastIndexOf('/');
  return link.substring(0, lastSegmentIdx);
};
