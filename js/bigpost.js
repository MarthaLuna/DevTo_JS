window.queryParams=new URLSearchParams(window.location.search);
const id = queryParams.get('id');
const avatar = document.querySelector('.avatar')
const heroImg = document.querySelector('.hero-img')
const userName = document.querySelector('.userName')
const date = document.querySelector('.date')
const title = document.querySelector('.title')
const postContent = document.querySelector('.postContent')
const tag = document.querySelector('.tag')

const urlDB2 = "https://devto-3e84b-default-rtdb.firebaseio.com/"

const callPost = async()=>
{
    try 
    {
        let url=`http://localhost:8080/api/v1/posts/${id}`;
        const respuesta = await fetch(url);
        const body = await respuesta.json();
      
      
       
        const post = Object.values(body)[1];
        //console.log(post);
        heroImg.src = post.image
        avatar.src = post.user.image;
        userName.textContent = post.user.firstname
        date.textContent = `${post.day}/${post.month}/${post.year}`
        title.textContent = post.title
        postContent.textContent = post.contentText

        post.tags.forEach((x) => {
            console.log(x)
            tag.insertAdjacentHTML('beforeend',x + '&nbsp&nbsp' );

        })

    } catch (error)
    {
            console.log(error);
    }
}

callPost()