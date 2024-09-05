// Modified version of: https://github.com/adaptlearning/adapt-contrib-pageLevelProgress/blob/master/js/completionCalculations.js
// Covered by License: https://github.com/adaptlearning/adapt-contrib-pageLevelProgress/blob/master/LICENSE

import Adapt from "core/js/adapt";

class Completion extends Backbone.Controller {
  calculateCompletion(contentObjectModel) {
    let articles = contentObjectModel.getAllDescendantModels().filter((el) => {
      return el.get("_type") === "article";
    });
    return {
      completed: articles.filter((item) => {
        return item.get("_isComplete");
      }).length,
      total: articles.length,
    };
  }

  getArticleCompletions(model) {
    const completions = this.calculateCompletion(model);

    return {
      completed: completions.completed,
      total: completions.total,
      percentage: Math.floor((completions.completed / completions.total) * 100),
    };
  }
}

export default Adapt.completion = new Completion();
