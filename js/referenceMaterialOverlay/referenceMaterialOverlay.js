import Adapt from "core/js/adapt";
import { templates } from "core/js/reactHelpers";
import ReactDOM from "react-dom";
import React from "react";
import MediaView from "components/adapt-contrib-media/js/mediaView";
import ComponentModel from "core/js/models/componentModel";
import { navigateToArticle } from "../utils";

class ReferenceMaterialOverlay extends Backbone.Controller {
  static getInstance() {
    if (ReferenceMaterialOverlay.instance === null) {
      ReferenceMaterialOverlay.instance = new ReferenceMaterialOverlay();
    }

    return ReferenceMaterialOverlay.instance;
  }

  initialize() {
    this.listenTo(Adapt, {
      "referenceMaterialOverlay:show": this.show,
    });
  }

  show(event) {
    var articleId = event.currentArticle.get("_id");
    const existingElement = document.getElementById(
      `reference-material-overlay__${articleId}`
    );
    if (existingElement) {
      if (this.allowHide) {
        $(`#reference-material-overlay__${articleId}`).css({
          display: "unset",
        });
      }
      return;
    }

    const Template = templates[this.template()];
    var articleElement = document.getElementsByClassName(articleId)[0];
    const referenceMaterialOverlayDiv = document.createElement("div");
    referenceMaterialOverlayDiv.setAttribute(
      "id",
      `reference-material-overlay__${articleId}`
    );
    articleElement.append(referenceMaterialOverlayDiv);

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

    var videoMaterials =
      event.currentArticle
        .get("_vis")
        ?._referenceMaterials?.filter((element) => element.type === "video") ??
      [];

    for (let index = 0; index < videoMaterials.length; index++) {
      const element = videoMaterials[index];
      const videoComponent = element._videoComponent;
      videoComponent._component = "media";
      videoComponent.displayTitle = "";

      var mediaView = new MediaView({
        model: new ComponentModel(videoComponent),
      });

      videoComponent.component = mediaView.$el[0];
      videoComponent.index = index;
    }

    const data = {
      onCloseClick: () => {
        this.hide(articleId);
      },
      backButtonText: this._getBackButtonText(articleToNavigateTo),
      showBackButton: articleToNavigateTo ? true : false,
      onBackClick: () => {
        event.currentArticle.set("_skipPoint", true);

        $(".vistopnavbar_book_button").css({ opacity: "0.25" });

        this.hide(articleId);
        navigateToArticle(event.currentArticle, articleToNavigateTo);
      },
      referenceMaterials:
        event.currentArticle.get("_vis")?._referenceMaterials ?? [],
    };
    ReactDOM.render(<Template {...data} />, referenceMaterialOverlayDiv);

    videoMaterials.forEach((element) => {
      $(`.video-material__${element._videoComponent.index}`).html(
        element._videoComponent.component
      );
    });
  }

  hide(articleId) {
    this.allowHide = true;
    $(`#reference-material-overlay__${articleId}`).css({ display: "none" });
  }

  template() {
    return "referenceMaterialOverlay";
  }

  _getBackButtonText(presentationArticle) {
    var primaryContentType = presentationArticle.get("_vis")["_primaryContentType"] ?? "auto-detect";

    var videoMessage = "Watch video again";
    var imageMessage = "View image again";
    var presentationMessage = "View presentation again";

    if (primaryContentType !== "auto-detect") {
      switch (primaryContentType) {
        case "video":
          return videoMessage;
        case "image":
          return imageMessage;
        case "text":
          return presentationMessage;
      }
    }
    else {
      var components = presentationArticle
        .getAllDescendantModels()
        .filter((element) => element.get("_type") === "component");

      var isVideo = components.some(
        (element) => element.get("_component") === "media"
      );
      if (isVideo) {
        return videoMessage;
      }
      var isImage = components.some(
        (element) => element.get("_component") === "graphic"
      );
      if (isImage) {
        return imageMessage;
      }
      return presentationMessage;
    }
  }
}

ReferenceMaterialOverlay.instance = null;

export default ReferenceMaterialOverlay;
