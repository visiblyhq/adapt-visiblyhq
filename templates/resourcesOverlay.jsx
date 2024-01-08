import React from "react";
import { templates } from "core/js/reactHelpers";

export default function ResourcesOverlay(props) {
  return (
    <React.Fragment>
      <div class="resources__overlay__container">
        <div class="resources__overlay__nav-bar">
          <button
            class="vis-bottom-button"
            style={{
              margin: 25,
              padding: 11,
              width: "calc(100vw - 117px)",
              bottom: "unset",
              display: props.showBackButton ? "block" : "none",
            }}
            onClick={props.onBackClick}
          >
            <div class="icon">Back to presentation</div>
          </button>
          <div
            className="vistopnavbar__button-wrapper vistopnavbar_book_button"
            style={{ margin: 25, float: "right", opacity: 1 }}
            onClick={props.onCloseClick}
          >
            <svg
              width="42"
              height="38"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"
                fill="#0F0F0F"
              />
            </svg>
          </div>
        </div>
        <div style={{ padding: "0px 25px" }}>
          {props.resources.map((element) => {
            switch (element.type) {
              case "text":
                return (
                  <p
                    style={{ paddingBottom: 25 }}
                    dangerouslySetInnerHTML={{ __html: element.text }}
                  ></p>
                );
              case "image":
                return (
                  <div style={{ paddingBottom: 25 }}>
                    <templates.image
                      {...element._graphic}
                      aria-hidden={true}
                      id={`graphic__scroll__container__test`}
                      longDescriptionId={`graphic__longdescription__test`}
                      classes="js-graphic-scroll-container"
                      classNamePrefixes={["component", "graphic"]}
                    />
                  </div>
                );
            }
          })}
        </div>
      </div>
    </React.Fragment>
  );
}
