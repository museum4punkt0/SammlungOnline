export const copyPermalink = (id: number) => {
  const link = `https://id.smb.museum/object/${id}`;
  navigator.clipboard.writeText(link);
};
