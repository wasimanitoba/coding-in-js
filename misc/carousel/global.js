var mlpwpjs = {
    expandPanel : function(id) {
      var x = document.querySelectorAll(id)[0];
      if (x.className.indexOf("w3-show") == -1) {
          x.className += " w3-show";
      } else { 
          x.className = x.className.replace(" w3-show", "");
      }
  }, 
      offSet : 0 ,
    links : [],
    submenu_links: [],
    link_text : [],
    submenu_text : [],
    submenu_qty : 0,
    submenu_positions : [], //which array elements of li[i] have submenus
    buttons : [], //nodelist of buttons to be inserted to DOM
  
  
     get_links : function(){
       var li = document.querySelectorAll('.nav-menu > li > a');
      var ul = document.querySelectorAll('.nav-menu ul.sub-menu li > a');
    var i = 0;
    li.forEach(function(element){
     
        [].push.call(mlpwpjs.links, element.href);
        [].push.call(mlpwpjs.link_text, element.innerHTML);
        if(element.parentElement.classList.contains("menu-item-has-children")){mlpwpjs.submenu_positions.push(i);}
       i++;
  });
  
  
    ul.forEach(function(element){
        [].push.call(mlpwpjs.submenu_links, element.href);
  
        [].push.call(mlpwpjs.submenu_text, element.innerHTML);
    });
  
  
  
  },
  append_buttons : function(){
  
  
    this.buttons.forEach(function(element){document.querySelectorAll('.buttonBar > div')[0].appendChild(element)});
  
  
  
  },
      display : function(event){
           document.querySelectorAll('.buttonBar  .dropdown button').forEach(
               function(element){ 
                   if(event.target===element){
                       
                       element.parentElement.querySelectorAll('.dropdown-content')[0].className = "dropdown-content w3-show";
                          
                                                                                                           }
                                                
                               });
              
                              },
      
      hide : function(event){
          if(!event.target.matches('.dropdown-content')&&!event.target.matches('.dropdown button')){
              document.querySelectorAll('.dropdown-content').forEach(function(element){
                  element.className = "dropdown-content w3-hide";
              });
          }
      },
    create_buttons : function(){
      var tmpNode;
      var j = 0;
        
      for (var i = 0; i < this.links.length; i++){
        if(this.submenu_positions[j]===i){
            
         
          tmpNode = document.createElement('div');
          tmpNode.className = "dropdown";
          tmpNode2 = document.createElement('button');
          tmpNode2.className = "btn btn-danger";
          tmpNode2.innerText = this.link_text[i];    
          tmpNode2.addEventListener('click', this.display);
          
             tmpNode.appendChild(tmpNode2);
          this.buttons.push(tmpNode);
          this.create_submenu_buttons(i); 
          j++;
        }
        else{
          tmpNode = document.createElement('a');
          tmpNode.innerText = this.link_text[i];
            if(this.link_text[i]==="Donate"){tmpNode.className="donate";}
          tmpNode.href = this.links[i];
          this.buttons.push(tmpNode);
        }
      }
  
    },
    create_submenu_buttons : function(position){
      
      var tmpNode = document.createElement('div');
      tmpNode.className = "dropdown-content w3-hide";
      
      var tmp = 0;
      var ul = document.querySelectorAll('.nav-menu > li'); 
      var subqty = ul[position].querySelectorAll('.sub-menu > li > a').length; //number of links for this particular sub-menu
        
      for (var i = this.offSet; i < (this.offSet + subqty); i++){
          
          
          var tmpNode2 = document.createElement('a');
          tmp++;
          tmpNode2.href = this.submenu_links[i];
          tmpNode2.innerHTML = this.submenu_text[i];
          
          tmpNode.appendChild(tmpNode2);
          
      }	
      this.buttons[position].appendChild(tmpNode);
      this.offSet += tmp;
    }
  
  
  
  }
  
  mlpwpjs.get_links();
  mlpwpjs.create_buttons();
  mlpwpjs.append_buttons();
  window.addEventListener('click', mlpwpjs.hide);
  document.querySelectorAll('.donate')[0].previousElementSibling.style = "flex:7";
  
  
  
  var image_correcting_func = function(){
  var x = document.querySelectorAll('.wp-post-image', 'figure img');
    for( var i =0; i <x.length ;i++){           
                 //x[i].style.cssText = "height=20em, width=12.36em"
            
             var str1 = x[i].src;
             var str2 = str1.split("?", 1).join("");
             var parent1 = x[i].parentElement;
             parent1.removeChild(parent1.childNodes[0]);
             parent1.innerHTML = "<img src=\"" + str2 + "\">";
    }
  };
  
  image_correcting_func();
       /** expanding menu bar control **/
   //ByClassName('menu-item-.....)
  
  //console.log("top edge is " + expandable_menu_custom_nav_bar.style.top);
      //console.log("left edge is " + expandable_menu_custom_nav_bar.style.left);
  
  var expand_menu_w = function(){
  var submenu_temp = document.getElementsByClassName('sub-menu');
  var list_elements_temp = document.getElementById('menu-item-242');		
  var logo = document.querySelectorAll('.logo-image');
  var expandable_menu_custom_nav_bar= list_elements_temp;  //[list_elements_temp.length-1];
          submenu_temp[0].className="sub-menu";
          submenu_temp[0].style = "visibility:hidden; display:none";
          
  
  
      
      var medium_screenmatch = window.matchMedia("(max-width: 1300px)");
      //function logoPositioning(screenmatch){
      //	if(screenmatch.matches){logo[0].style ="margin-right:100%";}
      //	else{logo[0].style = "margin-right:65%";}
          //	console.log(logo[0].cssText);
  
      //}
      //medium_screenmatch.addListener(logoPositioning);
      //logoPositioning(medium_screenmatch);
      
      /*start here*/
      var expand_menu = function(){
          expandable_menu_custom_nav_bar.addEventListener('click', shrink_menu);
      //	if(!medium_screenmatch.matches){logo[0].style = "margin-right:35%";}
          
           submenu_temp[0].className = "toggled-on " + submenu_temp[0].className;
          submenu_temp[0].style = "visibility:visible; display:block"; // + submenu_temp[0].style;
       //	expandable_menu_custom_nav_bar.style = "position:relative; background:url(/wp/wp-content/uploads/2018/07/x.png) 40px 15px / 8% 36% no-repeat";
          expandable_menu_custom_nav_bar.removeEventListener('click', expand_menu);
           
          
  }  
      expandable_menu_custom_nav_bar.addEventListener('click', expand_menu);
      
      var shrink_menu = function(evt){
          //if(medium_screenmatch.matches){logo[0].style = "margin-right:100%";}
          //else{logo[0].style = "margin-right:50%";}
      //	expandable_menu_custom_nav_bar.style = "position: absolute; background:url(/wp/wp-content/themes/Narrow/img/menu.png) -27px -6px / 100% 120% repeat-y";
          submenu_temp[0].className="sub-menu";
          submenu_temp[0].style = "visibility:hidden; display:none";
          expandable_menu_custom_nav_bar.removeEventListener('click', shrink_menu);
          expandable_menu_custom_nav_bar.addEventListener('click', expand_menu);
           
      
      
              
  }
      var dont_shrink = function(evt){
      
      evt.stopPropagation();
      
  }
      
      var submenu_items = submenu_temp[0].childNodes;
      for (var i = 0; i < submenu_items.length; i++){
          
          submenu_items[i].addEventListener('click', dont_shrink);
          
          
      }
      
      
      
      
  
      
  
      //document.getElementsByClassName('sub-menu')[0].className="sub-menu"; //reset to default until eventListener invoked
   //expandable_menu_custom_nav_bar.style = "background:url(/wp/wp-content/themes/Narrow/img/menu.png) -27px -6px / 100% 120% repeat-y";    //reset to closed icon
      //add to css of ul when it is of sub-menu class ul.sub-menu:after{}
      
      
      
      
  
  
  }
  expand_menu_w();
  
  
  /** carousel/slideshow code **/
  var carousel_package_w = {
  
      myIndex: 0,
      token: "",
  
      carousel: function() {
          var i;
          var x = document.getElementsByClassName("mySlides");
          // Automatic Slideshow - change image every 4 seconds
         
          for (i = 0; x.length > i; i++) {
              if(x[i]===undefined||x[i]===null){return null;}
              x[i].style.display = "none";
          }
  
          if (carousel_package_w.myIndex >= x.length) {
              carousel_package_w.myIndex = 0; //reset to 1
          }
          if(x[carousel_package_w.myIndex]===undefined||x[carousel_package_w.myIndex]===null){return null;}
          x[carousel_package_w.myIndex].style.display = "block";
  
          clearInterval(carousel_package_w.token);
  
          carousel_package_w.token = setInterval(carousel_package_w.carousel, 4000);
          
          carousel_package_w.myIndex = carousel_package_w.myIndex + 1;
          
  
  
  
  
      }
  };
  
  carousel_package_w.carousel();
  
  
  
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
  
  //wp_img_correcting_functions.resizer(wp_img_correcting_functions.parser(wp_img_correcting_functions.remover('body.page-template-page-platform figure > img'))); 
