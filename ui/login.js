var login_btn = document.getElementById("login_btn");
login_btn.onclick = function(){
      //create the request
    var request = new XMLHttpRequest();
    
    //capture the response and store it in a variable
    request.onreadystatechange = function(){
        if(request.readyState == XMLHttpRequest.DONE){
            //take some action
            if(request.status == 200){
                console.log("User logged in successfully!!!");
                alert("User logged in successfully!!!");
            }else if(request.status == 403){
                alert("username/password is invalid");
            }else if(request.status == 500){
                alert("something went wrong in the server");
            }
        }
    };
   
   //make the request
   var username = document.getElementById("username").value;
   var password = document.getElementById("password").value;
   request.open('POST', 'http://abikirthi.imad.hasura-app.io/login', true);
   request.setRequestHeader('Content-Type', 'application/json');
   request.send(JSON.stringify({username: username, password: password}));  
};

var register_btn = document.getElementById("register_btn");
register_btn.onclick = function(){
      //create the request
    var request = new XMLHttpRequest();
    
    //capture the response and store it in a variable
    request.onreadystatechange = function(){
        if(request.readyState == XMLHttpRequest.DONE){
            //take some action
            if(request.status == 200){
                console.log("User registered successfully!!!");
                alert("User registered successfully!!!");
            }else if(request.status == 403){
                alert("username/password is invalid");
            }else if(request.status == 500){
                alert("something went wrong in the server");
            }
        }
    };
   
   //make the request
   var username = document.getElementById("username").value;
   var password = document.getElementById("password").value;
   request.open('POST', 'http://abikirthi.imad.hasura-app.io/create-user', true);
   request.setRequestHeader('Content-Type', 'application/json');
   request.send(JSON.stringify({username: username, password: password}));  
};