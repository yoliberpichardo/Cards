const buttonFind = document.getElementById("find")
const viewCard = document.getElementById("section")
const $marvel = document.getElementById("marvel")
const $dc = document.getElementById("dc")
const formCard = document.getElementById('form-check')

let resUni;
let cardId;

let dataIsAbiable = false


formCard.addEventListener("submit", (e) => {
    e.preventDefault()
    dataIsAbiable = true
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

const deleteCard = async (id) => {
    await axios.delete(`https://supercards-api.herokuapp.com/api/supercards/${id}`, {
        headers: {'authorization':'AZJYR54ER9HPL6321WSC4SEE8FGF66W'},
    })
}

window.addEventListener("click", async (e) => {
    if (e.target.dataset.id === "delete"){
        await deleteCard(e.target.id)
        location.reload()
    }
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
    console.log(cardInfo,);
    for (const info of cardInfo) {
        viewCard.innerHTML +=  `<article>
        <div class="cards-heros" id="cards-heros" style="background: url('${info.image}')">
            <div class="icons-container">
                <a href="./editCards.html"><i class="fas fa-pen-square" id="icon-edit"></i></a>
                <button data-id="delete" id="${info._id}" class="delete"><svg data-id="delete" id="${info._id}" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-eraser-fill" viewBox="0 0 16 16">
                <path id="${info._id}" data-id="delete"  d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"/>
                </svg></button>
            </div>            
            <div class="card-data">
                <div class="name-container w-50">
                    <p>Name</p>
                    <h4>${info.name}</h4>
                </div>
                <div class="universe-container w-50">
                    <p>Universe</p>
                    <h4>${info.universe}</h4>
                </div>
            </div>     
        </div>
        </article>
        `
    }
    dataIsAbiable = true
    return viewCard
}

const returnHero = (cardInfo) => {
    viewCard.innerHTML = ''
    console.log(cardInfo);
    for (const info of cardInfo) {
        viewCard.innerHTML +=  `<article>
        <div class="cards-heros" id="cards-heros" style="background: url('${info.image}')">
            <div class="icons-container">
                <a href="./editCards.html"><i class="fas fa-pen-square" id="icon-edit"></i></a>
                <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-eraser-fill" viewBox="0 0 16 16">
                <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"/>
                </svg></a>
            </div>            
            <div class="card-data">
                <div class="name-container w-50">
                    <p>Name</p>
                    <h4>${info.name}</h4>
                </div>
                <div class="universe-container w-50">
                    <p>Universe</p>
                    <h4>${info.universe}</h4>
                </div>
            </div>     
        </div>
        </article>
        `
    }
    return viewCard
}

viewHeros()