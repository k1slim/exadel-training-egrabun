(function(win){
    var util={};

    util.toggle=function(id,spec){
        var elem=document.getElementById(id);

        if(!elem.classList.contains(spec)){
            if(spec=='open'){
                elem.classList.add('open');
                elem.classList.remove('close');
            }
            else{
                elem.classList.add('close');
                elem.classList.remove('open');
            }
        }
    };

    util.placeData=function(plhold,data){
        var place=document.getElementById(plhold);
        place.innerHTML=data;
    };

    util.placeInToContainer=function(place,lenght,clName,id,n){
        var container=document.createElement('ul');
        place.insertBefore(container, place.children[n]);

        for(var i=0;i<lenght;i++){
            var elem=document.createElement('li');
            elem.className=clName;
            elem.setAttribute('id',i+id);
            container.appendChild(elem);
        }
    };

    win.util = util;

}(window));