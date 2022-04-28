const logOut=()=>
{
    localStorage.clear();
    goHome();
}

const goHome=()=>
{
    window.location.assign('../index.html');
}