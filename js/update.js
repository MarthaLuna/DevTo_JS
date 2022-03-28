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
