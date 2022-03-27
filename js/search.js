

const find=document.querySelector('#search');

const search=async()=>
{
    console.log("entre")
    document.getElementById("posts").innerHTML = "";
 
    const containerPosts=document.querySelector('#posts');
    const url=`${urlDB}/posts.json`;
    const respuesta=await fetch(url);
    const body=await respuesta.json();
    const postsValues = Object.values(body);
    console.log(postsValues);
    const title = find.value;
    console.log(title)

    const posts = postsValues.filter((post)=>post.title.includes(title))
    console.log(posts)
    posts.forEach((post)=>{

        let postHTML = `
       <div class="card">
        <div class="d-flex">
          <img src="${post.avatar}" width="32em"
            height="32em" class="rounded-pill ms-3 mt-3 gap-3" alt="posts_avatar">
          <div class="d-flex flex-column mt-3 ms-1"><span>${post.nameP}</span>
            <small>${post.datetime}</small>
          </div>
        </div>
        <div class="card-body">
          <h4 class="card-title">${post.title}</h4>`
          if(post.tags)
          post.tags.forEach((tag)=>{
            postHTML+=`${tag}    `
          })
          
          if(post.ContentText)
          postHTML+=`<p class="card-text">${post.ContentText}</p>`
          postHTML+=`<div class="d-flex justify-content-between">
            <div><span><i class="bi bi-suit-heart"></i> ${post.counterReactions} Reactios</span>
              <span><i class="bi bi-chat-right"></i> ${post.counterComents} Comments</span>
            </div>
            <div><a href="#" class="btn btn-secondary btn-sm">Update</a>
              <a href="#" class="btn btn-secondary btn-sm">Delete</a>
            </div>
          </div>
        </div>
      </div>`

      containerPosts.insertAdjacentHTML('beforeend',postHTML);
    })
}