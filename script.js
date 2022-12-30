let IpAddress = document.getElementById('Ip-address')
let Ip = document.getElementById('IPaddress')
let Latitude = document.getElementById('lat')
let City = document.getElementById('city')
let Org = document.getElementById('organisation')
let Longitude = document.getElementById('long')
let Region = document.getElementById('region')
let Host = document.getElementById('hostname')
let Time = document.getElementById('time-zone')
let Dated = document.getElementById('date')
let PinCode = document.getElementById('pincod')
let GoogleMap = document.getElementById('googleMap')
let Name = document.getElementById('name')
let Message = document.getElementById('message')
const postofficesListInfo = document.getElementById('postoffices-list-info')
let Filter = document.getElementById('filter')
let newData
let postofficesList = []


$.getJSON("https://api.ipify.org?format=json", function(data) {
    console.log(data)
   // IpAddress.innerText = data.ip
    $("#Ip-address").html(data.ip);
    newData=data.ip
})

function handleApiCall(){
   let value = fetch(`https://ipinfo.io/${newData}/geo?token=989781554192cf`)

     value
     .then(pro => pro.json())
     .then(location => {
        // location = {
        //     "ip": "202.142.113.37",
        //     "city": "Kolkata",
        //     "region": "West Bengal",
        //     "country": "IN",
        //     "loc": "22.5626,88.3630",
        //     "org": "AS17747 SITI NETWORKS LIMITED",
        //     "postal": "700006",
        //     "timezone": "Asia/Kolkata",
        //     "readme": "https://ipinfo.io/missingauth"
        //   }
        //console.log('uihuih')
        let cordinates=location.loc.split(',')
       // $("#Ip-address").html(data.ip);
    Ip.innerText= location.ip
    Latitude.innerText ='Lat:'+cordinates[0]
    City.innerText = 'City:'+location.city
    Org.innerText = 'Organisation:'+location.org
    Longitude.innerText='Long:'+ cordinates[1]
    Region.innerText='Region:' + location.region
    Host.innerText='Hostname: not available' 
    GoogleMap.src=`https://maps.google.com/maps?q=${location.loc}&output=embed`
    Time.innerText='Time-Zone:'+location.timezone
    Dated.innerText='Date:30/12/22'
    PinCode.innerText='Pincode'+location.postal
    Message.innerText='Message:Number of pincode(s) found:'

    let postOfficesData = fetch(`https://api.postalpincode.in/pincode/${location.postal}`)
    postOfficesData
    .then(val => val.json())
    .then(postofficesresult =>{
       postofficesList = postofficesresult[0].PostOffice;
        showPostoffices(postofficesresult[0].PostOffice);
 })
  .catch(error => 
    console.log(error))
}).catch(err => console.log(err))
}

function showPostoffices (list){
    let html = ''

    list.forEach(postOffice => {
        html += `<div id="postoffice-item">
        <h2 id="name">Name: ${postOffice.Name}</h2>
        <h2 id="division">Branch-Type: ${postOffice.BranchType}</h2>
        <h2 id="district">Delivery-Status: ${postOffice.DeliveryStatus}</h2>
        <h2 id="branch">District: ${postOffice.District}</h2>
        <h2 id="delivery">Division: ${postOffice.Division}</h2>   
    </div>`
    })
    postofficesListInfo.innerHTML = html;
}

function postOfficeBtn(){
     
     let filtered_postOffice = postofficesList.filter((a)=>{
        if(a.Name.includes(Filter.value)){
          return true
        }
        else{
            return false
        }
     })
     showPostoffices(filtered_postOffice)
        
    }
    
  



