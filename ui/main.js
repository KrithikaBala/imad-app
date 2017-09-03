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