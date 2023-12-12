import Adapt from "core/js/adapt";

class VisTopNavBarProgressView extends Backbone.View {
  initialize(options) {
    this.parent = options.parent;
    this.articleCompletions = options.articleCompletions;
    this.addClasses();
    this.setUpEventListeners();
    this.setArticleCompletions();
    this.render();
    this.refresh();
  }

  addClasses() {
    this.$el.addClass("vistopnavbar__progress");
  }

  setUpEventListeners() {
    this.listenTo(Adapt.course, "bubble:change:_isComplete", this.refresh);
  }

  setArticleCompletions() {
    const articleCompletions = this.articleCompletions();
    this.model.set("articleCompletions", articleCompletions);
    return articleCompletions;
  }

  render() {
    const data = this.getRenderData();
    const template = Handlebars.templates[this.constructor.template];
    this.$el.html(template(data));
  }

  getRenderData() {
    const data = this.model.toJSON();
    data.ariaLabel = this.ariaLabel;
    data.type = this.type;
    return data;
  }

  refresh() {
    this.checkCompletion();
    var ac = this.articleCompletions();
    this.$(".js-indicator-bar").css({
      width: ac.percentage + "%",
    });
    this.$(".vistopnavbar__pagecount-span").replaceWith(
      `<span class="vistopnavbar__pagecount-span">${ac.completed} of ${ac.total}</span>`
    );
  }

  checkCompletion() {
    const articleCompletions = this.setArticleCompletions();
    this.$el
      .toggleClass("is-complete", articleCompletions.percentage === 100)
      .toggleClass("is-incomplete", articleCompletions.percentage !== 100);
  }
}

VisTopNavBarProgressView.template = "visTopNavBarProgress";

export default VisTopNavBarProgressView;
