import * as React from "react";

export default function Tutor(data) {
  const [hideButtonText, setHideButtonText] = React.useState("Hide");
  const [hideFeedback, setHideFeedback] = React.useState(false);

  const onHideButton = () => {
    var overlayEl = document.getElementById(data.modelId);
    if (hideFeedback) {
      setHideButtonText("Hide");
      setHideFeedback(false);

      overlayEl.style.zIndex = 6;
    } else {
      setHideButtonText("Show");
      setHideFeedback(true);
      var overlayEl = document.getElementById(data.modelId);

      overlayEl.style.zIndex = -10;
    }
  };
  return (
    <>
      <div className="feedback-view__panel">
        <div
          style={{
            display: hideFeedback ? "none" : "inherit",
            flexDirection: "inherit",
            height: "inherit",
          }}
        >
          <div
            className="feedback-view__answer-box"
            style={{
              borderColor: data.isCorrect ? "#04d2a1" : "#ff6474",
            }}
          >
            <div style={{ margin: 10, width: "100%" }}>
              <div style={{ width: "70%", float: "left" }}>
                <p
                  className="feedback-view__text"
                  style={{
                    color: data.isCorrect ? "#04d2a1" : "#ff6474",
                    fontSize: 16,
                    lineHeight: data.selectedAnswerText ? "inherit" : "3rem",
                    marginBottom: data.selectedAnswerText ? 10 : 0,
                  }}
                >
                  {data.isCorrect ? "CORRECT" : "INCORRECT"}
                </p>
                {data.isCorrect && data.selectedAnswerText ? (
                  <>
                    <p
                      className="feedback-view__text"
                      style={{ fontWeight: "lighter" }}
                    >
                      My Answer
                    </p>
                    <p className="feedback-view__text">
                      {data.selectedAnswerText}
                    </p>
                  </>
                ) : null}
                {!data.isCorrect && data.selectedAnswerText ? (
                  <>
                    <p
                      className="feedback-view__text"
                      style={{ fontWeight: "lighter" }}
                    >
                      Correct Answer
                    </p>
                    <p className="feedback-view__text">
                      {data.correctAnswerText}
                    </p>
                  </>
                ) : null}
              </div>
            </div>
          </div>
          <div style={{ overflow: "auto", marginBottom: 98, marginRight: 3 }}>
            <p dangerouslySetInnerHTML={{ __html: data.feedback }}></p>
          </div>
        </div>
      </div>
      <div
        className="vis-bottom-button__container"
        style={{
          margin: 0,
        }}
      >
        {data.allowHideFeedback ? (
          <button
            class="btn-icon vis-bottom-button"
            onClick={onHideButton}
            style={{ width: "calc(50% - 10px)" }}
          >
            <span>{hideButtonText}</span>
          </button>
        ) : null}
        <button
          class="btn-icon vis-bottom-button"
          onClick={data.onContinue}
          style={{
            width: data.allowHideFeedback ? "calc(50% - 10px)" : "",
            left: data.allowHideFeedback ? "calc(50% + 10px)" : "",
          }}
        >
          <div>{data.buttonText}</div>
        </button>
      </div>
    </>
  );
}
