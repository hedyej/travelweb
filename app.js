
//接API
async function getOption(){
    const res = await axios.get("https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json")
    const spot = res.data.result.records


 //處理Selection
    //篩選行政區
    const pastZone = spot.map(item => item.Zone)
    const newZone = pastZone.filter((item,index)=>{
        return pastZone.indexOf(item) === index
    })
    optionList = newZone 

    //選擇selection
    const selection = document.querySelector(".search .area")

    //放入行政區選項
    optionList.forEach(item => {
    const optionItem = document.createElement("option")
    optionItem.innerText = item
    selection.appendChild(optionItem)  
    })
   
//選擇行政區
    selection.addEventListener("change",e => {
        //查看選擇
        const optionArea = e.target.value

        let fitSpot = []
        spot.forEach((item)=>{
            if(item.Zone === optionArea){
                fitSpot.push(item) 
            }
        })

        //讓上個行政區卡片消失
        const resultGrid = document.querySelector(".resultGrid")
        resultGrid.innerHTML =" "


//卡片群組
        let spotGroup = ""

        fitSpot.forEach(item =>{
            const ticket = item.Ticketinfo
            const zone = item.Zone
            const add = item.Add
            const time = item.Opentime
            const name = item.Name
            const img = item.Picture1
            const tel = item.Tel
            
            spotGroup += `
                <div class="card-deck">
                <div class="card p-0">
                    <img class="imgCover imgHeight card-img-top position-relative " src="${img}">
                    <div class="title text-light d-flex justify-content-between align-items-end px-3 imgHeight position-absolute z-index-1">
                        <h4> ${name} </h4>
                        <p style="line-height:28px;" class="mb-2"> ${zone} </p>
                    </div>
                    <div class="card-body">
                        <p><img class="icSize" src="assets/icons_clock.png"> ${time} </p>
                        <p><img class="icSize" src="assets/icons_pin.png"> ${add} </p>
                        <div class="d-flex justify-content-between">
                            <p><img class="icSize" src="assets/icons_phone.png"> ${tel} </p>
                            <p style="margin-bottom:0px"><img class="icSize" src="assets/icons_tag.png"> ${ticket}</p>
                        </div>
                    </div>
                </div>
            </div>        
            `
        })

        const grid = document.querySelector(".resultGrid")
        grid.innerHTML = spotGroup
        })
}

getOption()