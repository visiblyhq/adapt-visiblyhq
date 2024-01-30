import React from "react";
import { templates } from "core/js/reactHelpers";

export default function ReferenceMaterialOverlay(props) {
  return (
    <React.Fragment>
      <div class="reference-material-overlay__container">
        <div class="reference-material-overlay__nav-bar">
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
            <div class="icon">{props.backButtonText}</div>
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
          {props.referenceMaterials.length > 0 ? (
            props.referenceMaterials.map((element) => {
              switch (element.type) {
                case "text":
                  return (
                    <div
                      style={{ paddingBottom: 25, margin: 0 }}
                      dangerouslySetInnerHTML={{
                        __html: element._textComponent.text,
                      }}
                    />
                  );
                case "image":
                  return (
                    <div style={{ paddingBottom: 25 }}>
                      <templates.image
                        {...element._imageComponent}
                        aria-hidden={true}
                        id={`graphic__scroll__container__test`}
                        longDescriptionId={`graphic__longdescription__test`}
                        classes="js-graphic-scroll-container"
                        classNamePrefixes={["component", "graphic"]}
                      />
                    </div>
                  );
                case "video":
                  return (
                    <div
                      class={`video-material__${element._videoComponent.index}`}
                      style={{ paddingBottom: 25, zIndex: 82 }}
                    />
                  );
              }
            })
          ) : (
            <div style={{ marginTop: "10vh" }}>
              {emptyStateSvg()}
              <p style={{ textAlign: "center" }}>
                There are no reference materials for this question
              </p>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

const emptyStateSvg = () => {
  return (
    <svg
      width="215"
      height="200"
      viewBox="0 0 834 773"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ margin: "auto", display: "block" }}
    >
      <path
        d="M549.456 345.319C643.463 395.074 831.476 537.648 831.476 709.898"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
      />
      <path
        d="M173.65 742.921V614.364C173.65 611.658 175.802 609.444 178.506 609.366L718.016 593.803C720.833 593.722 723.16 595.983 723.16 598.801V742.921"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
      />
      <path
        d="M608.898 597.618L604.275 746.884"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
      />
      <path
        d="M690.796 593.655C687.104 581.8 679.74 557.834 676.61 546.561C675.997 544.35 673.996 542.799 671.702 542.799H517.753"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
      />
      <path
        d="M515.772 554.687L525.68 596.957"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
      />
      <path
        d="M525.346 595.7L516.69 563.113C516.385 561.964 514.687 562.213 514.724 563.401L515.743 595.988C515.76 596.528 516.202 596.957 516.742 596.957H524.38C525.036 596.957 525.515 596.334 525.346 595.7Z"
        fill="black"
      />
      <path
        d="M622.768 540.817L619.925 531.815C619.261 529.71 617.294 528.29 615.087 528.321L431.893 530.91"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
      />
      <path
        d="M438.498 541.478C440.259 556.008 446.291 587.975 456.33 599.599"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
      />
      <path
        d="M454.986 597.89C448.122 588.366 442.959 568.979 440.051 553.905C439.816 552.687 437.737 552.838 437.745 554.079C437.879 574.209 439.095 599.6 442.46 599.6H454.147C455.003 599.6 455.486 598.585 454.986 597.89Z"
        fill="black"
      />
      <path
        d="M540.21 527.608L532.829 502.058C532.138 499.665 529.808 498.145 527.34 498.485C475.79 505.581 370.323 516.673 328.2 508.454"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
      />
      <path
        d="M332.162 521.664L356.599 603.563"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
      />
      <path
        d="M442.46 507.133L430.778 475.592C429.905 473.234 427.437 471.888 424.982 472.433C388.977 480.424 317.955 492.49 290.552 483.356"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
      />
      <path
        d="M281.966 481.375C290.552 516.821 308.913 590.617 313.668 602.241"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
      />
      <path
        d="M313.803 602.182C308.309 586.942 290.264 515.631 281.966 481.375L300.987 602.717C301.063 603.204 301.482 603.562 301.975 603.562H312.839C313.55 603.562 314.044 602.85 313.803 602.182Z"
        fill="black"
      />
      <path
        d="M262.152 515.719H288.571"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
      />
      <path
        d="M252.246 517.7L275.362 604.222"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
      />
      <path
        d="M261.399 605.307L253.5 529.706C253.372 528.485 255.132 528.153 255.458 529.336L276.333 604.937C276.509 605.574 276.03 606.203 275.369 606.203H262.393C261.881 606.203 261.452 605.816 261.399 605.307Z"
        fill="black"
      />
      <path
        d="M340.644 600.697L332.191 528.565C332.049 527.35 333.795 526.991 334.143 528.164L355.557 600.296C355.748 600.937 355.267 601.58 354.599 601.58H341.638C341.13 601.58 340.703 601.2 340.644 600.697Z"
        fill="black"
      />
      <path
        d="M262.153 557.328L199.481 554.941C196.145 554.814 193.624 557.928 194.443 561.164L206.013 606.864"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
      />
      <path
        d="M205.697 605.618L195.452 565.151C195.154 563.973 193.408 564.247 193.485 565.46L196.046 605.927C196.08 606.453 196.517 606.864 197.044 606.864H204.728C205.38 606.864 205.857 606.25 205.697 605.618Z"
        fill="black"
      />
      <path
        d="M185.575 504.834L207.502 553.788"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
      />
      <path
        d="M434.418 327.066C431.569 335.686 432.509 357.049 451.516 348.704C470.75 340.26 472.888 321.261 492.657 307.011"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
      />
      <path
        d="M417.055 341.355C405.484 368.612 437.441 423.127 501.903 371.394"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
      />
      <path
        d="M184.878 505.812C170.347 530.145 122.133 522.323 96.3748 549.403C70.6165 576.482 48.7215 571.772 44.4582 542.713C42.3696 528.476 61.5987 501.721 74.7556 495.209C81.8394 491.58 95.2159 486.464 118.83 487.319"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
      />
      <path
        d="M119.491 485.338C59.3878 485.338 42.4054 528.484 44.4511 542.711C46.3697 556.055 66.2625 586.52 99.9465 543.59C107.872 535.752 118.304 533.391 123.453 530.91L119.491 485.338Z"
        fill="black"
      />
      <path
        d="M43.6465 541.125C40.6077 601.954 109.889 630.403 136.663 770"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
      />
      <path
        d="M149.162 430.002L125.498 375.394C124.359 372.766 125.655 369.723 128.319 368.671C154.117 358.483 201.185 335.868 216.529 313.099"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
      />
      <path
        d="M186.809 500.673L191.58 511.647C192.616 514.031 195.286 515.232 197.74 514.375C225.87 504.549 277.776 483.74 297.245 466.126C298.81 464.71 299.113 462.431 298.159 460.549L227.363 320.902"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
      />
      <path
        d="M283.288 398.156C311.027 386.268 374.697 359.32 407.456 346.639"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
      />
      <path
        d="M447.084 392.872C434.31 399.257 409.966 419.555 414.721 449.672"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
      />
      <path
        d="M460.611 433.161C441.312 458.832 419.331 464.112 410.758 463.542"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
      />
      <path
        d="M478.787 394.854C490.015 404.321 508.508 429.727 500.582 463.543"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
      />
      <path
        d="M455.67 398.156C454.243 406.15 454.547 419.717 460.61 433.161C465.722 444.523 474.943 455.798 490.675 463.542"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
      />
      <path
        d="M149.408 464.868C148.759 463.249 148.434 458.135 152.329 450.625C157.197 441.237 167.907 422.462 160.118 424.405C152.329 426.347 116.954 469.076 121.822 490.44"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
      />
      <path
        d="M173.556 507.894C175.979 504.417 181.015 498.611 186.288 495.901C189.268 494.369 192.232 491.067 190.398 488.263C187.973 484.558 183.641 481.831 176.866 484.466C163.957 489.486 159.653 495.845 155.019 504.547"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
      />
      <path
        d="M179.3 485.232C180.172 479.772 178.581 469.64 165.235 472.795C151.889 475.95 142.665 488.67 139.721 494.636"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
      />
      <path
        d="M170.317 470.546C164.62 465.344 148.688 459.208 130.543 476.278"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
      />
      <path
        d="M125.443 444.662C123.465 462.675 116.684 464.283 118.662 486.477"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
      />
      <path
        d="M328.09 187.044C328.09 209.335 345.904 227.347 367.807 227.347C389.709 227.347 407.523 209.335 407.523 187.044C407.523 164.752 389.709 146.74 367.807 146.74C345.904 146.74 328.09 164.752 328.09 187.044Z"
        stroke="black"
        stroke-width="5"
      />
      <path
        d="M425.423 186.457C425.423 208.36 443.435 226.174 465.726 226.174C488.018 226.174 506.029 208.36 506.029 186.457C506.029 164.555 488.018 146.74 465.726 146.74C443.435 146.74 425.423 164.555 425.423 186.457Z"
        stroke="black"
        stroke-width="5"
      />
      <path
        d="M422.924 178.486C419.536 177.238 411.744 175.68 407.679 179.421"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
      />
      <ellipse
        rx="9.38151"
        ry="9.96785"
        transform="matrix(-1 0 0 1 465.14 195.253)"
        fill="black"
      />
      <ellipse
        rx="10.5542"
        ry="9.96785"
        transform="matrix(-1 0 0 1 376.016 197.599)"
        fill="black"
      />
      <path
        d="M385.397 164.177C382.648 162.3 374.811 158.266 365.462 157.14"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
      />
      <path
        d="M471.003 156.655C462.404 154.682 449.895 156.655 442.859 166.521"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
      />
      <path
        d="M421.292 220.294C416.194 220.538 405.538 218.538 403.702 208.586"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
      />
      <path
        d="M442.859 250.955C435.478 259.877 435.681 267.907 410.024 258.39"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
      />
      <path
        d="M354.788 223.983C351.351 242.626 355.251 260.314 382.771 287.176C414.437 318.084 429.165 333.538 473.349 300.422"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
      />
      <path
        d="M352.032 246.264C361.389 126.824 447.015 78.611 489.659 69.1431C514.808 73.2215 528.422 141.011 560.098 148.441C569.511 148.441 578.164 146.583 582.457 127.39C605.266 25.429 538.152 21.3184 508.667 24.7171C339.063 -69.9597 248.223 129.737 352.032 246.264Z"
        fill="black"
      />
      <path
        d="M564.819 193.493C565.703 196.073 566.942 202.265 564.819 206.392"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
      />
      <path
        d="M505.011 177.075H565.991"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
      />
      <path
        d="M556.991 181.077C567.351 173.93 584.922 179.585 578.801 206.604C574.984 223.452 557.536 225.834 554.265 215.283"
        stroke="black"
        stroke-width="5"
        stroke-linecap="round"
      />
    </svg>
  );
};
