

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
      containerPosts.insertAdjacentHTML('afterbegin', constructPOST(post));
    })
}

