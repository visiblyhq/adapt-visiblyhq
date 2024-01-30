import NavigationButtonView from "core/js/views/NavigationButtonView";
import Adapt from "core/js/adapt";
import { isBookButtonAvailable } from "../utils";

export default class VisTopNavBarReferenceMaterialButtonView extends NavigationButtonView {
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
    return "visTopNavBarReferenceMaterialButton.jsx";
  }

  initialize(options) {
    super.initialize(options);
    this.pageModel = options.pageModel;
    this.render();
  }

  onClicked(event) {
    var children = this.pageModel.getChildren()?.models;

    var currentArticle = children.filter((el) => el.get("_current"))[0];
    if (!isBookButtonAvailable(children, currentArticle)) {
      return;
    }

    Adapt.trigger("referenceMaterialOverlay:show", {
      children: children,
      currentArticle: currentArticle,
    });
  }
}
