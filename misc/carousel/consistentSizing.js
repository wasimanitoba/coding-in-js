var wp_img_correcting_functions = {
    token : "",
    remover : function(token){   //token is the class, element or id to be passed to querySelectorAll
this.token = token;
var q = document.querySelectorAll(token);    //'q' for query
var addresses = [];
for (var i = 0; i < q.length; i++){

  
var address = q[i].firstElementChild.src;
 

// console.log(q[i].firstElementChild);

addresses.push(address);
q[i].removeChild(q[i].firstElementChild);
}

return addresses;       //usage: call var address = wp-img-correcting-functions.remover('.post-thumbnail'); to return an array of images to resize
},

parser : function(arr) {  //arr is an array of strings with URLs to be parsed 
var parsedArr = [];
for (var i = 0; i < arr.length; i++){
//console.log(arr[i]);
var unparsedURL = arr[i].split("?",2);
//console.log("the string inside of arr[i] is " + arr[i]);
var parsedURL = unparsedURL[0];
// console.log("the parsed url is " + parsedURL);
parsedArr.push(parsedURL);
}

//console.log(parsedArr);
return parsedArr;


}, 


resizer : function(arr, token ){
  var q = document.querySelectorAll(this.token);
var imgElement;
for (var i = 0; i < q.length; i++){
 // console.log("current <a> tag is " + q[i]);
  
     q[i].innerHTML = "<img src=\""+  arr[i] +"\" class=\"thumbnail-wp-mlp\">";

 }



}


}

wp_img_correcting_functions.resizer(wp_img_correcting_functions.parser(wp_img_correcting_functions.remover('.post-thumbnail'))); 
