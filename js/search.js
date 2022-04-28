

const find=document.querySelector('#search');
const search=async()=>
{
    console.log("entre")
    document.getElementById("posts").innerHTML = "";
 
    const containerPosts=document.querySelector('#posts');
    let url=`http://localhost:8080/api/v1/posts`;
        const respuesta = await fetch(url);
        const body = await respuesta.json();
      
      
       
   let  postValues = Object.values(body)[1];

   postValues.forEach((post)=>
    {
      
      return{
        ID:post._id.toString(),
        postID:post.postID,
        datetime:post.datetime,
        day:post.day,
        month:post.month,
        year:post.year,
        counterReactions:post.counterReactions,
        counterComents:post.counterComents,
        image:post.image,
        title:post.title,
        avatar:post.user.image,
        tags:post.tags,
        contentText:post.contentText,
        nameP:post.user.name,
      }
    });

    const title = find.value.toLowerCase();

    const posts = postValues.filter((post)=>post.title.toLowerCase().includes(title));
    posts.forEach((post)=>{ 
      containerPosts.insertAdjacentHTML('afterbegin', constructPOST(post));
    })
}

