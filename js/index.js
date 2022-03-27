const urlDB = "https://devto-3e84b-default-rtdb.firebaseio.com/"
const containerPosts=document.querySelector('#posts');

const getPosts2=async()=>
{
    const url=`${urlDB}/posts.json`;
    const respuesta=await fetch(url);
    const body=await respuesta.json();
    const postsValues = Object.values(body);
    //console.log(postsValues);

    /////////////////FLAVIO///////////////////////
    //console.log(typeof body);
    //console.log(Object.keys(body));
    const postKeys=Object.keys(body);
    //console.log(body[postKeys[2]]);
    for(let i of postKeys)
    {
      let post=body[i];

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
            <div>
              <div onclick="editPost('${i}')" class="btn btn-secondary btn-sm">Update</div>
              <a href="#" class="btn btn-secondary btn-sm">Delete</a>
            </div>
          </div>
        </div>
      </div>`

      containerPosts.insertAdjacentHTML('beforeend',postHTML);

    }

    document.editPost = (firebaseID) =>
    {
        window.location.assign(`/editPost.html?id=${firebaseID}`);
    }

    /////////////////FLAVIO///////////////////////

    /*postsValues.forEach((post)=>{
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
    })*/
}

getPosts2();