// Modified version of: https://github.com/adaptlearning/adapt-contrib-pageLevelProgress/blob/master/js/adapt-contrib-pageLevelProgress.js
// Covered by License: https://github.com/adaptlearning/adapt-contrib-pageLevelProgress/blob/master/LICENSE

import Adapt from "core/js/adapt";
import NavigationButtonModel from "core/js/models/NavigationButtonModel";
import VisTopNavBarReferenceMaterialButtonView from "./visTopNavBarReferenceMaterialButtonView";
import VisTopNavBarProgressBarView from "./visTopNavBarProgressBarView";
import VisTopNavBarQuitButtonView from "./visTopNavBarQuitButtonView";
import navigation from "core/js/navigation";

class VisTopNavBar extends Backbone.Controller {
  static getInstance() {
    if (VisTopNavBar.instance === null) {
      VisTopNavBar.instance = new VisTopNavBar();
    }

    return VisTopNavBar.instance;
  }

  initialize() {
    this.listenTo(Adapt, {
      "app:dataReady": this.onDataReady,
    });
  }

  onDataReady() {
    this.setUpEventListeners();
  }

  setUpEventListeners() {
    const headerIndicatorTypes = [
      "menu",
      "menuItem",
      "page",
      "article",
      "block",
      "component",
    ];

    const headerIndicatorEventNames = headerIndicatorTypes
      .concat([""])
      .join("View:render ");

    this.listenTo(Adapt, headerIndicatorEventNames);

    this.listenTo(Adapt, {
      "router:contentObject": this.renderNavigationBar,
    });

    this.listenTo(
      Adapt.course,
      "bubble:change:_isComplete",
      this.onCompletionChange
    );
  }

  onCompletionChange(event) {
    if (!location._currentId) return;

    const currentModel = data.findById(location._currentId);
    const completionState = {
      currentLocation:
        completionCalculations.getArticleCompletions(currentModel),
    };
    const hasChanged = !_.isMatch(
      this._previousCompletionState,
      completionState
    );
    if (!hasChanged) return;

    this._previousCompletionState = completionState;
    Adapt.trigger("visTopNavBar:percentageCompleteChange", completionState);
  }

  renderNavigationBar(pageModel) {
    // Remove built in navigation but keep basic bar
    let buttons = navigation.buttons;
    if (buttons) {
      buttons.forEach((el) => {
        navigation.removeButton(el);
      });
    }

    if (pageModel.get("_type") === "course") return;

    this.addQuitButton(pageModel);
    this.addReferenceMaterialButton(pageModel);

    this.addProgressBar(pageModel);
  }

  addQuitButton(pageModel) {
    const model = new NavigationButtonModel({
      _id: "vistopnavbar_quit",
      _order: -100,
      _classes: "vistopnavbar__item",
    });

    navigation.addButton(
      new VisTopNavBarQuitButtonView({
        model,
        pageModel,
      })
    );
  }

  addReferenceMaterialButton(pageModel) {
    const model = new NavigationButtonModel({
      _id: "vistopnavbar_reference-material",
      _order: 50,
      _classes: "vistopnavbar__item",
    });

    navigation.addButton(
      new VisTopNavBarReferenceMaterialButtonView({
        model,
        pageModel,
      })
    );
  }

  addProgressBar(pageModel) {
    const model = new NavigationButtonModel({
      _id: "vistopnavbar_nav",
      _order: -50,
      _classes: "vistopnavbar__progress__outer is-disabled",
    });

    navigation.addButton(
      new VisTopNavBarProgressBarView({
        model,
        pageModel,
      })
    );
  }
}

VisTopNavBar.instance = null;

export default VisTopNavBar;
