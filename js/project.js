document.addEventListener('DOMContentLoaded', function(){
    
    var slider = document.querySelector('#heroslider');
    if (slider != null){
        console.log(slider)
        var slides = slider.querySelectorAll('li');
    
        var sliderDots = document.querySelector('#sliderdots');
        var slideDirection = document.querySelector("#slidedirection");
        var slideSpeed = 3000;
        var slideIndex =0;
    
        slides.forEach((ignore, index) =>{
            let element = '<input type="radio" name="changedots" value="' + index + '">';
            sliderDots.insertAdjacentHTML('beforeend', element);
            
        });
    
        //we can also do it with forloop, just an example
        /*for(var i = 0; i < slides.length; i++){
            let element = 'input type="radio" name="changedots" value="' + i +'">';
            sliderDots.insertAdjacentHTML('beforeend', element);
        }
    
        function showSlide(n){
            slides.forEach(slide => {
                slide.style.display = "none";
            });
            slides[n].style.display = "block";
            sliderDots.querySelectorAll('input')[n].checked = true;
        }*/
    
        function showSlide(n){
            slides.forEach(slide => {
                slide.style.opacity = 0;
                slide.pointerEvents = "none";
            });
            slides[n].style.opacity = 1;
            slides[n].style.pointerEvents = "auto";
            sliderDots.querySelectorAll('input')[n].checked = true;
        }
    
    
        function changeByDots(event){
            if(event.target !== event.currentTarget){
                slideIndex = parseInt(event.target.getAttribute('value'));
                event.target.blur();
                showSlide(slideIndex);
            }
            event.stopPropagation();
        }
    
        function sliderChanger(direction = "next"){
            if(direction === "prev" && slideIndex === 0){
                slideIndex = slides.length - 1;
            }else if(direction === "prev"){
                slideIndex -= 1;
            }else if(direction === "next" && slideIndex === slides.length - 1){
                     slideIndex = 0;
            }else{
                slideIndex += 1;
            }
            showSlide(slideIndex);
        }
    
    
    
        function changeByArrow(event){
            if(event.target !== event.currentTarget){
                var direction = event.target.getAttribute('data-direction');
                sliderChanger(direction);
            }
            event.stopPropagation();
        }
    
    
        function changeByKey(event){
            if(event.keyCode === 39){
                sliderChanger('next');
            }else if(event.keyCode === 37){
                sliderChanger('prev');
            }
        }
         var slideInterval = setInterval(sliderChanger, slideSpeed);
        function pauseSlideshow(){
            clearInterval(slideInterval);
        }
        function resumeSlideshow(){
             slideInterval = setInterval(sliderChanger, slideSpeed);
        }
        showSlide(slideIndex);
        sliderDots.addEventListener("click", changeByDots);
        slideDirection.addEventListener("click", changeByArrow);
        document.addEventListener('keyup', changeByKey);
        slider.addEventListener('mouseover', pauseSlideshow);
        slider.addEventListener('mouseout', resumeSlideshow);
    
    
    
    
    
    }
    
    document.querySelector('#btn1').addEventListener('click', getCatagoryData);
     
    //we will create a function to getusers
    function getCatagoryData(){
        fetch('amplifier.json').then((res) => res.json()).then((data)=>{
            let output = '';
            data.forEach(function(amplifier) {
        output +=  `
         <ul id="card1">
         <li><img class="image_1" src="${amplifier.url}"></li>
         <li> ${amplifier.name}</li>
         <li>${amplifier.price}</li>
         
         <button><a href="showoneproduct.html?productID=${amplifier.id}">add to cart</a></button>
         </ul>
        `;
                
            });
            document.getElementById('output').innerHTML = output;
        })
    }



    

    

});


window.onload = function(){
    console.log('dom has loaded');
    var router = function(name, routes){
        return{
            name:name,
            routes: routes
        }
    };
    
    var myFirstRouter = new router('myFirstRouter'[
       {
           path: '/mainpage.html',
           name: 'home'
       },
       {
        path: '/about us',
        name: 'about us'
    }, 
    {
        path: '/brands',
        name: 'brands'
    }, 
    {
        path: '/blog',
        name: 'blog'
    }, 
    {
        path: '/events',
        name: 'events'
    }, 
    {
        path: '/shop',
        name: 'shop'
    },
    {
        path: '/contact',
        name: 'contact'
    }  
    ]);
    var currentPath = window.location.pathname;
    console.log(currentPath)
    if(currentPath == '/'){
        
    }else{
        var route = myFirstRouter.routes.filter(function(r){
            return r.path === currentPath
        })[0];
    }
}
