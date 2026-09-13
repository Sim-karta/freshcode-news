import { newsList } from "./news-data.js";

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

const activeNewsList = [...newsList];

const articleList = activeNewsList.map((news, index) => {
    const newsCard = document.createElement("article");
    newsCard.classList.add("newsCard");
    newsCard.setAttribute("data-js-index", index);
    document.body.append(newsCard);

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

    const newsCardLikeIcon = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg",
    );
    newsCardLikeIcon.setAttribute("viewBox", "0 0 24 24");
    newsCardLikeIcon.setAttribute("width", "24");
    newsCardLikeIcon.setAttribute("height", "24");
    newsCardLikeIcon.setAttribute("fill", "none");

    const newsCardLikePath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
    );
    newsCardLikePath.setAttribute(
        "d",
        "M8 10V20M8 10L4 9.99998V20L8 20M8 10L13.1956 3.93847C13.6886 3.3633 14.4642 3.11604 15.1992 3.29977L15.2467 3.31166C16.5885 3.64711 17.1929 5.21057 16.4258 6.36135L14 9.99998H18.5604C19.8225 9.99998 20.7691 11.1546 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20L8 20",
    );
    newsCardLikePath.setAttribute("stroke", "currentColor");
    newsCardLikePath.setAttribute("stroke-width", "1.5");
    newsCardLikePath.setAttribute("stroke-linecap", "round");
    newsCardLikePath.setAttribute("stroke-linejoin", "round");
    newsCardLikeIcon.append(newsCardLikePath);
    newsCardLike.append(newsCardLikeIcon);

    const newsCardDelete = document.createElement("button");
    newsCardDelete.classList.add("newsCard__delete-btn");
    newsCardHeader.append(newsCardDelete);

    const newsCardDeleteIcon = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg",
    );
    newsCardDeleteIcon.setAttribute("viewBox", "0 0 24 24");
    newsCardDeleteIcon.setAttribute("width", "24");
    newsCardDeleteIcon.setAttribute("height", "24");
    newsCardDeleteIcon.setAttribute("fill", "none");

    const newsCardDeletePath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
    );
    newsCardDeletePath.setAttribute(
        "d",
        "M3.99989 4L19.9999 20M16.4999 16.7559C15.1473 17.4845 13.6185 17.9999 11.9999 17.9999C8.46924 17.9999 5.36624 15.5478 3.5868 13.7788C3.1171 13.3119 2.88229 13.0784 2.7328 12.6201C2.62619 12.2933 2.62616 11.7066 2.7328 11.3797C2.88233 10.9215 3.11763 10.6875 3.58827 10.2197C4.48515 9.32821 5.71801 8.26359 7.17219 7.42676M19.4999 14.6335C19.8329 14.3405 20.138 14.0523 20.4117 13.7803L20.4146 13.7772C20.8832 13.3114 21.1182 13.0779 21.2674 12.6206C21.374 12.2938 21.3738 11.7068 21.2672 11.38C21.1178 10.9219 20.8827 10.6877 20.4133 10.2211C18.6338 8.45208 15.5305 6 11.9999 6C11.6624 6 11.3288 6.02241 10.9999 6.06448M13.3228 13.5C12.9702 13.8112 12.507 14 11.9999 14C10.8953 14 9.99989 13.1046 9.99989 12C9.99989 11.4605 10.2135 10.9712 10.5608 10.6113",
    );
    newsCardDeletePath.setAttribute("stroke", "currentColor");
    newsCardDeletePath.setAttribute("stroke-width", "2");
    newsCardDeletePath.setAttribute("stroke-linecap", "round");
    newsCardDeletePath.setAttribute("stroke-linejoin", "round");
    newsCardDeleteIcon.append(newsCardDeletePath);
    newsCardDelete.append(newsCardDeleteIcon);

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
