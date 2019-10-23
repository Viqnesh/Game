import { getRandomListImages } from "../../config.js";
import { range } from "../utils/utils.js";
import { EventBus } from "../utils/EventBus.js";


const template = `
  <style>
    .grid-container {
      width: 20%;
      padding-top : 35px ;
      margin-left: auto;
      margin-right: auto;
      display: none ;
      flex-wrap: wrap;
      justify-content: center;
      align-content: center;
    }
    .grid-cell {
      position: relative;
      height: 50px;
      width: 50px;
      margin: 8px;
      background-color: #944;
    }

  </style>`;


class GameGrid extends HTMLElement {
  
  static get observedAttributes() {
    return ["numberImages"];
  }

  get numberImages() {
    return parseInt(this.getAttribute('numberImages'), 10);
  }
  set numberImages(value) {
    this.setAttribute('numberImages', value);
  }

  get repeatImages() {
    return parseInt(this.getAttribute('repeatImages'), 10);
  }
  set repeatImages(value) {
    this.setAttribute('repeatImages', value);
  }
  
  get foundCards() {
    return parseInt(this.getAttribute('repeatImages'), 10);
  }
  set foundCards(value) {
    this.setAttribute('foundCards', value);
  }
  


  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.numberImages = this.numberImages || 5;
    this.repeatImages = 2;
    this.foundCards = 0 ; 
    this.listImages   = getRandomListImages(this.numberImages);
    this.mapping      = [];



    EventBus.subscribe('onCreateImageOnGrid', image => {

      this.mapping.push(this.initGridImagePath(image));
    });
    

    EventBus.subscribe('onTurnImage', () => {
      this.tryGridCombination(this.findGridImagesTurned());
    });

    EventBus.subscribe('foundImage', () => {
      this.mapping(turnedImages);
    });


    EventBus.subscribe('displayGrid', () => {
      
      this.shadowRoot.querySelector('.grid-container').style.display = "flex" ; 
    });
    EventBus.subscribe('removeGrid', () => {
      this.shadowRoot.querySelector('.grid-container').style.display = "none" ; 
    

    });

    EventBus.subscribe('nbCards' , menu => {
        if (menu.difficulty === 3 ) {
            this.numberImages = 7 ;
            
        }
        else if (menu.difficulty === 4) {
          this.numberImages = 7 ;
        }


    })
  }


  /**
   * Méthode native (HTMLElement) appelé à chaque insertion
   * d'un élément dans le DOM, le rendu HTML est effectuté ici 
   */
  connectedCallback() {
    const templateDyn = `
      <div class='affGrid'>
      <div class='grid-container'>
        ${range(this.repeatImages * this.numberImages).map( n =>
          `<div class='grid-cell'>
            <game-image></game-image>
          </div>`
        ).join("")}
      </div>
      </div>`;
    this.shadowRoot.innerHTML = template + templateDyn;
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === 'numberImages' && newVal === '7') {
        console.log("Reussi");
      
    }
   
      
  }

  /**
  * Initialisation des images présentes dans la grille
  *
  * Utilisation Do while plus simple, car l'on check this.mapping
  * qui est une liste non finie en cours évolution a ce moment-là.
  *
  * @param  image sans path initialisé
  * @return image avec path initialisé  
  */
  initGridImagePath(image) {
    let countRepeat;

    do { 
      countRepeat = 0;
      image.path  = this.listImages[Math.floor(Math.random() * this.listImages.length)];
      this.mapping.forEach(element => {
        if(element.path === image.path) {
          countRepeat++;
        }
      });
    } while(countRepeat >= this.repeatImages);

    return image;
  }


  /**
   * Récupère toutes les images retournées non trouvées de la grille
   * 
   * @return Array
   */
  findGridImagesTurned() {
    return this.mapping.filter(image => image.turned == true && image.found === false);
  }


  /**
   * Récupère toutes les images retournées et trouvées de la grille
   * 
   * @return Array
   */
  findGridImagesFound() {
    return this.mapping.filter(image => image.turned == true && image.found === true);
    
  }


  /**
   * Marque les images de la liste comme étant trouvées
   * 
   * @param Array turnedImages 
   * @return void
   */
  markFoundImage(turnedImages) {
    turnedImages.map(image => image.found = true);
  }


  /**
   * Réinitialise les images de la liste
   * 
   * @param Array turnedImages 
   * @return void
   */
  turnOffImage(turnedImages) {
    turnedImages.map(image => image.turned = false);
  }


  /**
   * Test les combinaisons d'image de toutes les images retournées
   * - En cas de success : Marque les images comme trouvées
   * - En cas d’échec    : Réinitialise les images
   * 
   * @param Array turnedImages
   * @return void
   */
  tryGridCombination(turnedImages) {
    let countSimilar = turnedImages.reduce((accumulator, currentImage) => {
      return accumulator += turnedImages[0].path === currentImage.path ? 1 : 0;
    }, 0);

    if(turnedImages.length === this.repeatImages && countSimilar === this.repeatImages) {
      this.markFoundImage(turnedImages);
      this.foundCards = this.foundCards + 1 ; 

    }

    if(turnedImages.length === this.repeatImages && countSimilar !== this.repeatImages) {
      this.turnOffImage(turnedImages);
      EventBus.post('removeElement') ;

    }
  }




}


customElements.define("game-grid", GameGrid);
