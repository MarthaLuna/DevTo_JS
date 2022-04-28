
const containerPosts = document.querySelector('#posts');

const constructPOST = (post) =>{
console.log("AQUI",post._id)
  let postHTML = `
  <div ondblclick="openPost('${post._id}')" class="card mb-2">
  `
  if(post.image)
 {postHTML += `<img class="card-img-top" src = "${post.image}">`} 
   
 postHTML +=  `<div class="d-flex">
    
      <img src="${post.user.image}" wIDth="32em"
        height="32em" class="rounded-pill ms-3 mt-3 gap-3" alt="posts_avatar">
      <div class="d-flex flex-column mt-3 ms-1"><span>${post.user.firstname}</span>
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
        <a onclick="editPost('${post._id}')"  class="btn btn-secondary btn-sm">Update</a>
        <a onclick="deletePost('${post._id}')" class="btn btn-secondary btn-sm">Delete</a>
        </div>
      </div>
    </div>
  </div>`

  return postHTML;

}

const getPosts2 = async () => {

try{

  const url = `http://localhost:8080/api/v1/posts`;
  const respuesta = await fetch(url);
  const body = await respuesta.json();


 
  const payload = Object.values(body)[1];
  payload.forEach((post)=>
  {
    
    return{
      ID:post._id,
      postID:post.postID,
      datetime:post.datetime,
      day:post.day,
      month:post.month,
      year:post.year,
      counterReactions:post.counterReactions,
      counterComents:post.counterComents,
      image:post.image.toString(),
      title:post.title,
      avatar:post.user.image.toString(),
      tags:post.tags,
      contentText:post.contentText,
      nameP:post.user.firstname.toString(),
      
    }

  })
  
  

  

  payload.forEach((post)=> {

    containerPosts.insertAdjacentHTML('afterbegin', constructPOST(post));
  });  

}catch(error){
 console.log(error);
}
}



document.editPost = (ID) => 
{
  window.location.assign(`./editPost.html?ID=${ID}`);
}

document.openPost = (ID) => 
{
  window.location.assign(`./bigpost.html?ID=${ID}`);
}

const deletePost = (ID) => {

  const token = localStorage.getItem("userToken");
  const del = confirm("Lo quieres eliminar ?")
  if (del) {
    document.getElementById("posts").innerHTML = "";
    
    const url = `http://localhost:8080/api/v1/posts/${ID}`;
    fetch(url, {
      method: 'DELETE',
      headers:
      {
          'Content-Type':'application/json',
          'token':`${token}`
      }
    })
      .then(respuesta => respuesta.json())
      .then((body) => {
        getPosts2();
      })
      .catch((error) => console.log(error));
  }
}

getPosts2();