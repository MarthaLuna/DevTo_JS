const urlDB = "https://devto-3e84b-default-rtdb.firebaseio.com/"
const containerPosts = document.querySelector('#posts');

const getPosts2 = async () => {
  const url = `${urlDB}/posts.json`;
  const respuesta = await fetch(url);
  const body = await respuesta.json();

  const postValues=Object.keys(body).map((id)=>
  {
    const post=body[id];
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

  postValues.forEach((post)=> {
    console.log(post.datetime);

    let postHTML = `
       <div ondblclick="openPost('${post.firebaseID}')" class="card">
        <div class="d-flex">
          <img src="${post.avatar}" width="32em"
            height="32em" class="rounded-pill ms-3 mt-3 gap-3" alt="posts_avatar">
          <div class="d-flex flex-column mt-3 ms-1"><span>${post.nameP}</span>
            <small>${post.day}/${post.month}/${post.year}</small>
          </div>
        </div>
        <div class="card-body">
          <h4 class="card-title">${post.title}</h4>`
    if (post.tags)
      post.tags.forEach((tag) => {
        postHTML += `${tag}    `
      })

    if (post.contentText)
      postHTML += `<p class="card-text">${post.contentText.substring(0,50)}...</p>`
    postHTML += `<div class="d-flex justify-content-between">
            <div><span><i class="bi bi-suit-heart"></i> ${post.counterReactions} <span class="bignav">Reactios</span></span>
              <span><i class="bi bi-chat-right"></i> ${post.counterComents} <span class="bignav">Comments</span></span>
            </div>
            <div>
              <a onclick="editPost('${post.firebaseID}')" class="btn btn-secondary btn-sm">Update</a>
              <a onclick="deletePost('${post.firebaseID}')" class="btn btn-secondary btn-sm">Delete</a>
            </div>
          </div>
        </div>
      </div>`

    containerPosts.insertAdjacentHTML('beforeend', postHTML);
  });  
}

document.editPost = (firebaseID) => 
{
  window.location.assign(`./editPost.html?id=${firebaseID}`);
}

document.openPost = (firebaseID) => 
{
  window.location.assign(`./bigpost.html?id=${firebaseID}`);
}

const deletePost = (fireBaseID) => {

  const del = confirm("Lo quieres eliminar ?")
  if (del) {
    document.getElementById("posts").innerHTML = "";
    
    const url = `${urlDB}/posts/${fireBaseID}.json`;
    fetch(url, {
      method: 'DELETE'
    })
      .then(respuesta => respuesta.json())
      .then((body) => {
        getPosts2();
      })
      .catch((error) => console.log(error));
  }
}

getPosts2();