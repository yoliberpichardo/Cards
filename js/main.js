let viewCard = document.getElementById("section")
const getCard = async () =>{
    const data = await axios({
        method: "GET",
        url: "https://supercards-api.herokuapp.com/api/supercards"
    })
    const dataInfo = await data.data
    return dataInfo
}

const classifyHero = async() =>{
    const cardInfo = await getCard()
    let heroDc = [];
    let heroMarvel = [];
    for (const items of cardInfo) {
        if(items.universe == 'DC'){
            heroDc.push(items);
        }else{
            heroMarvel.push(items)
        } 

    }
    return heroDc,heroMarvel
}

const returnHero = async() => {
    const cardInfo = await getCard()
    viewCard.innerHTML = ''
    console.log(cardInfo);
    for (const info of cardInfo) {
        viewCard.innerHTML += `<article>
        <div class="cards-heros" id="cards-heros">
            <div class="icons-container">
                <i class="fas fa-pen-square"></i>
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


returnHero()

