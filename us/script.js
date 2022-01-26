// via NewsAPI

const newsBoxContainer = document.querySelector(".news-box .news-container");
newsBoxContainer.innerHTML = showLoadingNewsBox();

// News Box
// fetch(`https://newsapi.org/v2/top-headlines?q=${"covid-19"}&country=us&pageSize=40&apiKey=4a94eadbbdc44c87b1a53005a2ddc650`)
fetch(`https://newsapi.org/v2/everything?q=${"covid-19"}&language=en&pageSize=40&apiKey=4a94eadbbdc44c87b1a53005a2ddc650`)
  .then((response) => response.json())
  .then((results) => {
    if (results.status === "ok") {
      const articles = results.articles;
      let news = "";
      articles.forEach((e) => {
        news += showNewsBox(e);
      });
      newsBoxContainer.innerHTML = news;
    } else if (results.status === "error") {
      newsBoxContainer.innerHTML = showErrorNewsBox();
    }
  });

const newsContainer = document.querySelector(".hot-news .news-container");
newsContainer.innerHTML = showLoadingNews();

// Hot News
fetch("https://newsapi.org/v2/top-headlines?country=us&pageSize=38&apiKey=4a94eadbbdc44c87b1a53005a2ddc650")
  .then((response) => response.json())
  .then((results) => {
    checkNewsResults(results);
  });

// .catch(error => {
//   newsContainer.innerHTML = showErrorNews();
// });

// CATEGORY SECTION
const categoryLi = Array.from(document.querySelectorAll(".category-box .category li"));
categoryLi.forEach((category) => {
  category.addEventListener("click", function (e) {
    categoryLi.forEach((checkCurrent) => {
      if (checkCurrent.classList.contains("current")) {
        checkCurrent.classList.remove("current");
      }
    });
    e.target.classList.add("current");

    newsContainer.innerHTML = showLoadingNews();

    if (e.target.dataset.category === "all" && e.target.classList.contains("current")) {
      document.querySelector(".hot-news .title-info h2").textContent = `Hot News from USA 🔥`;

      fetch("https://newsapi.org/v2/top-headlines?country=us&pageSize=38&apiKey=4a94eadbbdc44c87b1a53005a2ddc650")
        .then((response) => response.json())
        .then((results) => {
          checkNewsResults(results);
          // if (results.status === 'ok') {
          //   // showNewsResults(results);
          //   document.querySelector('.totalResults').textContent = `Total Results: ${results.articles.length}`;
          //
          //   const articles = results.articles;
          //   let news = '';
          //     articles.forEach(e => {
          //       news += showNews(e);
          //     });
          //     newsContainer.innerHTML = news;
          // }
          //  else if (results.status === 'error') {
          //    newsContainer.innerHTML = showErrorNews();
          //  }
        });
    } else if (e.target.dataset.category !== "all" && e.target.classList.contains("current")) {
      document.querySelector(".hot-news .title-info h2").textContent = `Hot News USA from ${e.target.textContent} Category 🔥`;

      fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${e.target.dataset.category}&pageSize=38&apiKey=4a94eadbbdc44c87b1a53005a2ddc650`)
        .then((response) => response.json())
        .then((results) => {
          checkNewsResults(results);
        });
    }
  });
});

// Search News
const searchNews = Array.from(document.querySelectorAll(".search_news"));
// const searchBtn = Array.from(document.querySelectorAll('.btn-search'));
const searchForm = Array.from(document.querySelectorAll(".search-form"));
const newsSearchContainer = document.querySelector(".search-news-container .news-container");
const searching_for = document.querySelector(".searching_for > span");

// keydown
searchNews.forEach((input) => {
  input.addEventListener("input", function () {
    searching_for.textContent = input.value + "...";
    if (input.value === "") {
      document.querySelector(".search-news-box").classList.add("none");
      newsSearchContainer.innerHTML = "";
    }
  });
});

searchForm.forEach((form) => {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    searchNews.forEach((input) => {
      document.querySelector(".search-news-box").classList.remove("none");
      newsSearchContainer.innerHTML = showLoadingNews();
      // searching_for.textContent = input.value + '...';

      fetch(`https://newsapi.org/v2/everything?q=${input.value}&language=en&apiKey=4a94eadbbdc44c87b1a53005a2ddc650`)
        .then((response) => response.json())
        .then((results) => {
          if (results.totalResults === results.articles.length) {
            document.querySelector(".totalResultsSearch").textContent = `Total Results for "${input.value}" : ${results.totalResults}.`;
          } else {
            document.querySelector(".totalResultsSearch").textContent = `Total Results for "${input.value}" : ${results.totalResults}. Can only display ${results.articles.length} results.`;
          }

          if (results.totalResults === 0) {
            console.log(results);
            document.querySelector(".totalResultsSearch").textContent = `Total Results for "${input.value}": 0`;
            newsSearchContainer.innerHTML = showErrorNewsSearch();
          } else if (results.status === "ok") {
            const articles = results.articles;
            let news = "";
            articles.forEach((e) => {
              news += showNews(e);
            });
            newsSearchContainer.innerHTML = news;
          }

          // else if (input.value === '') {
          //   document.querySelector('.search-news-box').classList.add('none');
          //   newsSearchContainer.innerHTML = '';
          // }
        });
      // .catch(error => {
      //   document.querySelector('.totalResultsSearch').textContent = `Total Results for ${this.value}: 0`;
      //   newsSearchContainer.innerHTML = showErrorNewsSearch();
      // });
    });
  });
});

