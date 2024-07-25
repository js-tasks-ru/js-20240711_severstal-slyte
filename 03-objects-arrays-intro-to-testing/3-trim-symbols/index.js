/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
        let newStr ='';
        let preStr='';
        let i=1; 
        if (size === undefined) {
            newStr = string;
          } else { 
            if (size>0) {
        for (let char of string) 
          {
           if (i<size || preStr!=char) {
             newStr=newStr+char;
             if (preStr!=char){
                 preStr=char;
                 i=1;
             } else if (i<size) {
              i=i+1;
            }
           }
          }
        }
    }   
    return newStr;
}
