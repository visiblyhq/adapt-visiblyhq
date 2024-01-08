import NavigationButtonView from "core/js/views/NavigationButtonView";
import Router from "core/js/router";
import Adapt from "core/js/adapt";

export default class VisTopNavBarResourcesButtonView extends NavigationButtonView {
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
    return "visTopNavBarResourcesButton.jsx";
  }

  initialize(options) {
    super.initialize(options);
    this.pageModel = options.pageModel;
    this.render();
  }

  onClicked(event) {
    var children = this.pageModel.getChildren()?.models;

    var currentArticle = children.filter((el) => el.get("_current"))[0];
    if (!currentArticle.get("_vis")?._resources.length) {
      return;
    }

    Adapt.trigger("resourcesOverlay:show", {
      children: children,
      currentArticle: currentArticle,
    });
  }
}