// Visible the element if scroll
const btnToTop = document.querySelector(".to-top");
const menuBar = document.querySelector(".menu-bar");

window.addEventListener("scroll", function () {
  if (document.body.scrollTop > 120 || document.documentElement.scrollTop > 120) {
    btnToTop.classList.remove("none");
    menuBar.classList.remove("none");
  } else {
    btnToTop.classList.add("none");
    menuBar.classList.add("none");
  }
});

btnToTop.addEventListener("click", function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", function functionName() {
  if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
    navbar.classList.add("bg-nav");
  } else {
    navbar.classList.remove("bg-nav");
  }
});

// Change the Theme
function checkingIsDark(isDark) {
  if (isDark) {
    docHtml.dataset.theme = "dark";
    this.innerHTML = 'Mode Cerah <i class="ml-1 bi bi-sun-fill"></i>';
  } else {
    return;
  }
}

const isDark = JSON.parse(localStorage.getItem("isDark")) || false;
const changeThemeBtn = Array.from(document.querySelectorAll(".change-theme"));
const docHtml = document.querySelector("html");

checkingIsDark(isDark);

changeThemeBtn.forEach((btn) => {
  btn.addEventListener("click", function (event) {
    event.preventDefault();

    if (docHtml.dataset.theme === "dark" && isDark) {
      localStorage.setItem("isDark", false);
      docHtml.dataset.theme = "light";
      this.innerHTML = 'Mode Malam <i class="ml-1 bi bi-moon-stars-fill"></i>';
    } else {
      localStorage.setItem("isDark", true);
      docHtml.dataset.theme = "dark";
      this.innerHTML = 'Mode Cerah <i class="ml-1 bi bi-sun-fill"></i>';
    }

    // changeThemeBtn.forEach(btnTheme => {
    //   btnTheme.innerHTML = this.innerHTML;
    // });
  });
});

// FUNC.
function checkNewsResults(results) {
  if (results.status === "ok") {
    // showNewsResults(results);
    document.querySelector(".totalResults").textContent = `Total Results: ${results.articles.length}`;

    const articles = results.articles;
    let news = "";
    articles.forEach((e) => {
      news += showNews(e);
    });
    newsContainer.innerHTML = news;
  } else if (results.status === "error") {
    newsContainer.innerHTML = showErrorNews();
  }
}

