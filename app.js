let isError = false;
const formSelect = document.querySelector(".form-select");
formSelect.addEventListener("change", (e) => {
  console.log(e.target.value);
  fetchCountryByName(e.target.value);
});

const fetchCountryByName = (name) => {
  const url = `https://restcountries.com/v3.1/name/${name}`;
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        renderError(`something went wrong: ${res.status}`);
        throw new Error();
      }
      return res.json();
    })
    .then((data) => renderCountries(data))
    .catch((err) => console.log(err));

  const renderError = () => {
    const countryDiv = document.querySelector(".countries");
    countryDiv.innerHTML += `<h2>Countries can not fetched</h2>
    <img src="./download.png" alt="">`;
  };

  const renderCountries = (data) => {
    console.log(data);
    const countryDiv = document.querySelector(".countries");
    const {
      capital,
      currencies,
      flags: { svg },
      languages,
      name: { common },
      region,
    } = data[0];
    countryDiv.innerHTML = `   <div class="card mx-auto m-3 shadow-lg" style="width: 18rem;">
    <img src="${svg}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${common}</h5>
      <p class="card-text">${region}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <i class="fas fa-lg fa-landmark"></i> ${capital}
      </li>
      <li class="list-group-item">
        <i class="fas fa-lg fa-comments"></i> ${Object.values(languages)}
      </li>
      <li class="list-group-item">
        <i class="fas fa-lg fa-money-bill-wave"></i>
        ${Object.values(currencies).map((item) => Object.values(item) + " ")}
     </li>
    </ul>
    
  </div>`;
  };
};
const fetchCountryByAllName =async ()=> {

  const url ="https://restcountries.com/v3.1/all"
  try {
    const res = await fetch(url);

    if (!res.ok) {
      isError = true;
    }

    const data = await res.json();
    
    renderNames(data);
  } catch (error) {
    console.log(error)
  }
  

}

const renderNames = (data)=> {
  const formSelect = document.querySelector(".form-select")
  if(isError) {
    document.querySelector("body") += `
      <h2>News Can not be fetched</h2>
      <img src="./img/404.png" alt="" />
    `;
    return;
  }


  data.forEach((item)=> {
    
    formSelect.innerHTML += `
    <option value="${item.name.common}">${item.name.common}</option>
    `;
  })
  console.log(data)

}


fetchCountryByName("turkey");
fetchCountryByAllName()