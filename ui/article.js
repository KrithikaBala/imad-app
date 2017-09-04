console.log('Article JS loaded!');
var comments_btn = document.getElementById("comments_btn");
comments_btn.onclick = function(){
      //create the request
    var request1 = new XMLHttpRequest();
    
    //capture the response and store it in a variable
    request1.onreadystatechange = function(){
        if(request1.readyState == XMLHttpRequest.DONE){
            //take some action
            if(request1.status == 200){
                var comments = request1.responseText;
                comments = JSON.parse(comments);
                var comlist = '';
                for(var i=0;i<comments.length;i++){
                    comlist += '<li>' + comments[i] + '</li>';
                }
                
                var commentsList = document.getElementById("commentslist");
                commentsList.innerHTML = comlist;
            }
        }
    };
   
   //make the request
   var commentsText = document.getElementById("comments").value;
   request1.open('GET', 'http://abikirthi.imad.hasura-app.io/article/submit-comments?name=' +commentsText, true);
   request1.send(null)
   document.getElementById("comments").value = '';
};
