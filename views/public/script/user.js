// api url
const api_url = 
      "http://localhost:3000/get_users";

// Defining async function
async function get_user(url) {
   
    // Storing response
    const response = await fetch(url);
   
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    show(data)
}

// Calling that async function
get_user(api_url);

function show(data) {
    let tab = 
        `<tr>
          <th>Primeiro Nome</th>
          <th>Último Nome</th>
          <th>Email</th>
          <th>Nível Administrador</th>
         </tr>`;
   
    // Loop to access all rows 
    for (let r of Object.values(data)) {
        tab += `<tr> 
    <td>${r.first_name} </td>
    <td>${r.last_name}</td>
    <td>${r.email}</td> 
    <td>${r.level_administrator}</td>          
</tr>`;
    }
    // Setting innerHTML as tab variable
    document.getElementById("employees").innerHTML = tab;
}

window.onload = function(){
    get_user(api_url);
    console.log('refresh data')
}
