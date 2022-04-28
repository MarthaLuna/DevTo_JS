const url="";

const goHome=()=>
{
    window.location.assign('../index.html');
}

const getProfileInfo = async() =>
{
    localStorage.getItem('token');
    const user=await fetch(url);

    popularFormulario(user);
    return;
}

const user = {
    firstname:"Flavio",
    lastname:"Morales",
    email:"flavio.com",
    password:"1234",
    image:"fqwfqwefqwe.jpg",
    country:"Mexico",
    birthday:"1996-12-17",
    description:"loremf fwefqwef qwef qwef g wb wb qwef q efq rgqwgw"
};

const popularFormulario=(user)=>
{
    console.log(user);
    const inputsNode=document.getElementById('signUpForm');
    const inputs=Array.from(inputsNode);
    inputs.forEach((input)=>
    {
        input.value=user[input.name];
    })
    //console.log(inputs);
    return;
}

/*const editProfile=(e)=>
{
    e.preventDefaul();
    const inputsNode=e.target.querySelectorAll('input');
    const inputs=Array.from(inputsNode);
    let user={};
    inputs.forEach((input)=>
    {
        user[input.name]=input.value;
    });

    updateUser(user,(body)=>{
        console.log(body);
    });
    alert("USER UPDATED SUCCESSFULLY");
}

const updateUser =(user,funcion) =>
{
    const url="";
    fetch(url,{
        method:'PUT',
        body:JSON.stringify(user),
        headers:
        {
            'Content-Type':'application/json'
        }
    }).then((respuesta)=>respuesta.json())
    .then((body)=>funcion(body))
    .catch((error)=>console.log(error));
}*/

const cancel=(e)=>
{
    console.log('Cancelao');
    goHome();
}

popularFormulario(user);