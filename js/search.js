

const find=document.querySelector('#search');

const search=async()=>
{
    console.log("entre")
    document.getElementById("posts").innerHTML = "";
 
    const containerPosts=document.querySelector('#posts');
    const url=`${urlDB}/posts.json`;
    const respuesta=await fetch(url);
    const body=await respuesta.json();

    const postValues=Object.keys(body).map((id) =>
    {
      const post=body[id];
      console.log(id);
      return{
        firebaseID:id.toString(),
        postID:post.postID,
        datetime:post.datetime,
        day:post.day,
        month:post.month,
        year:post.year,
        counterReactions:post.counterReactions,
        counterComents:post.counterComents,
        image:post.image,
        title:post.title,
        avatar:post.avatar,
        tags:post.tags,
        contentText:post.contentText,
        nameP:post.nameP,
      }
    });

    const title = find.value.toLowerCase();

    const posts = postValues.filter((post)=>post.title.toLowerCase().includes(title));
    posts.forEach((post)=>{

      let postHTML = `
      <div ondblclick="openPost('${post.firebaseID}')" class="card mb-2">
      `
      if(post.image)
     {postHTML += `<img class="card-img-top" src = "${post.image}">`} 
       
     postHTML +=  `<div class="d-flex">
        
          <img src="${post.avatar}" width="32em"
            height="32em" class="rounded-pill ms-3 mt-3 gap-3" alt="posts_avatar">
          <div class="d-flex flex-column mt-3 ms-1"><span>${post.nameP}</span>
            <small>${post.day}/${post.month}/${post.year}</small>
          </div>
        </div>
        <div class="card-body">
          <h4 class="card-title">${post.title}</h4>`
          if(post.tags)
          post.tags.forEach((tag)=>{
            postHTML+=`${tag}    `
          })
          
          if(post.contentText)
          postHTML+=`<p class="card-text">${post.contentText.substring(0,50)}...</p>`
          postHTML+=`<div class="d-flex justify-content-between">
            <div><span><i class="bi bi-suit-heart"></i> ${post.counterReactions} Reactios</span>
              <span><i class="bi bi-chat-right"></i> ${post.counterComents} Comments</span>
            </div>
            <div>
            <a onclick="editPost('${post.firebaseID}')" class="btn btn-secondary btn-sm">Update</a>
            <a onclick="deletePost('${post.firebaseID}')" class="btn btn-secondary btn-sm">Delete</a>
            </div>
          </div>
        </div>
      </div>`

      containerPosts.insertAdjacentHTML('beforeend',postHTML);
    })
}