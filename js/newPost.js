const urlDB = "https://devto-3e84b-default-rtdb.firebaseio.com/"

const postImg=document.querySelector('#postImg');
const postTitle=document.querySelector('#postTitle');
const postTextContent=document.querySelector('#postTextContent');
const tagsContainer=document.getElementById('tagsContainer');

let tags=[];

const posting = (e) =>
{   
    if(postTitle.value&&postTextContent.value)
    {
        recoverTags();
        //console.log('Se puede publicar');
        createPost(postImg.value,postTitle.value,postImg.value,tags,postTextContent.value, (body)=>{
            console.log(body);
         });
        cleanForm();
    }
    else
    {
        console.log('NO se puede');
    }
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
     */
     
     /*recoverTags();
     tags=[];
     console.log('Estoy haciendo submit');*/
}

const createPost = ( image, title, avatar, tags, contentText, funcion) =>
{
    const url=`${urlDB}/posts.json`;

    let today = new Date();
    let time = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    today = dd + '/' + mm + '/' + yyyy;


    const tiempoActual = today;

    let postID = `${time.getTime()}${time.getMilliseconds()}`;
    let datetime = tiempoActual;
    let counterReactions = 0;
    let counterComents = 0;
    let nameP = "Ada Lovelace";
    avatar = "https://api.binary-coffee.dev/uploads/Ada_Lovelace_Chalon_portrait_4d642eaf6a.jpeg"
    
    

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
    //tags=Array.from(document.querySelectorAll('#postTags'));
    const postTags = Array.from(document.querySelectorAll('#postTags'));
    if(postTags.length>0)
    {
        postTags.forEach((tag)=>{
            tags.push(tag.textContent);
        })
        //console.log(tags)
    }
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

    const claseTitle=Array.from(TitleAid.classList).find((clase)=>clase=='d-md-inline');
    const claseTags=Array.from(TagsAid.classList).find((clase)=>clase=='d-md-inline');
    const claseContent=Array.from(ContentAid.classList).find((clase)=>clase=='d-md-inline');

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