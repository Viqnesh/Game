import { getRandomListImages } from "../../config.js";
import { range } from "../utils/utils.js";
import { EventBus } from "../utils/EventBus.js";

const template = `
  <style>

  </style>
  `;


  class GameTitle extends HTMLElement {


 	// Constructeur
 	constructor() {

 		super();
 		this.attachShadow({ mode: "open" });
    
    EventBus.subscribe('changeTitle', () => {
      this.shadowRoot.querySelector('img').style.backgroundImage = "url(images/endLogo.png)" ;
      
    });

     
 	}


 	// Méthodes
 	connectedCallback() {
   
        const templateDyn = `
        <img src="images/logo.png" width="300px" align="center">`;

      this.shadowRoot.innerHTML = template + templateDyn;
 
  }
   
      
}
  customElements.define("game-title", GameTitle);

