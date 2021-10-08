const sendCard = document.querySelector(".form-body");
const nameCard = document.getElementById("name");
const uniCard = document.getElementById("universe");
const imageCard = document.getElementById("image");

function getBase64FomFile(img){
    let fileReader;
    return new Promise((resolve, reject) => {
        fileReader =  new FileReader();
        fileReader.readAsDataURL(img);
        fileReader.addEventListener('load', () => {
            resolve(fileReader.result)
        })
    })
}



sendCard.addEventListener("submit", (e)=>{
    e.preventDefault()
    
    const func = async (img64) => {
        if(nameCard.value && uniCard.value){
            const returnData = await postCard({
                name: nameCard.value,
                universe: uniCard.value,
                image: img64
            })
            return window.location="./index.html"
        }else {
            alert("Los campos requeridos no estan completos")
        }
    }

    const convertImg = async () => {
        const base64 = await getBase64FomFile(imageCard.files[0]);

        func(base64)
    }

    convertImg()
})

const postCard = async(postData) =>{
    const awaitCard=  await axios({
            method: "POST",
            url: "https://supercards-api.herokuapp.com/api/supercards",
            headers:{'Content-Type':'application/json','authorization':'AZJYR54ER9HPL6321WSC4SEE8FGF66W'},
            data: postData
    });
    const returnAwai = await awaitCard;
    console.log(returnAwai)
}
