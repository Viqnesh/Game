import { getRandomListImages } from "../../config.js";
import { range } from "../utils/utils.js";
import { EventBus } from "../utils/EventBus.js";

const template = `
  <style>
    .progress {
      width : 25% ;
      margin-left: auto;
      margin-right: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-content: center;
  	  height : 15% ;
       }

    .progress-container {
      position : relative ;
      padding : 3px ;
      height: 50px;
      width: 50px;

    }

  </style>`;


  class GameLoadingbar extends HTMLElement {

    static get observedAttributes() {
      return ['nblife'];
    }

  	// Get / Set
    get nblife() {
      return parseInt(this.getAttribute('nblife'), 10);
    }
    set nblife(value) {
      this.setAttribute('nblife', value);
    }
 	// Constructeur
 	constructor() {

 		super();
 		this.attachShadow({ mode: "open" });
    this.nblife = 0 ;
    
    EventBus.subscribe('createElement', menu => {
      this.nblife = menu.difficulty ;
    });



    EventBus.subscribe('removeElement', () => {
      this.nblife = this.nblife - 1 ; 
    });
     
 	}


 	// Méthodes
 	connectedCallback() {
  this.shadowRoot.innerHTML = template ;
 
  }



  /**
   * Méthode déclenchée en cas de mise à jour des attributs observés.
   * Voir méthode : observedAttributes
   * 
   * @param String attrName 
   * @param Mixed oldVal 
   * @param Mixed newVal 
   */
  attributeChangedCallback(attrName, oldVal, newVal) {
    if(attrName === 'nblife' && newVal > '0') {
      const templateDyn = `
      <div class='affLife'>
      <div class='progress'>
        ${range(this.nblife).map( n =>
          `<div class='progress-container'>
              <img src="images/lifebar.png" width="25px" height="25px"> 
                        </div>`
                        ).join("")}
                
      </div>
  
      </div>
     `;
    this.shadowRoot.innerHTML = template + templateDyn;
      
    }

    else if (attrName === 'nblife' && newVal === '0') {
      this.shadowRoot.querySelector('.progress').style.display = "none" ;
      EventBus.post('displayMenu') ;
   
      EventBus.post('removeGrid') ;


    }
   
      
    }







  }

  customElements.define("game-loadingbar", GameLoadingbar);

