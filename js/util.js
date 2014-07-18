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

    util.placeInToContainer=function(place,lenght,clName,id,n,flag){
        var container=document.createElement('ul');
        place.insertBefore(container, place.children[n]);

        for(var i=0;i<lenght;i++){
            var elem=document.createElement('li');
            elem.className=clName;
            elem.setAttribute('id',i+id);
            container.appendChild(elem);
        }
    };

    util.showAlertWindow=function(view,data,flag,rightAnsw,yourAnsw){
        util.toggle('alertWindow',view);
        util.toggle('alertWindowBack',view);

        if(flag!=1)
            util.placeData('textPlaceholder',data);
        else
            util.placeData('textPlaceholder',data+'<br /><br />Вы ответили:<br /> '+yourAnsw+'<br /><br />Правильный ответ:<br /> '+rightAnsw);
    };

    util.makeGETRequest=function(url, callback){
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url,false);
        xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        xhr.onreadystatechange = function()
        {
            if(xhr.readyState === 4 && xhr.status === 200)
            {
                var type = xhr.getResponseHeader("Content-Type");
                if(type === "application/json")
                {
                    callback(JSON.parse(xhr.responseText));
                }
            }
        };
        xhr.send();
};


win.util = util;

}(window));