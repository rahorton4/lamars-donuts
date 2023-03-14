
// fetch json data
fetch("locations.json")
.then(res => res.json())
.then(data => renderLocations(data));


function renderLocations(data){
    let locationTemplate = document.querySelector("#location-template");
    let output = "";
 
    for (let i=0; i<data.locations.length; i++){
       if (i == 0){
        output += `<h3>${data.locations[i].state}</h3>`
       }
       else if (data.locations[i].state !== data.locations[i-1].state){
        output += `<hr /><h3>${data.locations[i].state}</h3>`
       }
       output +=
       `
        <div class="location-card">
                <div class="card col-lg-3 col-md-3 col-sm-6 card-body" style="width: 18rem;">       
                    <h5 class="card-title underline">${data.locations[i].city} </h5>
                    <h6 class="card-subtitle mb-2">${data.locations[i].address} </h6>
                    <h5 class="card-title underline">Contact and Hours</h5>
                    <div class="card-info">
                        <div><span class="bold">Phone: </span>${data.locations[i].phone} </div>
                        <div><span class="bold">Fax: </span>${data.locations[i].fax} </div>
                        <div class="bold underline">Hours: </div>
                        <div>${data.locations[i].hours} </div>
                    </div> 
                </div>    
        </div>          
       `
     
    }
    locationTemplate.innerHTML = output;
}


