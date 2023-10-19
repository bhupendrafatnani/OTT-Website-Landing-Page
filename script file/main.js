//=================================general=================================
let play_btn = document.getElementById('play');
play_btn.addEventListener('click', ()=> {
  alert("really sorry!\nThis is just an sample landing page so we don't have any rights to play this video.")
});

let login = document.getElementById('login');
login.addEventListener('click', ()=> {
  alert("really sorry!\nThis is just an Front-End sample landing page so we don't have any server side management to save your login details.")
});

//=========================trailer download btns==========================
let download_trailer = document.getElementById('download_main');
let low_q_trailer = document.getElementById('low_q');
let medium_q_trailer = document.getElementById('medium_q');
let high_q_trailer = document.getElementById('high_q');

download_trailer.addEventListener('click', ()=> {
  download_trailer.style.display = "none";
  low_q_trailer.style.display = "flex";
  medium_q_trailer.style.display = "flex";
  high_q_trailer.style.display = "flex";
  history.pushState({ display: 'quality_options' }, null, null);

//====================setting for browser back button======================
  window.onpopstate = (event) => {
    if (event.state && event.state.display === 'quality_options') {
      download_trailer.style.display = "flex";
      low_q_trailer.style.display = "none";
      medium_q_trailer.style.display = "none";
      high_q_trailer.style.display = "none";
    }
  };
});

//======================header popular section btns========================
let header_left_btn = document.getElementsByClassName("bi-chevron-left")[0];
let header_right_btn = document.getElementsByClassName("bi-chevron-right")[0];
let popular_card = document.getElementsByClassName("cards")[0];
let search_bar = document.getElementsByClassName("search")[0];
let search_input = document.getElementById("search_input");

header_left_btn.addEventListener("click", () => {
  popular_card.scrollLeft -= 140;
});
header_right_btn.addEventListener("click", () => {
  popular_card.scrollLeft += 140;
});

//===============json file for popular cards==================
let json_url = "movie.json";
//=================fetching json file in popular section==================
fetch("movie.json")
  .then((Response) => Response.json())
  .then((data) => {
    data.forEach((ele, i) => {
      let { name, imdb, date, sposter, bposter, genre, url } = ele;
      let popular_section_card = document.createElement("a");
      popular_section_card.classList.add("card");
      popular_section_card.href = url;
      popular_section_card.innerHTML = `<img src="${sposter}" alt="${name}" class="poster">
        <div class="rest_card">
          <img src="${bposter}" alt="">
          <div class="cont">
            <h4>${name}</h4>
            <div class="sub">
              <p>${genre}, ${date}</p>
              <h3><span>IMDB</span><i class="bi bi-star-fill"></i>${imdb}</h3>
            </div>
          </div>
        </div>`;
      popular_card.appendChild(popular_section_card);
    });
    document.getElementById("title").innerText = data[2].name;
    document.getElementById("S&M_detail").innerText = data[2].s_m_details;
    document.getElementById("platform").innerText = data[2].platform;
    document.getElementById("gen").innerText = data[2].genre;
    document.getElementById("date").innerText = data[2].date;
    document.getElementById(
      "rate"
    ).innerHTML = `<span>IMDB </span><i class="bi bi-star-fill"></i> ${data[0].imdb}`;

    //===================search bar==========================
    data.forEach(search => {
      let { name, imdb, date, sposter, genre, url,} = search;
      let popular_section_card = document.createElement("a");
      popular_section_card.classList.add("card");
      popular_section_card.href = url;
      popular_section_card.innerHTML = `<img src="${sposter}" alt="" />
      <div class="cont">
        <h3>${name}</h3>
        <p>
          ${genre}, ${date}, <span>IMDB</span
          ><i class="bi bi-star-fill"></i>${imdb}
        </p>
      </div>`;
      search_bar.appendChild(popular_section_card);
    });

    //====================search filter============================
    search_input.addEventListener('keyup', ()=> {
      let search_filter = search_input.value.toUpperCase();
      let search_a = search_bar.getElementsByTagName('a');

      for (let index = 0; index < search_a.length; index++) {
        let b = search_a[index].getElementsByClassName('cont')[0];
        let textValue = b.textContent || b.innerText;
        if (textValue.toUpperCase().indexOf(search_filter) > -1) {
          search_a[index].style.display = "flex";
          search_bar.style.visibility = "visible";
          search_bar.style.opacity = 1;
        } else {
          search_a[index].style.display = "none";
        }
        if (search_input.value.length == 0) {
          search_bar.style.visibility = "hidden";
          search_bar.style.opacity = 0;
        }
      }
    })
  });