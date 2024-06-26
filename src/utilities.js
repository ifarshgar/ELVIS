import dayjs from 'dayjs';

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
    return await extractData(records);
  } catch (err) {
    console.error(err);
  }
};

export const extractData = async (records) => {
  const variables = records?.['variableList'] ?? [];
  const tableRows = [];

  for (const variable of variables) {
    const name = variable.nameEn;
    const deliverable = variable.status.nameEn === 'Active' ? 'Yes' : 'No';
    const validFrom = variable.validFrom;
    const recommendedTechName = variable.techName;
    const description = variable.descriptionEn;
    const clinicalRegistries = 'Breast cancer';
    const cancerSites = 'Breast';
    const category = variable.category.nameEn;
    const informationLevel = variable.informationLevel.nameEn;
    const source = 'Pathology reports, Clinical notifications';
    const registrationMethods = variable.registrationMethod.nameEn;
    const variabletype = variable.variableType.nameEn;
    const currentlyInUse = variable.status.nameEn === 'Active' ? 'Yes' : 'No';

    const newRow = `
      <tr>
        <td class="wide">${name}</td>
        <td>${deliverable}</td>
        <td>${validFrom}</td>
        <td>${recommendedTechName}</td>
      </tr>
    `;

    tableRows.push(newRow);
  }

  return tableRows;
};

const tbody = document.getElementById('records');
export const updateVariablesTable = async (sortBy) => {
  const tableRows = await getAllVariables();
  // const dataRows = Array.sortBy('name', rows);
  tbody.innerHTML = tableRows.join('');
};
