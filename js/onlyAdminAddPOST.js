const urlDB = "https://devto-3e84b-default-rtdb.firebaseio.com/"

const createPost = (image, title, avatar, tags, contentText, funcion) =>
{
    const url=`${urlDB}/posts.json`;

    let today = new Date();
    let time = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    today = dd + '/' + mm + '/' + yyyy;
    //const tiempoActual = today;
    let datetime = "2020-01-02T00:25:07.870Z"
    const day=02;
    const month=01;
    const year=2021;

    let ID='';
    let postID = `${time.getTime()}${time.getMilliseconds()}`;
    let updated=false;
    let counterReactions = 0;
    let counterComents = 0;
    let nameP = "Ada Lovelace";
    avatar = "https://api.binary-coffee.dev/uploads/Ada_Lovelace_Chalon_portrait_4d642eaf6a.jpeg"
    
    const post = {ID, postID, datetime, day, month, year, counterReactions, counterComents, image, title, avatar, tags, contentText, nameP, updated};

    fetch(url,{
        method:'POST',
        body:JSON.stringify(post),
        headers:
        {
            'Content-Type':'application/json'
        }
    }).then((respuesta)=>respuesta.json())
    .then((body)=>funcion(body))
    .catch((error)=>console.log(error));
}


let content = "The history of science studies the emergence and development of systematic knowledge. Linguistic and historiographic traditions diverge sharply as to what kind of knowledge that is (e.g., the German Wissenschaft versus the Anglophone ‘science’), with significant consequences for the scope and methods of the field. The history of science is an ancient pursuit, but a relatively young discipline. Although major works dedicated to the history of one or another science have been published since the eighteenth century, specialist journals, learned societies, and university positions date mostly from the twentieth century. Since the Enlightenment, the historiography of science has been dominated by narratives of progress and by the central position of the Scientific Revolution. Stimulated largely by the publication of Thomas S. Kuhn's The Structure of Scientific Revolutions (1970), the history of science since about 1970 has broken decisively with this teleological historiography, as well as with a view of scientific knowledge as sharply demarcated from its context. The developments of recent decades have expanded the scope of the history of science both chronologically (ever more studies are devoted to modern and contemporary science) and thematically (embracing the human as well as the natural sciences); shifted the emphasis from scientific theories to scientific practices (especially experiment); directed attention to the material culture of science and the embodiment of scientists; and addressed the history of supposedly transhistorical entities such as experience, truth, and objectivity."
createPost("https://www.industrialempathy.com/img/remote/ZiClJf-640w.avif", "tes1t", "", ["#java","#web","#android","#sun"],content,(body)=>{
    console.log(body);
 });
 createPost("https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg", "test2", "", ["#java","#web","#android","#sun"],content,(body)=>{
    console.log(body);
 });
 createPost("https://static.vecteezy.com/packs/media/components/global/search-explore-nav/img/vectors/term-bg-1-666de2d941529c25aa511dc18d727160.jpg", "test3", "", ["#java","#web","#android","#sun"],content,(body)=>{
    console.log(body);
 });
 createPost("https://www.akamai.com/site/im-demo/perceptual-standard.jpg", "test4", "", ["#java","#web","#android","#sun"],content,(body)=>{
    console.log(body);
 });
