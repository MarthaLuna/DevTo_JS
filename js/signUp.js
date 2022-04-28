const url="";

const goToLogIn=()=>
{
    window.location.assign('../logIn.html');
}

const signUp=(e)=>
{
    e.preventDefault();
    console.log('entré al signUp');
    const inputsNode=e.target.querySelectorAll('input');
    const inputs=Array.from(inputsNode);
    let user={};

    inputs.forEach((input)=>
    {   
        user[input.name]=input.value;
    });

    
    createUser(user, (body)=>{
        console.log(body);
     });
     alert("USER SAVED SUCCESSFULLY")
    
    console.log(user);

    //si se hizo el registro con éxito, nos manda a login.html
    //goToLogIn();
}


const createUser = (user, funcion) =>
{
    const url=`http://localhost:8080/api/v1/users`;

    fetch(url,{
        method:'POST',
        body:JSON.stringify(user),
        headers:
        {
            'Content-Type':'application/json'
        }
    }).then((respuesta)=>respuesta.json())
    .then((body)=>funcion(body))
    .catch((error)=>console.log(error));
}