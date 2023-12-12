import React from "react";

export default function BottomButton(props) {
  return (
    <React.Fragment>
      <div
        class={`vis-bottom-button__container ${
          props.isMainButton ? "main_button" : ""
        }`}
      >
        <button
          class={`btn-icon js-btn-action vis-bottom-button ${props.classes}`}
          aria-disabled={props.isInitiallyDisabled}
        >
          <div class="icon">{props.text}</div>
        </button>
      </div>
    </React.Fragment>
  );
}
