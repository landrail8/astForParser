
import funcCompare from './compare';

const getViewDiff = comparedObj => JSON.stringify(comparedObj, null, '  ').replace(/"/g, '');

const funcReport = (file1, file2) => {
  const comparedObj = funcCompare(file1, file2);
  console.log(getViewDiff(comparedObj));
};

export default funcReport;
