import Adapt from "core/js/adapt";
import Backbone from "backbone";
import QuestionViews from "./questionViews/questionViews";
import Tutorful from "./tutorful/tutorful";
import VisArticles from "./articles/visArticles";
import VisInteractionEvents from "./interactionEvents/visInteractionEvents";
import VisTopNavBar from "./topNavBar/visTopNavBar";
import ReferenceMaterialOverlay from "./referenceMaterialOverlay/referenceMaterialOverlay";

class VisController extends Backbone.Controller {
  initialize() {
    this.listenTo(Adapt, {
      "app:languageChanged": this.onLanguageChange,
    });
    this.VisInteractionEvents = VisInteractionEvents.getInstance();
    this.questionViews = QuestionViews.getInstance();
    this.visArticles = VisArticles.getInstance();
    this.tutorful = Tutorful.getInstance();
    this.visTopNavBar = VisTopNavBar.getInstance();
    this.referenceMaterialOverlay = ReferenceMaterialOverlay.getInstance();
    const channel = new BroadcastChannel("DeviceBroadcastChannel");
    channel.onmessage = (event) => {
      var split = event.data.split(":");
      if (split[0] === "rotated") {
        Adapt.trigger("device:rotated", split[1]);
      }
    };
  }

  onLanguageChange() {
    this.stopListening();
    this.initialize();
  }
}

export default Adapt.visController = new VisController();
