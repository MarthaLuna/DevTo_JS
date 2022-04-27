const url="";

const goHome=()=>
{
    window.location.assign('../index.html');
}

const logIn=(e)=>
{
    e.preventDefault();
    console.log('entré al logIn');
    const password=document.querySelector('#passwordInput');
    const email=document.querySelector('#emailInput');

    //si se logró el logIn, nos manda a index.html
    goHome();
}

