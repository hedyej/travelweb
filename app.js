
//選擇element
const selection = document.querySelector(".search .area")

//接API
async function getOption(){
    const res = await axios.get("https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json")
    const spot = res.data.result.records

    //篩選selection option
    const pastZone = spot.map(item => item.Zone)
    const newZone = pastZone.filter((item,index)=>{
        return pastZone.indexOf(item) === index
    })
    optionList = newZone 

    //放入selection option
    optionList.forEach(item => {
    const optionItem = document.createElement("option")
    optionItem.innerText = item
    selection.appendChild(optionItem)  
    })
   
    selection.addEventListener("change",e => {
        //依據選擇顯示資訊
        const optionArea = e.target.value

        //讓原本卡片消失？
        const resultGrid = document.querySelector(".resultGrid")
        resultGrid.innerHTML =" "
        
        let areaList = []
        for(i=0; i<spot.length; i++){
            if(spot[i].Zone === optionArea){
                areaList.push(spot[i])
            }
        }

        //取得資料
        areaList.forEach(item =>{
            const ticket = item.Ticketinfo
            const zone = item.Zone
            const add = item.Add
            const time = item.Opentime
            const name = item.Name
            const img = item.Picture1
            const tel = item.Tel

            //建立element
            const resultSection = document.querySelector(".resultSection")

            const cardDeck = document.createElement("div")
            cardDeck.classList.add("card-deck","h-100")

            const cardItem = document.createElement("div")
            cardItem.classList.add("card","p-0")

            const spotImg = document.createElement("img")
            spotImg.classList.add("imgCover","imgHeight","card-img-top","position-relative")
            spotImg.setAttribute("src",img)

            const titleSection = document.createElement("div")
            titleSection.classList.add("title","d-flex","justify-content-between","align-items-end","px-3","imgHeight","position-absolute","z-index-1")

            const title = document.createElement("h5")
            title.classList.add("text-light")
            title.textContent = name
            
            const des = document.createElement("p")
            des.classList.add("mb-2","text-light")
            selection.setAttribute("style","line-height:28px")
            des.textContent = zone     
            
            const cardBody  = document.createElement("div")
            cardBody.classList.add("card-body")

            const timeInfo = document.createElement("p")
            timeInfo.textContent = time
            

            const timeImg = document.createElement("img")
            timeImg.classList.add("icSize")
            timeImg.setAttribute("src","assets/icons_clock.png")

            const addInfo = document.createElement("p")
            addInfo.textContent = add

            const addImg = document.createElement("img")
            addImg.classList.add("icSize")
            addImg.setAttribute("src","assets/icons_pin.png")

            const lastLine = document.createElement("div")
            lastLine.classList.add("d-flex","justify-content-between")

            const phoneInfo = document.createElement("p")
            phoneInfo.textContent = tel

            const phoneImg = document.createElement("img")
            phoneImg.classList.add("icSize")
            phoneImg.setAttribute("src","assets/icons_phone.png")

            const tag = document.createElement("p")
            tag.setAttribute("style","margin-bottom")           
            tag.textContent = ticket

            const tagImg = document.createElement("img")
            tagImg.classList.add("icSize")
            tagImg.setAttribute("src","assets/icons_tag.png")
            


            //appendChild
            console.log(resultSection)
            resultSection.appendChild(resultGrid)
            resultGrid.appendChild(cardDeck)
            cardDeck.appendChild(cardItem)
            cardItem.appendChild(spotImg)
            cardItem.appendChild(titleSection)
            titleSection.appendChild(title)
            titleSection.appendChild(des) 
            cardItem.appendChild(cardBody)
            cardBody.appendChild(timeInfo)
            timeInfo.appendChild(timeImg)
            cardBody.appendChild(addInfo)
            addInfo.appendChild(addImg)
            cardBody.appendChild(lastLine)
            lastLine.appendChild(phoneInfo)
            phoneInfo.appendChild(phoneImg)
            lastLine.appendChild(tag)
            tag.appendChild(tagImg)
        })
        })
}

getOption()