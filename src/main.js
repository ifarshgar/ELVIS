import { updateVariablesTable } from './utilities';

// OnClick listener for the main website logo
const logo = document.getElementById('logo');
logo.addEventListener('click', () => {
  window.location.href = '/';
});

// updateVariablesTable();