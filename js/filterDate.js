const filterPosts=async(dateFilter)=>
{
    const url = `${urlDB}/posts.json`;
    const respuesta = await fetch(url);
    const body = await respuesta.json();

    let postValues=Object.keys(body).map((id)=>
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
    containerPosts.innerHTML='';

    if(dateFilter!='All')
    {
        const currentMonth=new Date().getMonth()+1;
        const currentYear=new Date().getFullYear();
        let currentDate = new Date();
        let lastWeek=new Date();
        lastWeek.setDate(lastWeek.getDate()-7);
        if(dateFilter==='lastWeek')
        {
            const filteredPosts = postValues.filter((post)=>
            {   
                return Date.parse(post.datetime)>=Date.parse(lastWeek) && Date.parse(post.datetime)<=Date.parse(currentDate);
            });
            postValues=filteredPosts;
        }
        else if(dateFilter==='lastMonth')
        {
            const filteredPosts = postValues.filter((post)=>
                {   
                    return parseInt(post.month)==currentMonth && parseInt(post.year)==currentYear;
                });
                postValues=filteredPosts;
        }
        else if(dateFilter==='lastYear')
        {
            const filteredPosts = postValues.filter((post)=>
                {   
                    return parseInt(post.year)==currentYear;
                });
            //console.log(filteredPosts);
            postValues=filteredPosts;
        }
    }
    //console.log(postValues);
    postValues.forEach((post)=> {

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
        if (post.tags)
        post.tags.forEach((tag) => {
            postHTML += `${tag}    `
        })

        if (post.contentText)
        postHTML += `<p class="card-text">${post.contentText.substring(0,50)}...</p>`
        postHTML += `<div class="d-flex justify-content-between">
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

        containerPosts.insertAdjacentHTML('afterbegin', postHTML);
    });  
}