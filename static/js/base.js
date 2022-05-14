$(document).ready(function(){
    updateNavBar();
});

function updateNavBar() {
    var currentHref = window.location.href;    
    $("#base-topnav a").each(function (index,el) {
        if(el.href === currentHref)
        {
            $(el).attr('class', 'active')
            return;
        }
        $(el).removeAttr('class');
    });
}