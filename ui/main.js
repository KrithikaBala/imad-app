console.log('Loaded!');
var element = document.getElementById("contentChange");
element.innerHTML = "I have changed to new value"

var image = document.getElementById("Image");
var marginLeft = 0;
function moveRight(){
    marginLeft = marginLeft + 1;
    image.style.marginLeft = marginLeft + "px";
}
image.onclick = function(){
    var interval = setInterval(moveRight, 50);
}

var button = document.getElementById("counter");
button.onclick = function(){
    //create the request
    var request = new XMLHttpRequest();
    
    //capture the response and store it in a variable
    request.onreadystatechange = function(){
        if(request.readyState == XMLHttpRequest.DONE){
            //take some action
            if(request.status == 200){
                var counter = request.responseText;
                var span = document.getElementById("count");
                span.innerHTML = counter.toString();
            }
        }
    };
   
   //make the request
   request.open('GET', 'http://abikirthi.imad.hasura-app.io/counter', true);
   request.send(null)
    
};

var submit_btn = document.getElementById("submit");
submit_btn.onclick = function(){
      //create the request
    var request = new XMLHttpRequest();
    
    //capture the response and store it in a variable
    request.onreadystatechange = function(){
        if(request.readyState == XMLHttpRequest.DONE){
            //take some action
            if(request.status == 200){
                var names = request.responseText;
                names = JSON.parse(names);
                var list = '';
                for(var i=0;i<names.length;i++){
                    list += '<li>' + names[i] + '</li>';
                }
                
                namesList = document.getElementById("namelist");
                namesList.innerHTML = list;
            }
        }
    };
   
   //make the request
   var name = document.getElementById("name").value;
   request.open('GET', 'http://abikirthi.imad.hasura-app.io/submit-name?name=' +name, true);
   request.send(null)  
};

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
   alert(commentsText);
   request1.open('GET', 'http://abikirthi.imad.hasura-app.io/article/submit-comments?name=' +commentsText, true);
   request1.send(null)  
};