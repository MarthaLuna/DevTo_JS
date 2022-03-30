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
        let url=`${urlDB2}posts/${id}.json`;
        let respuesta = await fetch(url);
        let post=await respuesta.json();
        //console.log(post);
        heroImg.src = post.image
        avatar.src = post.avatar;
        userName.textContent = post.nameP
        date.textContent = post.dateTime
        title.textContent = post.title
        postContent.textContent = post.contentText

        post.tags.forEach((x) => {
            console.log(x)
            tag.insertAdjacentHTML('beforeend',x + '&nbsp&nbsp' );

        })

    } catch (error)
    {
            
    }
}

callPost()