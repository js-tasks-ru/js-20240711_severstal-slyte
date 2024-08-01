export default class NotificationMessage {
   
    static lastShownComponent; 
    timerId;

    constructor(       
      message = '', {
        type = 'success',        
        duration = 1000
      } = {}) {

      this.message = message;
      this.type = type;
      this.duration = duration;
      this.element = this.createElement();  
    } 

    createTemplate() {
      return `
        <div class="notification ${this.type}" style="--value:20s">
        <div class="timer"></div>
        <div class="inner-wrapper">
        <div class="notification-header">${this.type}</div>
        <div class="notification-body">${this.message}</div>
        </div>
        </div>
       `;
     }

    createElement() {
      const element = document.createElement('div');
      element.innerHTML = this.createTemplate();
      return element.firstElementChild;    
    }

    show(container = document.body) {
      if (NotificationMessage.lastShownComponent) {
        NotificationMessage.lastShownComponent.remove();
      }
      NotificationMessage.lastShownComponent = this;         
      this.timerId = setTimeout(() => 
      this.remove(), this.duration);
      container.append(this.element);
    }

    remove() {
      if (this.timerId) {
        clearTimeout(this.timerId);
      }
      this.element.remove();
    }

    destroy() {
      this.remove();
    }
}
