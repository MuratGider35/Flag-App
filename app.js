const getNews = async function () {
  const url = "https://newsapi.org/v2/top-headlines/sources?apiKey=" + API_KEY;
  const API_KEY = "9181e84a57fc42cca99df8181c7bf7fe";
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.articles);
};
getNews();
