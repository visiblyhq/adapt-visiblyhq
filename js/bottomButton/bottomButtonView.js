import ButtonsView from "core/js/views/buttonsView";
import a11y from "core/js/a11y";
import { templates } from "core/js/reactHelpers";
import ReactDOM from "react-dom";
import React from "react";

class BottomButtonView extends ButtonsView {
  initialize(options) {
    this.data = options.data;
    super.initialize(options);
  }

  render() {
    const Template = templates["bottomButton"];

    this.data.classes = this.data.isInitiallyDisabled ? "is-disabled" : "";
    this.data.isMainButton = true;

    const articleId = this.el.attributes["data-adapt-id"].value;
    var articleElement = document.getElementsByClassName(articleId)[0];
    const buttonDiv = document.createElement("div");
    buttonDiv.setAttribute("id", `button__${articleId}`);
    articleElement.append(buttonDiv);
    ReactDOM.render(<Template {...this.data} />, buttonDiv);
  }

  events() {
    return {
      "click .js-btn-action": "onMyButtonClick",
    };
  }

  onItemClick(event) {
    console.log(event);
  }

  onMyButtonClick(event) {
    if (this.data.text === "Submit") {
      super.onActionClicked();
    }

    this.data.onClick();
  }

  enable() {
    a11y.toggleEnabled(this.$(".js-btn-action"), true);
  }

  disable() {
    a11y.toggleEnabled(this.$(".js-btn-action"), false);
  }
}

BottomButtonView.template = "bottomButton.jsx";

export default BottomButtonView;
