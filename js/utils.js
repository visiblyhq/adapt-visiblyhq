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
    currentArticle.get("_vis")?._referenceMaterials?.length ||
    hasPresentationArticle
  );
};

export const navigateToArticle = (currentArticle, nextArticle) => {
  currentArticle.set("_current", false);
  nextArticle.set("_current", true);
  router.navigateToElement(nextArticle.get("_id"));
};
