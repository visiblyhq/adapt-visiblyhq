import Adapt from "core/js/adapt";
import { templates } from "core/js/reactHelpers";
import ReactDOM from "react-dom";
import React from "react";
import Router from "core/js/router";

class ResourcesOverlay extends Backbone.Controller {
  static getInstance() {
    if (ResourcesOverlay.instance === null) {
      ResourcesOverlay.instance = new ResourcesOverlay();
    }

    return ResourcesOverlay.instance;
  }

  initialize() {
    this.listenTo(Adapt, {
      "resourcesOverlay:show": this.show,
    });
  }

  show(event) {
    var articleId = event.currentArticle.get("_id");
    const existingElement = document.getElementById(
      `resources__overlay__${articleId}`
    );
    if (existingElement) {
      if (this.allowHide) {
        $(`#resources__overlay__${articleId}`).css({ display: "unset" });
      }
      return;
    }
    const Template = templates[this.template()];
    var articleElement = document.getElementsByClassName(articleId)[0];
    const resourcesOverlayDiv = document.createElement("div");
    resourcesOverlayDiv.setAttribute("id", `resources__overlay__${articleId}`);
    articleElement.append(resourcesOverlayDiv);

    var articleToNavigateTo;
    var previousArticle = event.children.filter(
      (el) => el.get("_id") == event.currentArticle.get("_previous")
    )[0];
    while (!articleToNavigateTo && previousArticle) {
      if (previousArticle.get("_visType") !== "presentation") {
        previousArticle = event.children.filter(
          (el) => el.get("_id") == previousArticle.get("_previous")
        )[0];
        continue;
      }

      articleToNavigateTo = previousArticle;
    }

    const data = {
      onCloseClick: () => {
        this.allowHide = true;
        this.hide(articleId);
      },
      showBackButton: articleToNavigateTo ? true : false,
      onBackClick: () => {
        event.currentArticle.set("_skipPoint", true);
        $(".vistopnavbar_book_button").css({ opacity: "0.25" });
        Router.navigateToElement(articleToNavigateTo.get("_id"), {
          replace: true,
        });
      },
      resources: event.currentArticle.get("_vis")._resources,
    };
    ReactDOM.render(<Template {...data} />, resourcesOverlayDiv);
  }

  hide(articleId) {
    $(`#resources__overlay__${articleId}`).css({ display: "none" });
  }

  template() {
    return "resourcesOverlay";
  }
}

ResourcesOverlay.instance = null;

export default ResourcesOverlay;
