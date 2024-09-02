document.getElementsByTagName("button")[0].addEventListener("click",()=>{
    document.cookie ='jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'; //cookie vieja que deteca que ya expiro asi se borra
    document.location.href = "/"
  })