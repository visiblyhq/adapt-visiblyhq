import Adapt from "core/js/adapt";
import Backbone from "backbone";
import QuestionViews from "./questionViews/questionViews";
import Tutorful from "./tutorful/tutorful";
import VisArticles from "./articles/visArticles";
import VisTopNavBar from "./topNavBar/visTopNavBar";

class VisController extends Backbone.Controller {
  initialize() {
    this.listenTo(Adapt, {
      "app:languageChanged": this.onLanguageChange,
    });
    this.questionViews = QuestionViews.getInstance();
    this.questionViews.initialize();
    this.visArticles = VisArticles.getInstance();
    this.visArticles.initialize();
    this.tutorful = Tutorful.getInstance();
    this.visTopNavBar = VisTopNavBar.getInstance()
  }

  onLanguageChange() {
    this.stopListening();
    this.initialize();
  }
}

export default Adapt.visController = new VisController();
