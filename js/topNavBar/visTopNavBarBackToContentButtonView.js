import NavigationButtonView from "core/js/views/NavigationButtonView";
import Router from "core/js/router";

export default class VisTopNavBarBackToContentButtonView extends NavigationButtonView {
  events() {
    return {
      click: "onClicked",
    };
  }

  attributes() {
    const attributes = this.model.toJSON();
    return {
      name: attributes._id,
      "data-order": attributes._order,
    };
  }

  static get template() {
    return "visTopNavBarBackToContentButton.jsx";
  }

  initialize(options) {
    super.initialize(options);
    this.pageModel = options.pageModel;
    this.render();
  }

  onClicked(event) {
    var children = this.pageModel.getChildren()?.models;

    var currentArticle = children.filter((el) => el.get("_current"))[0];
    if (currentArticle.get("_visType") === "presentation") {
      return;
    }

    var articleToNavigateTo;
    var previousArticle = children.filter(
      (el) => el.get("_id") == currentArticle.get("_previous")
    )[0];
    while (!articleToNavigateTo) {
      if (previousArticle.get("_visType") !== "presentation") {
        previousArticle = children.filter(
          (el) => el.get("_id") == previousArticle.get("_previous")
        )[0];
        continue;
      }

      articleToNavigateTo = previousArticle;
    }

    Router.navigateToElement(articleToNavigateTo.get("_id"), {
      replace: true,
    });
  }
}
