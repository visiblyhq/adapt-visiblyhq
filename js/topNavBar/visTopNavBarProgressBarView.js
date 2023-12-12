import Adapt from "core/js/adapt";
import data from "core/js/data";
import completionCalculations from "./completionCalculations";
import NavigationButtonView from "core/js/views/NavigationButtonView";
import VisTopNavBarProgressView from "./visTopNavBarProgressView";

export default class VisTopNavBarProgressBarView extends NavigationButtonView {
  attributes() {
    const attributes = this.model.toJSON();
    return {
      name: attributes._id,
      role: "div",
      "data-order": attributes._order,
    };
  }

  static get template() {
    return "visTopNavBarProgressBar.jsx";
  }

  initialize(options) {
    super.initialize(options);
    this.pageModel = options.pageModel;
    _.bindAll(this, "updateProgressBar");
    this.refreshProgressBar = _.debounce(
      this.refreshProgressBar.bind(this),
      16
    );
    this.setUpEventListeners();
    this.render();
    this.addProgressBar();
    this.deferredUpdate();
  }

  setUpEventListeners() {
    this.listenTo(Adapt, {
      "router:location": this.updateProgressBar,
      "view:childAdded visTopNavBar:update": this.refreshProgressBar,
    });
    this.listenTo(
      data,
      "change:_isLocked change:_isComplete",
      this.refreshProgressBar
    );
  }

  addProgressBar() {
    this.progressView = new VisTopNavBarProgressView({
      model: this.pageModel,
      articleCompletions: this._getArticleCompletions.bind(this),
    });
    const $wrapper = this.$el.find(".vistopnavbar__progress-wrapper");
    $wrapper.prepend(this.progressView.$el);
  }

  _getArticleCompletions() {
    return completionCalculations.getArticleCompletions(this.pageModel);
  }

  deferredUpdate() {
    _.defer(this.updateProgressBar);
  }

  updateProgressBar() {
    this.progressView.refresh();
  }

  refreshProgressBar() {
    this.updateProgressBar();
  }
}
