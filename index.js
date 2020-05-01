let addform = false;
const div=document.querySelector('#showlist')

  const addBtn = document.querySelector("#new-toy-btn");
  const Container = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    addform = !addform;
    if (addform) {
      Container.style.display = "block";
    } else {
      Container.style.display = "none";
    }
  })

const form=document.getElementsByClassName("add-show")[0]

form.addEventListener("submit", (e)=> {
    e.preventDefault()
    console.log(e.target.title.value)
    
    fetch(`http://api.tvmaze.com/search/shows?q=${e.target.title.value}`)
    .then(resp => resp.json())
    .then(resp=> showtitles(resp))

    e.target.reset()
})


function showtitles(titles){
    titles.forEach( title =>{
        let li=document.createElement('li')
        li.innerText=`${title.show.name}- ${title.show.premiered.slice(0,4)}`
        div.appendChild(li)
        li.addEventListener('click', (event)=> makeCard(event, title))
    }
    )
}


function makeCard(event, title){
    const TvDiv=document.createElement("div")
    TvDiv.className='card'
    TvDiv.innerHTML= `<h2>${title.show.name}
    </h2> <img src=${title.show.image.medium} class='Toy-avatar' />`
    div.appendChild(TvDiv)

    fetch(`http://api.tvmaze.com/shows/${title.show.id}/seasons`)
    .then(resp => resp.json())
    .then(resp=> {
        console.log(resp)
        addSeasons(resp)
    })

  }

  function addSeasons(seasons){
      seasons.forEach(season => {
        fetch(`http://api.tvmaze.com/seasons/${season.id}/episodes`)
        .then(resp => resp.json())
        .then(resp=> {
            console.log(resp)
        }
        )}
      )
  }