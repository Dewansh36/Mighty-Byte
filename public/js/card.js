const getLike = document.querySelector('.button-dec');
const getLikeNum = document.querySelector('.like');
var pre = parseInt(document.getElementById("like").textContent);
console.log(pre);
var like=true;


increaseLike= () =>{
    
    if(like){
     pre++;
     like=!like;
    }
    else{
        pre--;
        like=!like;
    }
     
     console.log(pre,like);
     getLikeNum.innerHTML = `${pre}`;
}

likeclick = () =>{
    increaseLike();
}

getLike.addEventListener(('click'), likeclick);