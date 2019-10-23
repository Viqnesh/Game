import { getRandomListImages } from "../../config.js";
import { range } from "../utils/utils.js";
import { EventBus } from "../utils/EventBus.js";

const template = `
  <style>
    .progress {
      width : 25% ;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-content: center;
  	  height : 15% ;
       }

    .progress-container {
      position : relative ;
      height: 50px;
      width: 50px;

    }
  </style>`;


  class GameLoadingbar extends HTMLElement {

  	// Get / Set
  	get difficulty() {
    	return parseInt(this.getAttribute('difficulty'), 10);
  	}
 	set difficulty(value) {
    	this.setAttribute('difficulty', value);
  	}
 	
 	/*get nblife() {
    return parseInt(this.getAttribute('difficulty'), 10);
 	}

 	set nblife(value) {
 		this.setAttribute('nblife' , value) ;
 	}*/

 	// Constructeur
 	constructor() {

 		super();
 		this.attachShadow({ mode: "open" });
 		this.difficulty = this.difficulty ;
    this.answer = true ;
    this.nblife = [] ;
    for (var i = 0; i < this.difficulty ; i++) {
        this.nblife.push("x") ;
      };
     console.log(this.nblife);
 	}


 	// Méthodes
 	connectedCallback() {
    const templateDyn = `
      <div class='progress'>
        ${range(this.nblife.length).map( n =>
          `<div class='progress-container'>
              <img src="images/lifebar.png" width="25px" height="25px"> 
                        </div>`
        ).join("")}
      </div>`;
      
      console.log(this.difficulty);
     
    this.shadowRoot.innerHTML = template + templateDyn;
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
    if(attrName === 'answer' && newVal === 'false'){
      this.nblife.pop();

    }
  }







  }

  customElements.define("game-display", GameDisplay);

