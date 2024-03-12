import Adapt from "core/js/adapt";
import BottomButtonView from "../bottomButton/bottomButtonView";
import { isBookButtonAvailable, navigateToArticle } from "../utils";

class VisArticles extends Backbone.Controller {
  static getInstance() {
    if (VisArticles.instance === null) {
      VisArticles.instance = new VisArticles();
    }

    return VisArticles.instance;
  }

  initialize() {
    this.listenTo(Adapt, {
      "pageView:postRender": this.updateArticleAttributes,
      "componentView:postRender": this.addBottomButton,
      "articleView:postRender": this.articlePostRender,
      "device:rotated": this._onDeviceRotated,
      "blockView:childAdded": this.onChildAddedToPage,
    });
    $("body").addClass("orientation-portraitUp");
  }

  onChildAddedToPage(parentView, childView) {
    if (
      parentView.model.get("_type") === "page" &&
      childView.model.get("_type") === "block"
    ) {
      $(`div[data-adapt-id="${childView.model.get("_id")}"]`).remove();
    }
  }

  updateArticleAttributes(page) {
    this.articles = page.model
      .getChildren()
      .models.filter((el) => el.get("_type") === "article");

    for (let index = 0; index < this.articles.length; index++) {
      const children = this.articles[index].getChildren();

      var questionBlocks = children.filter((el) => {
        const componentType = el.getChildren().models[0].get("_component");
        return VisArticles.questionBlockTypes.includes(componentType);
      });

      if (this.articles[index].get("_vis")?._isPresentation === true) {
        this.articles[index].set("_visType", "presentation");
      } else if (questionBlocks.length !== 0) {
        this.articles[index].set("_visType", "question");
      } else {
        this.articles[index].set("_visType", "content");
      }

      if (index !== this.articles.length - 1) {
        this.articles[index].set("_next", this.articles[index + 1].get("_id"));
      }

      if (index !== 0) {
        this.articles[index].set(
          "_previous",
          this.articles[index - 1].get("_id")
        );
      }

      this.listenTo(
        this.articles[index],
        "change:_isComplete",
        this.handleArticleComplete
      );
    }

    if (!this.articles.find((el) => el.get("_current"))) {
      this.articles[0].set("_current", true);
    }

    this.articles[this.articles.length - 1].set("_last", true);
  }

  handleArticleComplete(event) {
    event.bottomButtonView?.enable();
  }

  static get questionBlockTypes() {
    return ["mcq", "gmcq", "slider"];
  }

  articlePostRender(articleView) {
    articleView.$el.on(
      "inview",
      { articleModel: articleView.model, articles: this.articles },
      this._onArticleInView
    );

    if (articleView.model.get("_current")) {
      $(`div[data-adapt-id="${this.articles[0].get("_id")}"]`).css({
        display: "block",
      });
    }
  }

  _onDeviceRotated(orientation) {
    $("body").removeClass(function (index, className) {
      return (className.match(/\borientation-\S+/g) || []).join(" ");
    });
    $("body").addClass(`orientation-${orientation}`);
  }

  _onArticleInView(event, visible) {
    if (visible) {
      if (isBookButtonAvailable(event.data.articles, event.data.articleModel)) {
        $(".vistopnavbar_book_button").css({ opacity: "unset" });
      }
      var componentTypes = event.data.articleModel
        .getAllDescendantModels()
        .filter((el) => el.get("_type") == "component")
        .map((el) => el.get("_component"));
        
      var hasQuestion = false;
      componentTypes.forEach((element) => {
        if (VisArticles.questionBlockTypes.includes(element)) {
          hasQuestion = true;
        }
      });

      if (!hasQuestion) {
        event.data.articleModel.setCompletionStatus();
      }
    }
  }

  addBottomButton(componentView) {
    var parentArticle = componentView.model.getParent().getParent();
    if (!parentArticle) {
      return;
    }
    var articleType = parentArticle.get("_visType");

    //add margin to bottom of last article to make sure that content isn't covered
    var children = parentArticle.getChildren().models;
    var lastBlockId = children[children.length - 1].get("_id");
    $(`.${lastBlockId}`).find(".block__inner").css({ "margin-bottom": "98px" });

    if (articleType === "question") {
      return;
    }

    //ensure only one button is added
    var bottomButtonsForArticle = $(`.${parentArticle.get("_id")}`).find(
      ".vis-bottom-button__container.main_button"
    );
    if (bottomButtonsForArticle.length != 0) {
      return;
    }

    const isLastArticle = parentArticle.get("_last");

    parentArticle.bottomButtonView = new BottomButtonView({
      el: `.${parentArticle.get("_id")}`,
      data: {
        text: isLastArticle ? "Finish" : "Continue",
        onClick: () => {
          $(".vistopnavbar_book_button").css({ opacity: "0.25" });
          var children = parentArticle.getSiblings()?.models;
          var restorePointArticle = children.filter((el) =>
            el.get("_skipPoint")
          );
          if (restorePointArticle.length != 0) {
            restorePointArticle[0].set("_skipPoint", undefined);
            navigateToArticle(parentArticle, restorePointArticle[0]);
            return;
          }

          if (isLastArticle) {
            AdaptExitChannel.postMessage("finish_button_clicked");
            return;
          }
          var nextArticle = children.filter(
            (el) => el.get("_id") === parentArticle.get("_next")
          )[0];
          navigateToArticle(parentArticle, nextArticle);
        },
      },
    });

    var componentsThatRequiresCompletion = parentArticle
      .getAllDescendantModels()
      .filter((el) => {
        if (el.get("_type") === "component") {
          var setCompletionOn = el.get("_setCompletionOn");
          if (setCompletionOn && setCompletionOn !== "inview") {
            return true;
          }
        }
        return false;
      });

    if (
      !parentArticle.get("_isComplete") &&
      componentsThatRequiresCompletion.length != 0
    ) {
      parentArticle.bottomButtonView.disable();
    }
  }
}

VisArticles.instance = null;

export default VisArticles;
