import dayjs from 'dayjs';
import { getFilteredData } from './search';
import { getSortedData, SortBy } from './sort';

export const getCurrentDateTime = () => {
  return dayjs().format('YYYY-MM-DD HH:mm:ss.SSS');
};

export const getAllVariables = async () => {
  const dateTime = getCurrentDateTime();
  const url = encodeURI(
    'https://metadata.kreftregisteret.no/rest/v1/variables/:filtered?latestSearchTime=' + dateTime
  );

  try {
    const res = await fetch(url);
    const records = await res.json();
    const variables = records?.['variableList'] ?? [];
    return variables;
  } catch (err) {
    console.error(err);
  }
};

export const getExtractedData = (variables = {}) => {
  const extractedData = [];

  for (const variable of variables) {
    const variableObj = {
      name: variable.nameEn,
      deliverable: variable.validForExtraction === 2 ? 'Yes' : 'If need be',
      validFrom: variable.validFrom,
      techName: variable.techName,
      description: variable.descriptionEn,
      clinicalRegistries: 'Breast cancer',
      cancerSites: 'Breast',
      category: variable.category.nameEn,
      datatype: variable.dataType.name,
      source: 'Pathology reports, Clinical notifications',
      registrationMethods: variable.registrationMethod.nameEn,
      variabletype: variable.variableType.nameEn,
      currentlyInUse: variable.status.nameEn === 'Active' ? 'Yes' : 'No',
    };
    extractedData.push(variableObj);
  }

  return extractedData;
};

export const createTableRows = (extractedData = []) => {
  const tableRows = [];
  for (const obj of extractedData) {
    const newRow = `
    <div class="row-container">
      <div class="table-row">
        <div class="wide item">${obj.name}</div>
        <div class="item">${obj.deliverable}</div>
        <div class="item">${obj.validFrom}</div>
        <div class="medium item">${obj.techName}</div>
        </div>
      <div class="table-row-details">
        ${obj.description}
      </div>
      <div class="expanding-row">
          <div class="item"><span class="label">Category:</span> ${obj.category}</div>
          <div class="item"><span class="label">Datatype:</span> ${obj.datatype}</div>
      </div>
    </div>
  `;
    tableRows.push(newRow);
  }
  return tableRows;
};

let _Variables;
export const initialize = async () => {
  _Variables = await getAllVariables();
  const extractedData = getExtractedData(_Variables);
  const filteredData = getFilteredData(null, extractedData);
  const sortedData = getSortedData(SortBy.NAME_ASC, filteredData);
  const tableRows = createTableRows(sortedData);
  tbody.innerHTML = tableRows.join('');
  addEventListenersToRows();
};

export const getExtractedFilteredSortedData = (sortBy, searchValue) => {
  const extractedData = getExtractedData(_Variables);
  const filteredData = getFilteredData(searchValue, extractedData);
  const sortedData = getSortedData(sortBy, filteredData);
  return sortedData;
};

const tbody = document.getElementById('table-body');
export const updateVariablesTable = async (sortBy, searchValue) => {
  const data = getExtractedFilteredSortedData(sortBy, searchValue);
  const tableRows = createTableRows(data);
  tbody.innerHTML = tableRows.join('');
  addEventListenersToRows();
};

const addEventListenersToRows = () => {
  const rowContainers = document.querySelectorAll('.row-container');
  rowContainers.forEach((container) => {
    const tableRow = container.querySelector('.table-row');
    const expandingRow = container.querySelector('.expanding-row');
    const tableRowDetails = container.querySelector('.table-row-details');

    tableRowDetails.addEventListener('click', () => {
      expandingRow.classList.toggle('expanded');
    });
    expandingRow.addEventListener('click', () => {
      expandingRow.classList.toggle('expanded');
    });
    tableRow.addEventListener('click', () => {
      expandingRow.classList.toggle('expanded');
    });
  });
};
