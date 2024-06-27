import { SortBy, updateVariablesTable } from './utilities';

// OnClick listener for the main website logo
const logo = document.getElementById('logo');
logo.addEventListener('click', () => {
  window.location.href = '/';
});


let searchValue = '';
let sortBy = SortBy.NAME_ASC;
updateVariablesTable(sortBy, searchValue);


// Search
const searchIcon = document.getElementById('search-icon');
const searchInput = document.getElementById('search-input');

searchInput.addEventListener('keyup', (event) => {
  const value = (event.target).value;
  searchValue = value;
  updateVariablesTable(sortBy, searchValue);
})


// Sort
const nameColumn = document.getElementById('th-name');
const deliverableColumn = document.getElementById('th-deliverable');
const validFromColumn = document.getElementById('th-valid-from');
const techNameColumn = document.getElementById('th-tech-name');

nameColumn.addEventListener('click', () => {
  if (sortBy === SortBy.NAME_ASC) {
    sortBy = SortBy.NAME_DSC;
    nameColumn.src = 'src/images/sort-z-a.png'
  } else {
    sortBy = SortBy.NAME_ASC;
    nameColumn.src = 'src/images/sort-a-z.png'
    deliverableColumn.src = 'src/images/up-down-arrow.png'
    validFromColumn.src = 'src/images/up-down-arrow.png'
    techNameColumn.src = 'src/images/up-down-arrow.png'
  }

  updateVariablesTable(sortBy, searchValue);
});

deliverableColumn.addEventListener('click', () => {
  if (sortBy === SortBy.DELIVERABLE_ASC) {
    sortBy = SortBy.DELIVERABLE_DSC;
    deliverableColumn.src = 'src/images/sort-z-a.png'
  } else {
    sortBy = SortBy.DELIVERABLE_ASC;
    deliverableColumn.src = 'src/images/sort-a-z.png'
    nameColumn.src = 'src/images/up-down-arrow.png'
    validFromColumn.src = 'src/images/up-down-arrow.png'
    techNameColumn.src = 'src/images/up-down-arrow.png'
  }

  updateVariablesTable(sortBy, searchValue);
});

