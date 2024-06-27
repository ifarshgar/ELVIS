import { getExtractedFilteredSortedData, initialize, updateVariablesTable } from './utilities';
import { SortBy } from './sort';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// OnClick listener for the main website logo
const logo = document.getElementById('logo');
logo.addEventListener('click', () => {
  window.location.href = '/';
});

let searchValue = '';
let sortBy = SortBy.NAME_ASC;
initialize();

const rowContainers = document.querySelectorAll('.row-container');
rowContainers.forEach((container) => {
  const tableRow = container.querySelector('.table-row');
  const expandingRow = container.querySelector('.expanding-row');

  tableRow.addEventListener('click', () => {
    expandingRow.classList.toggle('expanded');
  });
});

// Search
const searchIcon = document.getElementById('search-icon');
const searchInput = document.getElementById('search-input');

searchInput.addEventListener('keyup', (event) => {
  const value = event.target.value;
  searchValue = value;
  updateVariablesTable(sortBy, searchValue);
});

// Sort
const nameColumn = document.getElementById('th-name');
const deliverableColumn = document.getElementById('th-deliverable');
const validFromColumn = document.getElementById('th-valid-from');
const techNameColumn = document.getElementById('th-tech-name');

nameColumn.addEventListener('click', () => {
  if (sortBy === SortBy.NAME_ASC) {
    sortBy = SortBy.NAME_DSC;
    nameColumn.src = 'src/images/sort-z-a.png';
  } else {
    sortBy = SortBy.NAME_ASC;
    nameColumn.src = 'src/images/sort-a-z.png';
    deliverableColumn.src = 'src/images/up-down-arrow.png';
    validFromColumn.src = 'src/images/up-down-arrow.png';
    techNameColumn.src = 'src/images/up-down-arrow.png';
  }

  updateVariablesTable(sortBy, searchValue);
});

deliverableColumn.addEventListener('click', () => {
  if (sortBy === SortBy.DELIVERABLE_ASC) {
    sortBy = SortBy.DELIVERABLE_DSC;
    deliverableColumn.src = 'src/images/sort-z-a.png';
  } else {
    sortBy = SortBy.DELIVERABLE_ASC;
    deliverableColumn.src = 'src/images/sort-a-z.png';
    nameColumn.src = 'src/images/up-down-arrow.png';
    validFromColumn.src = 'src/images/up-down-arrow.png';
    techNameColumn.src = 'src/images/up-down-arrow.png';
  }

  updateVariablesTable(sortBy, searchValue);
});

validFromColumn.addEventListener('click', () => {
  if (sortBy === SortBy.VALID_FROM_ASC) {
    sortBy = SortBy.VALID_FROM_DSC;
    validFromColumn.src = 'src/images/sort-z-a.png';
  } else {
    sortBy = SortBy.VALID_FROM_ASC;
    validFromColumn.src = 'src/images/sort-a-z.png';
    nameColumn.src = 'src/images/up-down-arrow.png';
    deliverableColumn.src = 'src/images/up-down-arrow.png';
    techNameColumn.src = 'src/images/up-down-arrow.png';
  }

  updateVariablesTable(sortBy, searchValue);
});

techNameColumn.addEventListener('click', () => {
  if (sortBy === SortBy.TECH_NAME_ASC) {
    sortBy = SortBy.TECH_NAME_DSC;
    techNameColumn.src = 'src/images/sort-z-a.png';
  } else {
    sortBy = SortBy.TECH_NAME_ASC;
    techNameColumn.src = 'src/images/sort-a-z.png';
    nameColumn.src = 'src/images/up-down-arrow.png';
    deliverableColumn.src = 'src/images/up-down-arrow.png';
    validFromColumn.src = 'src/images/up-down-arrow.png';
  }

  updateVariablesTable(sortBy, searchValue);
});

// extraction
const downloadIcon = document.getElementById('download');
downloadIcon.addEventListener('click', async () => {
  const variables = getExtractedFilteredSortedData(sortBy, searchValue);
  const data = variables.map((obj) => {
    return {
      Name: obj.name,
      Deliverable: obj.deliverable,
      'Valid from': obj.validFrom,
      'Recommended tech name': obj.techName,
      Description: obj.description,
    };
  });

  const wb = XLSX.utils.book_new();
  const ws_data = [
    ['Name', 'Deliverable', 'Valid from', 'Recommended tech name', 'Description'],
    ...data.map((item) => [
      item.Name,
      item.Deliverable,
      item['Valid from'],
      item['Recommended tech name'],
      item['Description'],
    ]),
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(ws_data);
  worksheet['!cols'] = [{ width: 50 }, { width: 20 }, { width: 25 }, { width: 40 }, { width: 250 }];
  XLSX.utils.book_append_sheet(wb, worksheet, 'Data');

  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], { type: 'application/octet-stream' });
  saveAs(blob, 'Variables.xlsx');
});
