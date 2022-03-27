const urlDB = "https://devto-3e84b-default-rtdb.firebaseio.com/"

const postImg=document.querySelector('#postImg');
const postTitle=document.querySelector('#postTitle');
const postTextContent=document.querySelector('#postTextContent');
const tagsContainer=document.getElementById('tagsContainer');

let tags=[];

const posting = (e) =>
{
    //e.preventDefault();
    //let tags= ["#javascritp", "#html", "#web"];
    /*createPost( "https://talently.tech/blog/wp-content/uploads/2021/11/Frame-57.png", "programacion web", "https://talently.tech/blog/wp-content/uploads/2021/11/Frame-57.png", tags, "Aqui va toda la descripción",  (body) => {
    console.log(body)
    })*/

    /*console.log("Image: ", postImg.value,"title: ", postTitle.value, "Image: ",postImg.value, "Tags: ", postTags.value, "TextContent: ",postTextContent.value);
    const img = postImg.value
     createPost(img,postTitle.value,postImg.value,tags,postTextContent.value, (body)=>{
        console.log(body);
     });
     tags=[];*/
     recoverTags();
     console.log('Estoy haciendo submit');
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

    console.log(tagsContainer.children.length);
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

const showAid = (e) =>
{
    const TitleAid   =document.getElementById('TitleAid');
    const TagsAid    =document.getElementById('TagsAid');
    const ContentAid =document.getElementById('ContentAid');

    console.log(TitleAid);

    const claseTitle=Array.from(TitleAid.classList).find((clase)=>clase=='d-md-inline');
    const claseTags=Array.from(TagsAid.classList).find((clase)=>clase=='d-md-inline');
    const claseContent=Array.from(ContentAid.classList).find((clase)=>clase=='d-md-inline');

    console.log(claseTitle);

    if(e.target.id=='postTitle')
    {
        if(!claseTitle){TitleAid.classList.add("d-md-inline");}
        if(claseTags){TagsAid.classList.remove('d-md-inline');}
        if(claseContent){ContentAid.classList.remove('d-md-inline');}
    }
    else if(e.target.id=='tagCreator')
    {
        if(!claseTags){TagsAid.classList.add('d-md-inline');}
        if(claseTitle){TitleAid.classList.remove('d-md-inline');}
        if(claseContent){ContentAid.classList.remove('d-md-inline');}
    }
    else
    {
        if(!claseContent){ContentAid.classList.add('d-md-inline');}
        if(claseTags){TagsAid.classList.remove('d-md-inline');}
        if(claseTitle){TitleAid.classList.remove('d-md-inline');}
    }    
}