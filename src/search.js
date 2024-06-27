// search
export const getFilteredData = (searchValue, extractedData) => {
  if (!searchValue) {
    return extractedData;
  }

  return extractedData.filter((data) => {
    if (data.description.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
    if (data.name.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
    if (data.techName.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
  });
};
