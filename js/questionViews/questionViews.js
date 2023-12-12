import Adapt from "core/js/adapt";
import BottomButtonView from "../bottomButton/bottomButtonView";

class QuestionViews extends Backbone.Controller {
  static getInstance() {
    if (QuestionViews.instance === null) {
      QuestionViews.instance = new QuestionViews();
    }

    return QuestionViews.instance;
  }

  initialize() {
    this.listenTo(Adapt, {
      "questionView:AddButtonsView": this.addButton,
    });
  }

  addButton(questionView) {
    var parentArticle = questionView.model._parentModel._parentModel;
    questionView.buttonsView = new BottomButtonView({
      el: $(`.${parentArticle.get("_id")}`),
      data: {
        text: "Submit",
        onClick: () => {},
        isInitiallyDisabled:
          questionView.model.get("_isButtonInitiallyDisabled") ?? true,
      },
      model: questionView.model,
    });

    questionView.listenTo(
      questionView.buttonsView,
      "buttons:stateUpdate",
      questionView.onButtonStateUpdate
    );
  }
}

QuestionViews.instance = null;

export default QuestionViews;
