import router from "core/js/router";

export const isBookButtonAvailable = (articles, currentArticle) => {
  let hasPresentationArticle = false;
  try {
    articles.forEach((element) => {
      if (element.get("_current")) {
        throw new BreakException();
      }
      if (element.get("_visType") === "presentation") {
        hasPresentationArticle = true;
      }
    });
  } catch (BreakException) {}

  return (
    (currentArticle.get("_vis")?._referenceMaterials?.length ||
      hasPresentationArticle) &&
    currentArticle.get("_visType") !== "presentation"
  );
};

export const navigateToArticle = (currentArticle, nextArticle) => {
  currentArticle.set("_current", false);
  nextArticle.set("_current", true);
  $(`div[data-adapt-id="${currentArticle.get("_id")}"]`).css({
    display: "none",
  });

  $(`div[data-adapt-id="${nextArticle.get("_id")}"]`).css({
    display: "block",
  });
};

let imageCounter = 0;

export const getUniqueInt = () => {
  return ++imageCounter;
};
