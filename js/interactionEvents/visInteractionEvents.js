import Adapt from "core/js/adapt";

class VisInteractionEvents extends Backbone.Controller {
  static getInstance() {
    if (VisInteractionEvents.instance === null) {
      VisInteractionEvents.instance = new VisInteractionEvents();
    }

    return VisInteractionEvents.instance;
  }

  initialize() {
    this.listenTo(Adapt, {
      "visibly:event": this.logInteractionEvent,
    });
  }


  logInteractionEvent(event) {
    try {
      AdaptEventTrackingChannel?.postMessage(event);
    } catch (error) {
      console.log('Caught notification channel error');
    }
  }
}

VisInteractionEvents.instance = null;

export default VisInteractionEvents;
