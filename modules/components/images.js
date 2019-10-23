import { EventBus } from "../utils/EventBus.js";
import { range } from "../utils/utils.js";


const template = `
  <style>
    root {
      display: block;
      background-color: #FDFDFD;
      background-image: url(images/back.jpeg);
      background-position: 50% 50%;
      background-size: 80%;
      background-repeat: no-repeat;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
  </style>
  <root></root>
`;

class GameImage extends HTMLElement {

  /**
   * Liste les attributs à observer, déclenche la méthode 
   * attributeChangedCallback en cas de modification 
   * d’un des attributs observés
   * 
   * @return Array
   */
  static get observedAttributes() {
    return ['turned'];
  }

  
  /**
   * Handler attribute
   */
  get found() {
    return JSON.parse(this.getAttribute('found').toLocaleLowerCase());
  }
  set found(value) {
    this.setAttribute('found', value);
  }
 
  get turned() {
    return JSON.parse(this.getAttribute('turned').toLocaleLowerCase());
  }
  set turned(value) {
    this.setAttribute('turned', value);
  }


  constructor() {
    super();
    this.attachShadow({ mode: "open"});
    this.found  = false;
    this.turned = false;
    this.path   = null;

    this.addEventListener('click', event => {
      if(this.turned === false && this.found === false) {
        this.turned = true;
        this.shadowRoot.querySelector("root").style.backgroundImage = "url(images/game/" + this.path + ")";
        console.log(EventBus.post('onTurnImage'));
      }
    });

    EventBus.post('onCreateImageOnGrid', this);
    
  }

  /**
   * Méthode native (HTMLElement) appelé à chaque insertion
   * d'un élément dans le DOM, le rendu HTML est effectuté ici 
   */
  connectedCallback() {
    this.shadowRoot.innerHTML = template;
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
    if(attrName === 'turned' && newVal === 'false'){
      setTimeout(() => {
        this.shadowRoot.querySelector("root").style.backgroundImage = "url(images/back.jpeg)";
      }, 500);
     
    }
  }
}

customElements.define("game-image", GameImage);
