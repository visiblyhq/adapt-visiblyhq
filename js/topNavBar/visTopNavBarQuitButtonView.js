import NavigationButtonView from "core/js/views/NavigationButtonView";
import Adapt from "core/js/adapt";

export default class VisTopNavBarQuitButtonView extends NavigationButtonView {
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
    return "visTopNavBarQuitButton.jsx";
  }

  initialize(options) {
    super.initialize(options);
    this.pageModel = options.pageModel;
    this.render();
  }

  onClicked(event) {
    Adapt.trigger("visibly:event", "topNavBar.quitButton.click");
    
    //would be good to update this but will need to do it in app
    AdaptExitChannel.postMessage("menu_button_clicked");
  }

  remove() {
    super.remove();
  }
}