function showNews(e) {
  return `<a href="${e.url}" target="_blank" class="news-url">
            <div class="card my-4 shadow-sm rounded" style="width: 100%;">
              <div class="card-body">
                ${checkNewsImg(e.urlToImage, e.source.name)}
                <div class="card-detail mt-1">
                  <h4 class="card-text mb-2">${e.title}</h4>
                  <p class="card-desc">${checkNewsProp(e.description)}</p>
                  <span class="card-source btn">${e.source.name}</span>
                </div>
              </div>
            </div>
          </a>`;
}

function showNewsBox(e) {
  return `<a href="${e.url}" target="_blank" class="news-url card-newsbox">
            <div class="card mx-3 my-1">
            ${checkNewsBoxImg(e.urlToImage, e.source.name)}
              <div class="card-body p-1">
                <p class="card-text text-truncate">${e.title}</p>
              </div>
            </div>
          </a>`;
}

function showErrorNews() {
  return `<div class="row text-center error-msg mt-5">
            <div class="col-12">
              <h2 class="font-weight-bold mb-5">Whoops! Something wrong here. (Server Error)</h2>
              <img src="../img/empty.svg">
            </div>
          </div>`;
  // src="../img/empty.svg"
}

function showErrorNewsBox() {
  return `<div class="row text-center error-msg mt-5 mb-2">
            <div class="col-12">
              <h2 class="font-weight-bold mb-5">Whoops! Something wrong here. (Server Error)</h2>
            </div>
          </div>`;
  // src="../img/empty.svg"
}

function showNewsResults(response) {
  document.querySelector(".totalResultsSearch").textContent = `Total Results: ${response.totalResults}. Can only display ${response.articles.length}`;
}

function showNewsResultsSearch(response, keyword) {
  document.querySelector(".totalResultsSearch").textContent = `Total Results for ${keyword}: ${response.totalResults}. Can only display ${response.articles.length}`;
}

function showErrorNewsSearch() {
  return `<div class="row text-center error-msg mt-5">
            <div class="col-12">
              <h2 class="font-weight-bold mb-4">Cannot found that keyword. Please try again later, or enter the spesific one.</h2>
            </div>
          </div>`;
}

function checkNewsProp(target) {
  if (target === null) {
    return (target = "");
  } else if (target !== null) {
    return target;
  }
}

function checkNewsImg(target, source) {
  if (target === null || target === undefined) {
    return `<div class="news-img-alt p-2 mr-3 mt-2 font-weight-bold">${source}</div>`;
    // return ``;
  } else if (target !== null || target !== undefined) {
    return `<img src="${target}" class="card-img-top news-img mr-3 mt-2" alt="">`;
  }
}

function checkNewsBoxImg(target, source) {
  if (target === null || target === undefined) {
    return `<div class="news-img-alt shadow-sm mb-2 p-2 font-weight-bold">${source}</div>`;
    // return ``;
  } else if (target !== null || target !== undefined) {
    return `<img src="${target}" class="card-img-top news-img shadow-sm mb-2">`;
  }
}

