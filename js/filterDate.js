const filterPosts=async(dateFilter)=>
{
    let url=`http://localhost:8080/api/v1/posts`;
    const respuesta = await fetch(url);
    const body = await respuesta.json();
  
  
   
    let postValues = Object.values(body)[1];
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
        nameP:post.user.firstname,
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
        containerPosts.insertAdjacentHTML('afterbegin', constructPOST(post));
    });  
}