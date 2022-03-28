window.queryParams=new URLSearchParams(window.location.search);
const id = queryParams.get('id');

const postImg = document.getElementById('postImg');
const postTitle = document.getElementById('postTitle');
const tagsContainer = document.getElementById('tagsContainer');
const postTextContent = document.getElementById('postTextContent');
const tagCreator=document.getElementById('tagCreator');

let tags=[];

const urlDB2 = "https://devto-3e84b-default-rtdb.firebaseio.com/"
//console.log(id);

const callPost = async()=>
{
    try 
    {
        let url=`${urlDB2}posts/${id}.json`;
        let respuesta = await fetch(url);
        let post=await respuesta.json();
        //console.log(post);
        postImg.value=post.image;
        postTitle.value=post.title;
        postTextContent.value=post.contentText;
        if(post.tags.length>0)
        {
            for(let i of post.tags)
            {
                tagCreator.value=i;
                recoverEachTag(tagCreator);
            }
            //console.log(tagsContainer.children.length);
        }
        //console.log(post.tags.length);

    } catch (error)
    {
            
    }
}

const updatePost = (fireBaseID, image, title, avatar, tags, contentText, funcion) => {

	const url = `${urlDB2}posts/${fireBaseID}.json`;

    const tiempoActual = new Date();

    let postID = `${tiempoActual.getTime()}${tiempoActual.getMilliseconds()}`;
    let datetime = tiempoActual.getTime();
    let counterReactions = 4;
    let counterComents = 4;
    let nameP = "Flavio Morales"
    
    const post = {postID, datetime, counterReactions, counterComents, image, title, avatar, tags, contentText, nameP};

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

const sendUpdate=()=>
{
    recoverTags();
    console.log(tags);
    console.log(id.toString());
    updatePost(id, postImg.value, postTitle.value, postImg.value, tags, postTextContent.value, (body)=>
    {
        console.log(body);
    });
    tags=[];
    cleanForm();
}

const removeTag = () =>
{
    let elemets=tagsContainer.children.length;
    const tagCreator=document.getElementById('tagCreator');
    if(elemets==4)
    {   
        tagCreator.classList.remove('d-none');
        tagCreator.placeholder='Add one more...';
    }
    else if(elemets==1)
    {
        tagCreator.placeholder="Add up to 4 tags...";
    }
    else
    {
        tagCreator.placeholder="Add another...";
    }

}

const recoverEachTag=(e)=>
{
    //console.log(e);
    let elemets=tagsContainer.children.length;
    if(elemets<=3)
    {
        if(elemets==0){e.placeholder='Add another...';}
        if(elemets==2){e.placeholder='Add one more...';}
        const tag=`
        <span class="rounded-pill alert alert-warning alert-dismissible fade show m-0 me-1 pt-1 pb-1 ps-2 d-flex" role="alert">
            <div id="postTags" class="">${e.value}</div>
            <button type="button" onclick="removeTag()" class="text-dark btn-close pt-3 pb-1 pe-1 me-1" data-bs-dismiss="alert" aria-label="Close"></button>
        </span>
        `;
        e.value='';
        tagsContainer.insertAdjacentHTML('beforeend',tag);
    }
    elemets=tagsContainer.children.length;
    if(elemets>3)
    {
        e.classList.add('d-none')
    }
}

const addTag=(e)=>
{
    let elemets=tagsContainer.children.length;
    if(elemets<=3)
    {
        if(elemets==0){e.target.placeholder='Add another...';}
        if(elemets==2){e.target.placeholder='Add one more...';}
        const tag=`
        <span class="rounded-pill alert alert-warning alert-dismissible fade show m-0 me-1 pt-1 pb-1 ps-2 d-flex" role="alert">
            <div id="postTags" class="">#${e.target.value}</div>
            <button type="button" onclick="removeTag()" class="text-dark btn-close pt-3 pb-1 pe-1 me-1" data-bs-dismiss="alert" aria-label="Close"></button>
        </span>
        `;
        e.target.value='';
        tagsContainer.insertAdjacentHTML('beforeend',tag);
    }
    elemets=tagsContainer.children.length;
    if(elemets>3)
    {
        e.target.classList.add('d-none')
    }
}

const recoverTags = () =>
{
    const postTags = Array.from(document.querySelectorAll('#postTags'));
    if(postTags.length>0)
    {
        postTags.forEach((tag)=>{
            tags.push(tag.textContent);
        })
    }
}

const cleanForm = (e) =>
{
    //e.preventDefault();
    postTitle.value='';
    postTextContent.value='';
    postImg.value='';
    if(tagsContainer.children.length>0)
    {
        tagsContainer.innerHTML='';
        tags=[];
    }
}

callPost();