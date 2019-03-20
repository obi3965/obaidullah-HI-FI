
    
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
    
    document.querySelector("#locality-dropdown").addEventListener('change', function(){
    
        console.log(this.value); 
         getCatagoryData(this.value)
     })
     document.querySelector('#btn1').addEventListener('click', ()=>{
         getCatagoryData("amplifiers")
     })
     
     document.querySelector('#btn2').addEventListener('click', ()=>{
         getCatagoryData("speakers")
     });

     document.querySelector('#btn3').addEventListener('click', ()=>{
        getCatagoryData("turntables")
    });
     //const urlParams = new URLSearchParams(window.location.search);
     //const amplifierID = urlParams.get('id');
     //we will create a function to getusers
     
         function getCatagoryData(catagory){
            fetch(catagory+'.json').then((res) => res.json()).then((data)=>{
                let output = '';
                data.forEach(function(cat) {
            output +=  `
             <ul id="card1">
             <li><img class="image_1" src="${cat.image}"></li>
             <li class="navn"> ${cat.navn}</li>
             <li>${cat.pris}</li>
             
             <button><a href="showoneproduct.html?productID=${cat.id}">add to cart</a></button>
             </ul>
            `;
                    
                });
                document.getElementById('output').innerHTML = output;
            })
         }
     
     /*
     function getMovieTitle(data1){
         var xmlhttp;
         if(window.XMLHttpRequest){
             xmlhttp = new XMLHttpRequest();
         }else{
             xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
         }
         xmlhttp.onreadystatechange = function(){
             if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                 jsondata = JSON.parse(xmlhttp.responseText);
                 var catagories = jsondata.catagory;
                 var output = '<form>';
                   output+='<select id="movie_select" onchange="movieSelect"';
                 ;
     
                 data1.forEach(function(catagory){
                     output+=  '<option value="+i+">'+catagory[i].price+'</option>';
                 })
                 output+='</select';
                 output+='</form>';
                 document.getElementById("movie_title").innerHTML = output;
             }
             
         }
         xmlhttp.open("GET","catagory.json", true);
         xmlhttp.send();
     }*/
     
     
     let dropdown = document.getElementById('locality-dropdown');
     dropdown.length = 0;
     
     fetch("catagories.json")  
       .then(  
         function(response) {  
           if (response.status !== 200) {  
             console.warn('Looks like there was a problem. Status Code: ' + 
               response.status);  
             return;  
           }
     
           // Examine the text in the response  
           response.json().then(function(CatagorydropDownData) {  
             let option;
         
             for (let i = 0; i < CatagorydropDownData.length; i++) {
               option = document.createElement('option');
                 option.text = CatagorydropDownData[i].navn;
                 option.value = CatagorydropDownData[i].navn;
                 dropdown.add(option);
             }    
           });  
         }  
       )  
       .catch(function(err) {  
         console.error('Fetch Error -', err);  
       });
     
     
     
       




