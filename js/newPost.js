const urlDB = "https://devto-3e84b-default-rtdb.firebaseio.com/"

const postImg=document.querySelector('#postImg');
const postTitle=document.querySelector('#postTitle');
const postTextContent=document.querySelector('#postTextContent');
const postTags=document.querySelector('#postTags');

const postear = (e) =>
{
    e.preventDefault();
    let tags= ["#javascritp", "#html", "#web"];
    /*createPost( "https://talently.tech/blog/wp-content/uploads/2021/11/Frame-57.png", "programacion web", "https://talently.tech/blog/wp-content/uploads/2021/11/Frame-57.png", tags, "Aqui va toda la descripción",  (body) => {
    console.log(body)
    })*/

    console.log("Image: ", postImg.value,"title: ", postTitle.value, "Image: ",postImg.value, "Tags: ", postTags.value, "TextContent: ",postTextContent.value);
    const img = postImg.value
     createPost(img,postTitle.value,postImg.value,tags,postTextContent.value, (body)=>{
        console.log(body);
     });
}

const createPost = ( image, title, avatar, tags, contentText, funcion) =>
{
    const url=`${urlDB}/posts.json`;
    const tiempoActual = new Date();


    let postID = `${tiempoActual.getTime()}${tiempoActual.getMilliseconds()}`;
    let datetime = tiempoActual.getTime();
    let counterReactions = 0;
    let counterComents = 0;
    let nameP = "Pedro Lopez";
    
    

    const post = {postID, datetime, counterReactions, counterComents, image, title, avatar, tags, contentText, nameP};

    fetch(url,{
        method:'POST',
        body:JSON.stringify(post),
        headers:
        {
            'Content-Type':'application/json'
        }
    }).then((respuesta)=>respuesta.json())
    .then((body)=>funcion(body))
    .catch((error)=>console.log(error));
}