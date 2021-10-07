const buttonFind = document.getElementById("find")
const viewCard = document.getElementById("section")
const $marvel = document.getElementById("marvel")
const $dc = document.getElementById("dc")
const formCard = document.getElementById('form-check')
let resUni;

formCard.addEventListener("submit", (e) => {
    e.preventDefault()
    const actionFunc = async() => {
        if($marvel.checked && $dc.checked){
            const data = await classifyHero({marvel: true, dc: true})
            return returnHero(data)
        }else if ($marvel.checked){
            const data = await classifyHero({marvel: true, dc: false})
            return returnHero(data)
        }else if($dc.checked){
            const data = await  classifyHero({marvel: false, dc: true})
            return returnHero(data)
        }else{
            return viewHeros()
        }
    }
    actionFunc()
})

let selectUni = []
const getCard = async () =>{
    const data = await axios({
        method: "GET",
        url: "https://supercards-api.herokuapp.com/api/supercards"
    })
    const dataInfo = await data.data
    return dataInfo
}

const classifyHero = async(cheched) =>{
    const cardInfo = await getCard()
    if(cheched.marvel && cheched.dc ){
        return cardInfo
    }else if(cheched.marvel ){
        return cardInfo.filter(res => res.universe === 'Marvel')
    }else  if(cheched.dc ){
        return cardInfo.filter(res => res.universe === 'DC')
    }
}

const viewHeros = async() => {
    const cardInfo = await getCard()
    viewCard.innerHTML = ''
    console.log(cardInfo);
    for (const info of cardInfo) {
        viewCard.innerHTML += `<article>
        <div class="cards-heros" id="cards-heros">
            <div class="icons-container">
                <a href="#"><i class="fas fa-pen-square" id="icon-edit"></i></a>
                <a href="#"></a>
            </div>
            <div class="card-image mb-1">
            <img src="${info.image}">
            </div>
            <div class="card-data mt-2">
                <div class="name-container w-50">
                    <p>Name</p>
                    <h4>${info.name}</h4>
                </div>
                <div class="universe-container w-50">
                    <p>Universe</p>
                    <h5>${info.universe}</h5>
                </div>
            </div>     
        </div>
        </article>
        `

        console.log(info.name);
    }
    return viewCard
}


viewHeros()

const returnHero = (cardInfo) => {
    viewCard.innerHTML = ''
    console.log(cardInfo);
    for (const info of cardInfo) {
        viewCard.innerHTML += `<article>
        <div class="cards-heros" id="cards-heros">
            <div class="card-image mb-1">
            <img src="${info.image}">
            </div>
            <div class="card-data mt-2">
                <div class="name-container w-50">
                    <p>Name</p>
                    <h4>${info.name}</h4>
                </div>
                <div class="universe-container w-50">
                    <p>Universe</p>
                    <h5>${info.universe}</h5>
                </div>
            </div>     
        </div>
        </article>
        `
    }
    return viewCard
}

