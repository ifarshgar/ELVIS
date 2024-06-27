// sort
export const SortBy = {
  NAME_ASC: 'Name Ascending',
  NAME_DSC: 'Name Descending',
  DELIVERABLE_ASC: 'Deliverable Ascending',
  DELIVERABLE_DSC: 'Deliverable Descending',
  VALID_FROM_ASC: 'Valid from Ascending',
  VALID_FROM_DSC: 'Valid from Descending',
  TECH_NAME_ASC: 'Tech name Ascending',
  TECH_NAME_DSC: 'Tech name Descending',
};

export const sortASC = (a, b) => {
  if (a.toLowerCase() < b.toLowerCase()) return -1;
  if (a.toLowerCase() > b.toLowerCase()) return 1;
  return 0;
};

export const sortDSC = (a, b) => {
  if (a.toLowerCase() < b.toLowerCase()) return 1;
  if (a.toLowerCase() > b.toLowerCase()) return -1;
  return 0;
};

export const getSortedData = (sortBy, extractedData) => {
  let sortedData = [];
  if (sortBy === SortBy.NAME_ASC) {
    sortedData = extractedData.sort((a, b) => sortASC(a.name, b.name));
  } else if (sortBy === SortBy.NAME_DSC) {
    sortedData = extractedData.sort((a, b) => sortDSC(a.name, b.name));
  } else if (sortBy === SortBy.DELIVERABLE_ASC) {
    sortedData = extractedData.sort((a, b) => sortASC(a.deliverable, b.deliverable));
  } else if (sortBy === SortBy.DELIVERABLE_DSC) {
    sortedData = extractedData.sort((a, b) => sortDSC(a.deliverable, b.deliverable));
  } else if (sortBy === SortBy.VALID_FROM_ASC) {
    sortedData = extractedData.sort((a, b) => sortASC(a.validFrom, b.validFrom));
  } else if (sortBy === SortBy.VALID_FROM_DSC) {
    sortedData = extractedData.sort((a, b) => sortDSC(a.validFrom, b.validFrom));
  } else if (sortBy === SortBy.TECH_NAME_ASC) {
    sortedData = extractedData.sort((a, b) => sortASC(a.techName, b.techName));
  } else if (sortBy === SortBy.TECH_NAME_DSC) {
    sortedData = extractedData.sort((a, b) => sortDSC(a.techName, b.techName));
  } else {
    sortedData = extractedData.sort((a, b) => sortASC(a.name, b.name));
  }

  return sortedData;
};
