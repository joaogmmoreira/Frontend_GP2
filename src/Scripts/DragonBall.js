let url = `https://dragonball-api.com/api/characters?page=2&limit=30`


fetch(url).then((resp)=>{
    return resp.json()
}).then((result)=>{
  
    result.items.forEach(element => {
        
        let div = document.createElement("div")
        let img =  document.createElement("img")
        img.src = element.image
        let h3 = document.createElement("h3")
        h3.innerText = element.name
        let p = document.createElement("p")
        p.innerText = `
        ki: ${element.ki}
        raça ${element.race}`
        div.append(img,h3,p)
        document.getElementById("personagens").appendChild(div)
    });
   
}).catch((err)=>{
    console.log(err)
})