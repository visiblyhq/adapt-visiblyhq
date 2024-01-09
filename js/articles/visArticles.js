import Adapt from "core/js/adapt";
import BottomButtonView from "../bottomButton/bottomButtonView";
import Router from "core/js/router";

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
    });
  }

  updateArticleAttributes(page) {
    let articles = page.model
      .getChildren()
      .models.filter((el) => el.get("_type") === "article");

    for (let index = 0; index < articles.length; index++) {
      const children = articles[index].getChildren();

      var questionBlocks = children.filter((el) => {
        const componentType = el.getChildren().models[0].get("_component");
        return VisArticles.questionBlockTypes.includes(componentType);
      });

      if (articles[index].get("_vis")?._isPresentation === true) {
        articles[index].set("_visType", "presentation");
      } else if (questionBlocks.length !== 0) {
        articles[index].set("_visType", "question");
      } else {
        articles[index].set("_visType", "content");
      }

      if (index !== articles.length - 1) {
        articles[index].set("_next", articles[index + 1].get("_id"));
      }

      if (index !== 0) {
        articles[index].set("_previous", articles[index - 1].get("_id"));
      }

      this.listenTo(
        articles[index],
        "change:_isComplete",
        this.handleArticleComplete
      );
    }

    if (!articles.find((el) => el.get("_current"))) {
      articles[0].set("_current", true);
    }

    articles[articles.length - 1].set("_last", true);
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
      { articleModel: articleView.model },
      this._onArticleInView
    );
  }

  _onArticleInView(event, visible) {
    if (visible) {
      if (event.data.articleModel.get("_vis")?._referenceMaterials?.length) {
        $(".vistopnavbar_book_button").css({ opacity: "unset" });
      }
    }
  }

  addBottomButton(component) {
    var parentArticle = component.model._parentModel?._parentModel;
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
            this._navigateToArticle(parentArticle, restorePointArticle[0]);
            return;
          }

          if (isLastArticle) {
            AdaptExitChannel.postMessage("finish_button_clicked");
            return;
          }
          var nextArticle = children.filter(
            (el) => el.get("_id") === parentArticle.get("_next")
          )[0];
          this._navigateToArticle(parentArticle, nextArticle);
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

  _navigateToArticle(currentArticle, nextArticle) {
    currentArticle.set("_current", false);
    nextArticle.set("_current", true);
    Router.navigateToElement(nextArticle.get("_id"));
  }
}

VisArticles.instance = null;

export default VisArticles;
