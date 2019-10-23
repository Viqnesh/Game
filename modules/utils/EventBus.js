
const eventCallbacksPairs = [];

class EventCallbacksPair  {
  constructor(eventType, callback) {
    this.eventType = eventType;
    this.callbacks = [callback]
  }
}

export class EventBus {
  
  /**
   * Recherche l'existance d'un event dans l'array eventCallbacksPairs
   * 
   * @param String eventType 
   * @return EventCallbackPair
   */
  static findEventCallbacksPair(eventType) {
    return eventCallbacksPairs.find(eventObject => 
      eventObject.eventType === eventType
    );
  }

  /**
   * Recherche l'existance d'un event dans l'array eventCallbacksPairs
   * 
   * @param String eventType 
   * @return int   index de l'eventCallbackPair trouvé
   */
  static findEventCallbacksPairIndex(eventType) {
    return eventCallbacksPairs.findIndex(eventObject => 
      eventObject.eventType === eventType
    );
  }


  /**
   * Permet le diffusion d'un evenement / declanche tous les callbacks
   * 
   * @param String eventType 
   * @param Mixed args 
   * @return void
   */
  static post(eventType, args) {
    const eventCallbacksPair = this.findEventCallbacksPair(eventType);

    if(!eventCallbacksPair) {
      console.error("Not find subscribers for event '" + eventType + "'" );
      return;
    }
    eventCallbacksPair.callbacks.forEach(callback => callback(args));
  }


  /**
   * Permet l'inscription à un event
   * 
   * @param String eventType 
   * @param Function callback 
   */
  static subscribe(eventType, callback) {
    const eventCallbacksPair = this.findEventCallbacksPair(eventType);
    
    if(eventCallbacksPair) {
      eventCallbacksPair.callbacks.push(callback);
    } else {
      eventCallbacksPairs.push(new EventCallbacksPair(eventType, callback));
    }
  }

  /**
   * Permet la désinscription à un event
   * 
   * @param String eventType
   * @return void
   */
  static unsubscribe(eventType) {
    const eventCallbacksPairIndex = this.findEventCallbacksPairIndex(eventType);

    if(eventCallbacksPairIndex === -1) {
      console.error("Not find subscribers for event '" + eventType + "'" );
      return;
    }

    eventCallbacksPairs.splice(eventCallbacksPairIndex, 1);
  }
}
