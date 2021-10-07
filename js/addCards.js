const sendCard = document.querySelector(".form-body");
const nameCard = document.getElementById("name");
const uniCard = document.getElementById("universe");
const imageCard = document.getElementById("image")


sendCard.addEventListener("submit", (e)=>{
    e.preventDefault()
    const func = async () => {
        if(nameCard.value && uniCard.value){
            console.log({
                nameCard: nameCard.value,
                uniCard: uniCard.value
            });
            const data = await postCard({
                name: nameCard, 
                universe: uniCard,
                image: "asdsadsadsadas"
            });
            console.log(data); 
        }else {
            alert("Los campos requeridos no estan completos")
        }
    }
    func()
})

const postCard = async(data) =>{
    return await axios.post("https://supercards-api.herokuapp.com/api/supercards",{
        name: data.name,
        universe: data.universe,
        image: data.image
    },
    {
        headers:{
            'Content-Type': 'application/json',
            'authorization': 'AZJYR54ER9HPL6321WSC4SEE8FGF66W',
        }

    }
    )
}