// LOADING STUFFS
function showLoadingNews() {
  return `<div class="news-url-loading">
    <div class="card my-4 rounded" style="width: 100%;">
      <div class="card-body">
        <div class="card-img-top news-img-loading mr-5"></div>
        <div class="card-detail">
          <div class="card-text mb-3"></div>
          <span class="card-source-loading btn"></span>
        </div>
      </div>
    </div>
  </div>
  <div class="news-url-loading">
    <div class="card my-4 rounded" style="width: 100%;">
      <div class="card-body">
        <div class="card-img-top news-img-loading mr-5"></div>
        <div class="card-detail">
          <div class="card-text mb-3"></div>
          <div class="card-desc-loading"></div>
          <span class="card-source-loading btn"></span>
        </div>
      </div>
    </div>
  </div>
  <div class="news-url-loading">
    <div class="card my-4 rounded" style="width: 100%;">
      <div class="card-body">
        <div class="card-img-top news-img-loading mr-5"></div>
        <div class="card-detail">
          <div class="card-text mb-3"></div>
          <div class="card-desc-loading"></div>
          <span class="card-source-loading btn"></span>
        </div>
      </div>
    </div>
  </div>
  <div class="news-url-loading">
    <div class="card my-4 rounded" style="width: 100%;">
      <div class="card-body">
        <div class="card-img-top news-img-loading mr-5"></div>
        <div class="card-detail">
          <div class="card-text mb-3"></div>
          <div class="card-desc-loading"></div>
          <span class="card-source-loading btn"></span>
        </div>
      </div>
    </div>
  </div>`;
}

function showLoadingNewsBox() {
  return `<div class="news-box-url-loading">
    <div class="card mx-4 my-3">
      <div class="card-img-top news-img-loading mb-2"></div>
      <div class="card-body p-1">
        <div class="card-text"></div>
      </div>
    </div>
  </div>
  <div class="news-box-url-loading">
    <div class="card mx-4 my-3">
      <div class="card-img-top news-img-loading mb-2"></div>
      <div class="card-body p-1">
        <div class="card-text"></div>
      </div>
    </div>
  </div>
  <div class="news-box-url-loading">
    <div class="card mx-4 my-3">
      <div class="card-img-top news-img-loading mb-2"></div>
      <div class="card-body p-1">
        <div class="card-text"></div>
      </div>
    </div>
  </div>
  <div class="news-box-url-loading">
    <div class="card mx-4 my-3">
      <div class="card-img-top news-img-loading mb-2"></div>
      <div class="card-body p-1">
        <div class="card-text"></div>
      </div>
    </div>
  </div>
  <div class="news-box-url-loading">
    <div class="card mx-4 my-3">
      <div class="card-img-top news-img-loading mb-2"></div>
      <div class="card-body p-1">
        <div class="card-text"></div>
      </div>
    </div>
  </div>`;
}

// BEFORE SEARCH FORM:
// searchNews.forEach(searchInput => {
//   searchInput.addEventListener('input', function(e) {
//     e.preventDefault;
//     document.body.scrollTop = 0;
//     document.documentElement.scrollTop = 0;
//
//     document.querySelector('.search-news-box').classList.remove('none');
//     newsSearchContainer.innerHTML = showLoadingNews();
//     searching_for.textContent = this.value + '...';
//
//     fetch(`https://newsapi.org/v2/everything?q=${this.value}&language=en&apiKey=4a94eadbbdc44c87b1a53005a2ddc650`)
//       .then(response => response.json())
//       .then(results => {
//
//         document.querySelector('.totalResultsSearch').textContent = `Total Results for "${this.value}": ${results.totalResults}. Can only display 20 results.`;
//
//         if (this.value === '') {
//           document.querySelector('.search-news-box').classList.add('none');
//           newsSearchContainer.innerHTML = '';
//         }
//
//         else if (results.totalResults === 0) {
//           console.log(results);
//           document.querySelector('.totalResultsSearch').textContent = `Total Results for "${this.value}": 0`;
//           newsSearchContainer.innerHTML = showErrorNewsSearch();
//          }
//
//         else if (results.status === 'ok') {
//           // showNewsResultsSearch(results, this.value);
//           const articles = results.articles;
//           let news = '';
//             articles.forEach(e => {
//               news += showNews(e);
//             });
//             newsSearchContainer.innerHTML = news;
//         }
//
//       });
//       // .catch(error => {
//       //   document.querySelector('.totalResultsSearch').textContent = `Total Results for ${this.value}: 0`;
//       //   newsSearchContainer.innerHTML = showErrorNewsSearch();
//       // });
//
//   });
// });
