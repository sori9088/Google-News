let news= []; //news 배열 선언


async function fetchNews(){ //async, await 세트
    let url = "https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=2cbf7ab8e796484b953c69b18bdf4386"; //api 주소 부르기
    let result = await fetch(url); //결과 변수에 api 불러오기 - api가 로드될때까지 기다렸다가 완료되면 result 에 넣어줌
    console.log(result);
    let data = await result.json(); //api url을 객체로 저장
    console.log(data);
    news = data.articles; //news배열에 api 객체들 중 articles 배열만 저장
    console.log(news);
    document.getElementById("total").innerHTML = `No.of Articles : ${news.length}`
    renderNews(news); //news(articles)배열을 렌더 함수로 보내면서 렌더 함수 실행시키기
}

function renderNews(arr) {
    
    const html = arr.map(article => { /// html에 배열에서 보여줄 값 설정하여 넣어줌

        return `
        <div class="card text-center">
            <div class="image">
            <img src="${article.urlToImage}">
            </div>
            <div class="text">
                    <h3 id="title">${article.title}</h3>
                    <p id="content">${article.description}</p>
                    <p id="pubished">${article.publishedAt}</p>
                    <p id="source">${article.source.name}</p>
                    <a href="${article.url}" id="readmore">Read more</a>
            </div>
        </div>
        `
    }).join(''); //news 배열 article에서 찾은 값들 보여줌

    document.getElementById("main").innerHTML= html; //main에 map 해서 찾아온 값들을 넣은 html 을 출력
}



fetchNews(); //fetch 함수 부르기