const urlDB = "https://devto-3e84b-default-rtdb.firebaseio.com/"

const createPost = ( image, title, avatar, tags, contentText, funcion) =>
{
    const url=`${urlDB}/posts.json`;
    const tiempoActual = new Date();


    let postID = `${tiempoActual.getTime()}${tiempoActual.getMilliseconds()}`;
    let datetime = tiempoActual.getTime();
    let counterReactions = 0;
    let counterComents = 0;
    
    

    const post = {postID, datetime, counterReactions, counterComents, image, title, avatar, tags, contentText};

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

let tags= ["#javascritp", "#html", "#web"];
//createPost( "https://talently.tech/blog/wp-content/uploads/2021/11/Frame-57.png", "programacion web", "https://talently.tech/blog/wp-content/uploads/2021/11/Frame-57.png", tags, "Aqui va toda la descripción",  (body) => {
    //console.log(body)
//})



const getPosts = (funcion) =>
{
    const url=`${urlDB}/posts.json`;
    fetch(url)
    .then(respuesta => respuesta.json())
    .then((body) => funcion(body))
    .catch((error)=>console.log(error));
}

const getPosts2=async()=>
{
    const url=`${urlDB}/posts.json`;
    const respuesta=await fetch(url);
    const body=await respuesta.json();
    console.log(body);
    return body;
}

//getPosts2()


const deletePost = (fireBaseID) => {

	const url = `${urlDB}/posts/${fireBaseID}.json`;
	fetch(url, {
		method: 'DELETE'
	})
	 .then(respuesta => respuesta.json())
	 .then((body) => console.log(body))
	 .catch((error) => console.log(error));

}

//deletePost("-Mz7Lqsv3kZ6vFZ-urfC");

const updatePost = (fireBaseID, image, title, avatar, tags, contentText, funcion) => {

	const url = `${urlDB}/posts/${fireBaseID}.json`;

    const tiempoActual = new Date();


    let postID = `${tiempoActual.getTime()}${tiempoActual.getMilliseconds()}`;
    let datetime = tiempoActual.getTime();
    let counterReactions = 4;
    let counterComents = 4;
    
    

    const post = {postID, datetime, counterReactions, counterComents, image, title, avatar, tags, contentText};


	fetch(url, {
		method: 'PUT',
        body:JSON.stringify(post),
        headers:
        {
            'Content-Type':'application/json'
        }
	})
	 .then(respuesta => respuesta.json())
	 .then((body) => funcion(body))
	 .catch((error) => console.log(error));

}
updatePost("-Mz7ezgQhj3bcXYrt6Xs", "https://talently.tech/blog/wp-content/uploads/2021/11/Frame-57.png", "programacion web", "https://talently.tech/blog/wp-content/uploads/2021/11/Frame-57.png", tags, "Aqui va toda la descripción",  (body) => {
    //console.log(body)
})


