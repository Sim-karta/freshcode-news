import { newsList } from "./news-data.js";
import { addLikeSvg } from "./like-svg.js";
import { addDeleteSvg } from "./delete-svg.js";

function renderCards() {
    articleList.forEach((newsCardElement, index) => {
        const news = activeNewsList[index];
        render(newsCardElement, news.title, news.body, index);
    });
}

function render(newsCardElement, title, body, index) {
    const newsCardTitleElement = newsCardElement.querySelector(
        ".newsCard__body-title",
    );

    const newsCardInfoElement = newsCardElement.querySelector(
        ".newsCard__body-info",
    );

    const { title: fullTitle, info } = getNewsText(title, body, index);

    newsCardTitleElement.textContent = fullTitle;

    newsCardInfoElement.textContent = info;
}

function getNewsText(title, text, index) {
    const newsText = {
        title: "",
        info: "",
    };

    if (index === 0) {
        newsText.title = title;
    } else {
        newsText.title = title.slice(0, 30) + "...";
    }

    if (index === 0) {
        newsText.info = text;
    }

    return newsText;
}

function addNewsCardHeader(newsCard, news) {
    const newsCardHeader = document.createElement("div");
    newsCardHeader.classList.add("newsCard__header");
    newsCard.append(newsCardHeader);

    const newsCardImage = document.createElement("img");
    newsCardImage.src = news.headerBgSrc;
    newsCardImage.alt = news.title;
    newsCardImage.classList.add("newsCard__image");
    newsCardHeader.append(newsCardImage);

    const newsCardLike = document.createElement("button");
    newsCardLike.classList.add("newsCard__like-btn");
    newsCardHeader.append(newsCardLike);

    const newsCardLikeIcon = addLikeSvg(newsCardLike);

    const newsCardDelete = document.createElement("button");
    newsCardDelete.classList.add("newsCard__delete-btn");
    newsCardHeader.append(newsCardDelete);

    addDeleteSvg(newsCardDelete);

    return [{ newsCardLike, newsCardLikeIcon }, newsCardDelete];
}

function addNewsCardBody(newsCard, news, index) {
    const newsCardBody = document.createElement("div");
    newsCardBody.classList.add("newsCard__body");
    newsCard.append(newsCardBody);

    const { title, info } = getNewsText(news.title, news.body, index);

    const newsCardTitle = document.createElement("h2");
    newsCardTitle.classList.add("newsCard__body-title");
    newsCardTitle.textContent = title;
    newsCardBody.append(newsCardTitle);

    const newsCardInfo = document.createElement("p");
    newsCardInfo.classList.add("newsCard__body-info");
    newsCardInfo.textContent = info;
    newsCardBody.append(newsCardInfo);
}

function addNewsCardFooter(newsCard, news) {
    const newsCardFooter = document.createElement("div");
    newsCardFooter.classList.add("newsCard__footer");
    newsCard.append(newsCardFooter);

    const newsCardTags = document.createElement("ul");
    newsCardTags.classList.add("newsCard__tags");
    newsCardFooter.append(newsCardTags);

    news.category.forEach((tag) => {
        const newsCardTag = document.createElement("li");
        newsCardTag.classList.add("newsCard__tags-item");
        newsCardTag.textContent = `#${tag}`;
        newsCardTags.append(newsCardTag);
    });

    const newsCardDate = document.createElement("p");
    newsCardDate.classList.add("newsCard__date");
    newsCardFooter.append(newsCardDate);

    const newsCardTime = document.createElement("time");
    newsCardTime.dateTime = news.date;
    newsCardTime.textContent = news.date;
    newsCardDate.append(newsCardTime);
}

const activeNewsList = [...newsList];

const articleList = activeNewsList.map((news, index) => {
    const newsCard = document.createElement("article");
    newsCard.classList.add("newsCard");
    newsCard.setAttribute("data-js-index", index);
    document.body.append(newsCard);

    const [{ newsCardLike, newsCardLikeIcon }, newsCardDelete] =
        addNewsCardHeader(newsCard, news);

    addNewsCardBody(newsCard, news, index);

    addNewsCardFooter(newsCard, news);

    newsCard.addEventListener("click", () => {
        articleList.forEach((newsCard) => {
            newsCard.classList.toggle("is-active", false);
        });
        newsCard.classList.toggle("is-active");
    });

    newsCardLike.addEventListener("click", () => {
        newsCardLike.classList.toggle("is-active");
        if (newsCardLikeIcon.getAttribute("fill") === "none") {
            newsCardLikeIcon.setAttribute("fill", "currentColor");
        } else {
            newsCardLikeIcon.setAttribute("fill", "none");
        }
    });

    newsCardDelete.addEventListener("click", (event) => {
        const deletedCard = event.currentTarget.closest(".newsCard");
        const deletedIndex = articleList.indexOf(deletedCard);

        deletedCard.remove();
        articleList.splice(deletedIndex, 1);
        activeNewsList.splice(deletedIndex, 1);

        renderCards();
    });

    return newsCard;
});
