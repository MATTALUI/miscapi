export const buildEntityUrl = (entity) => {
  let entityUrl = "/";
  if (!!entity.urlPrefix) entityUrl += entity.urlPrefix;
  if (!!entity.key) entityUrl += entity.key + "/";
  if (!!entity.urlSuffix) entityUrl += entity.urlSuffix;

  return entityUrl;
};
