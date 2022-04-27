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
    console.log(user);

    //si se hizo el registro con éxito, nos manda a login.html
    goToLogIn();
}