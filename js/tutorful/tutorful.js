import Adapt from "core/js/adapt";
import { templates } from "core/js/reactHelpers";
import ReactDOM from "react-dom";
import React from "react";
import { navigateToArticle } from "../utils";

class Tutorful extends Backbone.Controller {
  static getInstance() {
    if (Tutorful.instance === null) {
      Tutorful.instance = new Tutorful();
    }

    return Tutorful.instance;
  }

  initialize() {
    this.listenTo(Adapt, {
      "tutorView:triggerRender": this._renderView,
    });
  }

  template() {
    return "tutor";
  }

  _renderView(tutorfulView) {
    const isCorrect = tutorfulView.parentView.model.get("_isCorrect");
    const componentType = tutorfulView.parentView.model.get("_component");
    switch (componentType) {
      case "slider": {
        tutorfulView.$el.css({
          "z-index": 6,
        });

        var data = {
          isCorrect: isCorrect,
          selectedAnswerText:
            tutorfulView.parentView.model.get("_selectedItem").value,
          feedback: tutorfulView.parentView.model.get("feedbackMessage"),
        };

        if (!isCorrect) {
          data.correctAnswerText =
            tutorfulView.parentView.model.get("_correctAnswer");
        }
        break;
      }
      case "mcq": {
        var selectedAnswerModel = tutorfulView.parentView.model
          .getChildren()
          .models.find((el) => el.get("_isActive"));

        var feedback = selectedAnswerModel.get("feedback");

        if (feedback === "") {
          feedback = tutorfulView.parentView.model.get("feedbackMessage");
        }

        var data = {
          isCorrect: isCorrect,
          selectedAnswerText: selectedAnswerModel.get("text"),
          feedback: feedback,
        };

        if (!isCorrect) {
          var correctAnswerModel = tutorfulView.parentView.model
            .getChildren()
            .models.find((el) => el.get("_shouldBeSelected"));
          data.correctAnswerText = correctAnswerModel
            ? correctAnswerModel.get("text")
            : "No correct answer";
        }
        break;
      }
      case "gmcq": {
        var modelId = tutorfulView.model.get("_id");
        tutorfulView.$el.attr("id", modelId);

        tutorfulView.parentView.$el.css({
          "z-index": 0,
        });

        var selectedAnswerModel = tutorfulView.parentView.model
          .getChildren()
          .models.find((el) => el.get("_isActive"));

        var feedback = selectedAnswerModel.get("feedback");

        if (feedback === "") {
          feedback = tutorfulView.parentView.model.get("feedbackMessage");
        }

        var data = {
          isCorrect: isCorrect,
          feedback: feedback,
          allowHideFeedback: false,
          modelId: modelId,
        };
        break;
      }
    }

    const isLastArticle =
      tutorfulView.parentView.model._parentModel._parentModel.get("_last");

    data.buttonText = isLastArticle ? "Finish" : "Continue";

    data.onContinue = () => {
      if (!isLastArticle) {
        $(".vistopnavbar_book_button").css({ opacity: "0.25" });
        var parentBlockModel = tutorfulView.parentView.model._parentModel;
        var currentArticle = parentBlockModel._parentModel;

        var nextArticle = currentArticle._parentModel
          .getChildren()
          .find((el) => el.get("_id") === currentArticle.get("_next"));

        if (nextArticle) {
          navigateToArticle(currentArticle, nextArticle);
        }
        return;
      }
      AdaptExitChannel.postMessage("finish_button_clicked");
    };

    const articleId =
      tutorfulView.parentView.model._parentModel._parentModel.get("_id");

    const article = $(`.${articleId}`);

    article
      .find(".vis-bottom-button__container.main_button")
      .css({ display: "none" });

    const Template = templates[this.template()];
    ReactDOM.render(<Template {...data} />, article.find(".article__inner")[0]);
  }
}

Tutorful.instance = null;

export default Tutorful;
