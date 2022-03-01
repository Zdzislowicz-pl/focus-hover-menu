function zMenuClear(ul, li) {
    let elList = document.querySelectorAll(ul);
    elList.forEach(function(el) {
        el.classList.remove('showsub');
    });

    elList = document.querySelectorAll(li);
    elList.forEach(function(el) {
        el.classList.remove('active');
    });     
}

function zMenuLoop(el) {
    while(el.tagName == "UL")
    {
        if(el.parentNode.tagName == "LI") {
            el.classList.add("showsub");
            el.parentNode.classList.add('active');
        }
        el = el.parentNode.parentNode;
    }
}

function zMenu(navbar) {
    var buttonList = document.querySelectorAll(navbar + ' button');
    buttonList.forEach(function(item) {
        item.addEventListener('click', function(e) {
            ul = this.nextElementSibling;
            li = this.parentNode;
            if(ul.className == "showsub")
            {
                ul.classList.remove('showsub');
                li.classList.remove('active');
            }
            else
            {
                zMenuClear(navbar + ' ul.showsub', navbar + ' li.active');
                ul.classList.add('showsub');
                li.classList.add('active'); 
                
                parent = li.parentNode;
                zMenuLoop(parent);
            }
        });
    });

    var aItem = document.querySelectorAll(navbar + ' a, ' + navbar + ' button');
    aItem.forEach(function(item) {
        item.onblur = blurElem;
        function blurElem(e) {
            zMenuClear(navbar + ' ul.showsub', navbar + ' li.active');
            if(e.relatedTarget !== undefined && e.relatedTarget !== null)
            {
                parent = e.relatedTarget.parentNode.parentNode;
                zMenuLoop(parent);        
            }
            e.stopPropagation();
        }
    });


    var aList = document.querySelectorAll(navbar + ' li a');
    aList.forEach(function(item) {
        item.onfocus = showElem;
        function showElem(e) {
            if(item.parentNode.parentNode.tagName == "UL")
                item.parentNode.parentNode.classList.add("showsub");
            e.stopPropagation();
        }
    });

    var liList = document.querySelectorAll(navbar + ' li');
    liList.forEach(function(item) {
        item.onmouseover = showElem;
        item.onmouseout = hideElem;
        function showElem(e) {
            zMenuClear(navbar + ' ul.showsub', navbar + ' li.active');       

            item.classList.add("active");
                        
            parent = this.parentNode;            
            if(item.querySelector('ul') !== undefined && item.querySelector('ul') !== null)
                item.querySelector('ul').classList.add('showsub');

            zMenuLoop(parent);
            e.stopPropagation();
        }
        function hideElem() {
            item.classList.remove('active');
            if(item.querySelector('ul') !== undefined && item.querySelector('ul') !== null) {
                item.querySelector('ul').classList.remove('showsub');
            }
        }
    });
}

var startMenu = document.querySelectorAll('.zMenu');
startMenu.forEach(function(el) {
    el.classList.remove("zMenu");
    el.className;
    var navbar = el.className;
    zMenu('.' + navbar);
});