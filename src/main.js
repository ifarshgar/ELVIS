
export const getAllHistoryRecords = () => {
  fetch('http://localhost:8888/history')
    .then((res) => res.json())
    .then((records: HistoryRecord[]) => {
      if (records?.length) {
        updateLeaderboard(records);
      }
    })
    .catch((err) => console.error(err));
};