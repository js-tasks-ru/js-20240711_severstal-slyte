export default class SortableTable {

  data = [];
  headerConfig = [];
  element;
  subElements = {};

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.element = this.createElement(); 
    this.subElements = this.getSubElement(this.element);
  }

  createTemplate(data) {
    return `    
    <div class="sortable-table">    
     <div data-element="header" class="sortable-table__header sortable-table__row">
      ${this.headerConfig.map(item => this.getHeaderRow(item)).join('')}    
     </div>      
      <div data-element="body" class="sortable-table__body">      
      ${this.getTableRows(data)}      
      </div>    
    </div>    
    `;    
  }

 getHeaderRow({id, title, sortable}){
  return `      
  <div class="sortable-table__cell" data-name="${id}" data-sortable="${sortable}">      
   <span>${title}</span>      
    <span data-element="arrow" class="sortable-table__sort-arrow">   
     <span class="sort-arrow"></span>      
    </span>
   </div>      
 `;      
 }

 getTableRows(data){
  return data.map(item => `      
  <div class="sortable-table__row">${this.getTableRow(item, data)}</div>`).join('');      
 }

 getTableRow(item) {
   const cells = this.headerConfig.map(({id, template}) => {      
    return {      
      id,      
      template      
    };
    
  });
  return cells.map(({id, template}) => {
    return template
       ? template(item[id])
         : `<div class="sortable-table__cell">${item[id]}</div>`; 
  }).join('');
}

 createElement(){
  const element = document.createElement('div');
  element.innerHTML = this.createTemplate(this.data);
  this.subElement = this.getSubElement(element);
  return element.firstElementChild;    
 }


 sort(field, order) { 
  const column = this.headerConfig.find(item => item.id === field);
  this.data.sort((a, b) => {
    switch (column.sortType) {
    case 'string':
        if (order === 'asc') {
          return a[field].localeCompare(b[field], 'ru-RU', {caseFirst: 'upper'});  
      }
        return b[field].localeCompare(a[field], 'ru-RU', {caseFirst: 'upper'});
  
    case 'number':
        if (order === 'asc') {  
        return a[field] - b[field];  
      }
        return b[field] - a[field];

    case 'custom':
      if (order === 'asc') {
        return customSorting(a, b);
      }
      return customSorting(b, a);
    }  
  });

  this.subElement.body.innerHTML = this.getTableRows(this.data);
}

getSubElement(element) {
  return [...element.querySelectorAll('[data-element]')].reduce((acc, subElement) => {
      acc[subElement.dataset.element] = subElement;
      return acc;    
  }, {});
 
}  

remove() {
  this.element.remove();
}

destroy() {
  this.remove();
}

}

