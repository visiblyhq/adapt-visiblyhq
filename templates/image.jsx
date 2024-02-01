import device from "core/js/device";
import a11y from "core/js/a11y";
import React from "react";
import { classes, prefixClasses } from "core/js/reactHelpers";
import { imageCounter, incrementCounter } from "../js/utils";
/**
 * Size switching content image
 * @param {Object} props
 * @param {Array} props.classNamePrefixes
 * @param {Array} [props.attributionClassNamePrefixes]
 */
export default function Image(props) {
  const hasMatchingSetting =
    Object.hasOwn(props, `_${device.screenSize}`) ||
    Object.hasOwn(props, device.screenSize);
  const screenSize = hasMatchingSetting
    ? device.screenSize
    : device.isScreenSizeMin("medium")
    ? "large"
    : "small";
  const src =
    props[`_${screenSize}`] ||
    props[`${screenSize}`] ||
    props._src ||
    props.src;
  const hasSource = Boolean(src);
  if (!hasSource) return null;
  const attributionClassNamePrefixes =
    props.attributionClassNamePrefixes || props.classNamePrefixes;

  const id = generateId();

  return (
    <>
      {!props.isEnlargedDisabled ? (
        <div
          id={`enlarged_image_${id}`}
          style={{
            backgroundColor: "black",
            display: "none",
            width: "100vw",
            height: "100vh",
            position: "fixed",
            top: 0,
            zIndex: 84,
            left: 0,
          }}
        >
          <div
            className="vistopnavbar__button-wrapper"
            style={{
              margin: 25,
              position: "absolute",
              right: 0,
              zIndex: 1,
            }}
            onClick={() => {
              document.getElementById(`enlarged_image_${id}`).style.display =
                "none";
            }}
          >
            <svg
              width="42"
              height="38"
              viewBox="0 0 25 25"
              fill="#FFFFFF"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"
                fill="#FFFFFF"
              />
            </svg>
          </div>
          <span
            id={props.id}
            className={classes([
              prefixClasses(props.classNamePrefixes, ["__image-container"]),
              props.classes,
              props.attribution && "has-attribution",
            ])}
          >
            <img
              className={prefixClasses(
                [...props.classNamePrefixes, "enlarged"],
                ["__image"]
              )}
              src={src}
              aria-label={a11y.normalize(props.alt)}
              aria-hidden={!props.alt}
              loading="eager"
              aria-describedby={
                props.longdescription ? props.longDescriptionId : undefined
              }
              style={{
                maxWidth: "100vw",
                maxHeight: "100vh",
                transform:
                  "translatex(calc(50vw - 50%)) translatey(calc(50vh - 50%))",
                borderRadius: 0,
                objectFit: "contain",
              }}
            />
            {props.attribution && (
              <span
                className={prefixClasses(attributionClassNamePrefixes, [
                  "__attribution",
                ])}
              >
                <span
                  className={prefixClasses(attributionClassNamePrefixes, [
                    "__attribution-inner",
                  ])}
                >
                  {dangerouslySetInnerHTML(props.attribution)}
                </span>
              </span>
            )}
          </span>
        </div>
      ) : null}

      <div
        onClick={() => {
          if (!props.isEnlargedDisabled) {
            document.getElementById(`enlarged_image_${id}`).style.display =
              "block";
          }
        }}
      >
        <span
          id={props.id}
          className={classes([
            prefixClasses(props.classNamePrefixes, ["__image-container"]),
            props.classes,
            props.attribution && "has-attribution",
          ])}
        >
          <img
            className={prefixClasses(props.classNamePrefixes, ["__image"])}
            src={src}
            aria-label={a11y.normalize(props.alt)}
            aria-hidden={!props.alt}
            loading="eager"
            aria-describedby={
              props.longdescription ? props.longDescriptionId : undefined
            }
          />

          {props.attribution && (
            <span
              className={prefixClasses(attributionClassNamePrefixes, [
                "__attribution",
              ])}
            >
              <span
                className={prefixClasses(attributionClassNamePrefixes, [
                  "__attribution-inner",
                ])}
              >
                {dangerouslySetInnerHTML(props.attribution)}
              </span>
            </span>
          )}
        </span>
      </div>
    </>
  );
}

const generateId = () => {
  incrementCounter();
  return `${imageCounter}`;
};
