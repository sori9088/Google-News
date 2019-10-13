let news= []; //news 배열 선언
let newsArticles = [];
let pageNum = 1;
let category = '';

async function fetchNews(){ //async, await 세트
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=2cbf7ab8e796484b953c69b18bdf4386&page=${pageNum}`; //api 주소 부르기
    let result = await fetch(url); //결과 변수에 api 불러오기 - api가 로드될때까지 기다렸다가 완료되면 result 에 넣어줌
    let data = await result.json(); //api url을 객체로 저장
    console.log(data)
    news = data.articles; //news배열에 api 객체들 중 articles 배열만 저장
    newsArticles= newsArticles.concat(news);
    
    renderNews(newsArticles); //news(articles)배열을 렌더 함수로 보내면서 렌더 함수 실행시키기
    document.getElementById("total").innerHTML = `No.of Articles : ${newsArticles.length}`
    console.log(newsArticles);
    pageNum++;
    if(pageNum>2){
        document.getElementById("load-more-btn").innerHTML = "No More News To Show";
    } else {
        document.getElementById("load-more-btn").innerHTML = "Load More";
    }

    let sources = newsArticles.map(article => article.source.name);
    countRepeatSources(sources);

}

function renderNews(arr) {
    
    const html = arr.map(article => { /// html에 배열에서 보여줄 값 설정하여 넣어줌

        return `
        <div class="card text-center">
            <div class="card-img-top">
            <img class="newsimg" src="${article.urlToImage}">
            </div>
            <div class="card-body">
                    <h3 id="title" class="card-title">${article.title}</h3>
                    <p id="content" class="card-text">${article.description}</p>
                    <p id="pubished" class="card-text"><small class="text-muted">${moment(article.publishedAt).fromNow()}</small></p>
                    <p id="source" class="card-text">${article.source.name}</p>
                    <a href="${article.url}" target="_blank" class="btn btn-dark">Read more</a>
            </div>
        </div>
        `
    }).join(''); //news 배열 article에서 찾은 값들 보여줌

    document.getElementById("main").innerHTML= html; //main에 map 해서 찾아온 값들을 넣은 html 을 출력
}

function countRepeatSources(arr){
    let countRepeat= {};

    for(let i=0; i<arr.length; i++){
        let source = arr[i];
        if(countRepeat[source] == null){
            countRepeat[source] = 0;
        }
        countRepeat[source] = countRepeat[source]+1;
    }
    console.log("repeat count",countRepeat)

    let keys= Object.keys(countRepeat);
    console.log(keys)

    document.getElementById("publishers").innerHTML = keys.map(key => {
        return `
        <input type = "checkbox" id="${key}" onchange="filterBySource('${key}')"> ${key}(${countRepeat[key]})
        `
    }).join('&nbsp;');
}

function filterBySource(id){
    if(document.getElementById(id).checked){
        let filteredlist = newsArticles.filter(article => article.source.name == id);
        renderNews(filteredlist);
    }else{
        renderNews(newsArticles);
    }


}

function kkk(cate){
    category=cate;
    news=[];
    newsArticles=[];
    pageNum = 1;
    fetchNews();
}


const addScript = language => {
    var s = document.createElement("script");
    s.setAttribute(
      "src",
      `https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/locale/${language}.js`
    );
    document.body.appendChild(s);
  };
  
if (window.clientInformation.language == "ko-KR") {
    addScript("ko");
} else if (window.clientInformation.language == "vi") {
    addScript("vi");
} else {
    addScript("us");
}

fetchNews(); //fetch 함수 부르기
