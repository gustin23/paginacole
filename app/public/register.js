document.getElementById("register-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const password = e.target.children.password.value;
  console.log("Contraseña enviada para registro:", password);
  
  const res = await fetch("http://localhost:3001/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      password: password
    })
  });

  const data = await res.json();
  console.log("Respuesta del servidor:", data);
  if (res.ok) {
    alert(data.message);
  } else {
    alert(data.message);
  }
});



/*document.getElementById("register-form").addEventListener("submit",async(e)=>{
  e.preventDefault();
  const res = await fetch("http://localhost:4000/api/register",{
    method:"POST",
    headers:{
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({
      password: e.target.children.password.value
    })
  });
})*/