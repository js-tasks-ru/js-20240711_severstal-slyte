/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param='asc' ) {
        let arrNew = [...arr];
        return arrNew.sort((a, b) => {
          if (param === 'asc') {
            return a.localeCompare(b, ["ru", "en"], {caseFirst: 'upper'});
          } 
          if (param === 'desc') {
            return b.localeCompare(a, ["ru", "en"], {caseFirst: 'lower'});
          }
        })

        /*
        function sortStrings(arr, param = 'asc') {
    const copyArr = [...arr];
    if (!param) {
      return null;
    }
    if (param === 'asc') {
              return copyArr.sortArr(arr, -1);
    } else if (param === 'desc')
              return copyArr.sortArr(arr, 1);
  } 
    function sortArr(array, direction) {
      return array.sort( (str1, str2) => direction * str1.localeCompare(str2,["ru-RU", "en-EN"],{caseFirst: 'upper'}));
    }
        */
}
