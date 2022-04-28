const url="";

const goHome=()=>
{
    window.location.assign('../index.html');
}

const logIn=(e)=>
{
    try{

        e.preventDefault();
    console.log('entré al logIn');
    const password=document.querySelector('#passwordInput').value;
    const email=document.querySelector('#emailInput').value;
    console.log(password)
    console.log(email)
    createToken(password,email, (body)=>{
       localStorage.setItem("userToken",Object.values(body)[1])
       if(Object.values(body)[1] == "No existe el usuario")
       {
        alert("Credenciales invalidas");
       }
       else
       {
        goHome();
       }
        
     }); 
    }catch(error)
    {   
       console.log(error)
    }
    
    //si se logró el logIn, nos manda a index.html
    
}

const createToken = (pass, email, funcion) =>
{
    const url=`http://localhost:8080/api/v1/auth/login`;

    const userlogin = {
            password: pass.toString(),
            email: email.toString()
    };

    fetch(url,{
        method:'POST',
        mode: 'cors',
        body:JSON.stringify(userlogin),
        headers:
        {
            'Content-Type':'application/json'
        }
    }).then((respuesta)=>respuesta.json())
    .then((body)=>funcion(body))
    .catch((error)=>console.log(error));
}

