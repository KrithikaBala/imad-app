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