// Modified version of: https://github.com/adaptlearning/adapt-contrib-gmcq/blob/master/templates/gmcq.jsx
// Covered by License: https://github.com/adaptlearning/adapt-contrib-gmcq/blob/master/LICENSE

import Adapt from "core/js/adapt";
import a11y from "core/js/a11y";
import React from "react";
import { templates, classes } from "core/js/reactHelpers";

export default function Gmcq(props) {
  const ariaLabels = Adapt.course.get("_globals")._accessibility._ariaLabels;

  const {
    _id,
    _isEnabled,
    _isInteractionComplete,
    _isCorrect,
    _isCorrectAnswerShown,
    _shouldShowMarking,
    _isRadio,
    _columns,
    displayTitle,
    body,
    instruction,
    ariaQuestion,
    onKeyPress,
    onItemSelect,
    onItemFocus,
    onItemBlur,
  } = props;

  return (
    <div className="component__inner gmcq__inner">
      <templates.header {...props} />

      <div
        className={classes([
          "component__widget",
          "gmcq__widget",
          !_isEnabled && "is-disabled",
          _isInteractionComplete && "is-complete is-submitted show-user-answer",
          _isCorrect && "is-correct",
          _columns && "has-column-layout",
        ])}
        role={_isRadio ? "radiogroup" : "group"}
        aria-labelledby={
          ariaQuestion
            ? null
            : (displayTitle || body || instruction) && `${_id}-header`
        }
        aria-label={ariaQuestion || null}
      >
        {props._items.map(
          ({ text, _index, _isActive, _shouldBeSelected, _graphic }, index) => (
            <div
              className={classes([
                `gmcq-item item-${index}`,
                _shouldShowMarking && _shouldBeSelected ? "is-correct" : null,
                _shouldShowMarking && !_shouldBeSelected
                  ? "is-incorrect"
                  : null,
              ])}
              style={{
                width: _columns
                  ? `${(100 - _columns * 2) / _columns}%`
                  : "100%",
                marginBottom: _columns == 0 ? "5%" : `${_columns}%`,
              }}
              key={_index}
            >
              <input
                className="gmcq-item__input"
                id={`${_id}-${index}-input`}
                name={_isRadio ? `${_id}-item` : null}
                type={_isRadio ? "radio" : "checkbox"}
                disabled={!_isEnabled}
                checked={_isActive}
                aria-label={
                  !_shouldShowMarking
                    ? `${a11y.normalize(text)} ${_graphic?.alt || ""}`
                    : `${
                        _shouldBeSelected
                          ? ariaLabels.correct
                          : ariaLabels.incorrect
                      }, ${
                        _isActive
                          ? ariaLabels.selectedAnswer
                          : ariaLabels.unselectedAnswer
                      }. ${a11y.normalize(text)} ${_graphic?.alt || ""}`
                }
                data-adapt-index={_index}
                onKeyPress={onKeyPress}
                onChange={onItemSelect}
                onFocus={onItemFocus}
                onBlur={onItemBlur}
              />
              <label
                className={classes([
                  "gmcq-item__label",
                  "js-item-label",
                  "u-no-select",
                  !_isEnabled && "is-disabled",
                  (_isCorrectAnswerShown ? _shouldBeSelected : _isActive) &&
                    "is-selected",
                ])}
                aria-hidden={true}
                htmlFor={`${_id}-${index}-input`}
                data-adapt-index={_index}
              >
                <div style={{ marginTop: "100%" }}></div>
                <div className="gmcq-item__img__wrapper__outer">
                  <div className="gmcq-item__img__wrapper__inner">
                    <templates.image
                      {..._graphic}
                      classNamePrefixes={["gmcq-item"]}
                      attributionClassNamePrefixes={["component", "gmcq"]}
                      isEnlargedDisabled={true}
                    />
                  </div>
                </div>
              </label>
            </div>
          )
        )}
      </div>

      <div className="btn__container"></div>
    </div>
  );
}
