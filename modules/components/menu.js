import { getRandomListImages } from "../../config.js";
import { range } from "../utils/utils.js";
import { EventBus } from "../utils/EventBus.js";


const template = `
  <style>
    .menu {
        width : 5% ;
        height :30% ;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        flex-wrap: wrap;
        padding-bottom : 30px ;
        justify-content: center;
        align-content: center;
    }

    input {
        margin : 10px ;
        margin: 20px auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: center;
        height : 40px ;
        width : 25%; ;
    }

    h2 {
      text-align : center ;
    }

    .affMenu {

    }
  </style>
  
       
    `;


class GameMenu extends HTMLElement {

  /**
   * Handler attribute
   */
  
  get difficulty() {
    return parseInt(this.getAttribute('difficulty'), 10);
  }
  set difficulty(value) {
    this.setAttribute('difficulty', value);
  }

  get name() {
    return this.getAttribute('name');
  }
  set name(value) {
    this.setAttribute('name', value);
  }
  
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.difficulty = this.difficulty ;
    this.name = this.name ; 

    
    EventBus.subscribe('displayMenu', () => {
      this.shadowRoot.querySelector('.affMenu').style.display = "" ;  
    });
  }


  /**
   * Méthode native (HTMLElement) appelé à chaque insertion
   * d'un élément dans le DOM, le rendu HTML est effectuté ici 
   */
  connectedCallback() {
    const templateDyn = `
    <div class="affMenu">
    <input class="rookie" type="button" value="Recrue" id="6">
    <input class="diffi" type="button" value="Normal" id="4">
    <input class="master" type="button" value="Maitre" id="3">
    </div>`;
    this.shadowRoot.innerHTML = template + templateDyn;
    let vie = 0 ; 
    this.shadowRoot.querySelector('.rookie').addEventListener('click', event => {
      this.difficulty = this.shadowRoot.querySelector('.rookie').id ;
      EventBus.post('nbCards', this);
      console.log("vie = "+this.difficulty) ;
      EventBus.post('createElement', this);
      
      console.log(this.shadowRoot.querySelector('.affMenu').style.display = "none" ) ;
      
      EventBus.post('displayGrid', this);
      
      

      
    }
  );
  this.shadowRoot.querySelector('.diffi').addEventListener('click', event => {
    this.difficulty = this.shadowRoot.querySelector('.diffi').id ;
    EventBus.post('nbCards', this);
    console.log("vie = "+this.difficulty) ;
    EventBus.post('createElement', this);
    console.log(this.shadowRoot.querySelector('.affMenu').style.display = "none" ) ;
    

    EventBus.post('displayGrid', this);
    
    

    
  }
);
this.shadowRoot.querySelector('.master').addEventListener('click', event => {
  this.difficulty = this.shadowRoot.querySelector('.master').id ;
  EventBus.post('nbCards', this);
  EventBus.post('createElement', this);
  this.shadowRoot.querySelector('.affMenu').style.display = "none" ;
  
  EventBus.post('displayGrid', this);
  
  

  
}
);
  }
    


  /**
   * Méthode déclenchée en cas de mise à jour des attributs observés.
   * Voir méthode : observedAttributes
   * 
   * @param String attrName 
   * @param Mixed oldVal 
   * @param Mixed newVal 
   */
  }


  



customElements.define("game-menu", GameMenu);
