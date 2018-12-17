var down = 0;
var up = 0;
var lastdown;
var lastup;
var first = 1;

(function(){
    // consider using a debounce utility if you get too many consecutive events
    $(window).on('motion', function(ev, data){
        //console.log('detected motion at', new Date(), 'with data:', data);
        var spot = $(data.spot.el);
        spot.addClass('active');
        setTimeout(function(){
            spot.removeClass('active');
        }, 230);
        
        var name = ev.target.className;
        var num = name.substr(11, 1);
        num = parseInt(num);
        if(num == 0 && down == 0)
        {
            console.log('down det');
            down = 1;
            lastdown = num;
            setTimeout(function(){
                down = 0;
            }, 1500);
        }
        else if(num == 9 && up == 0)
        {
            console.log('up det');
            up = 1;
            lastup = num;
            setTimeout(function(){
                up = 0;
            }, 1500);
        } 
        else if (down == 1 && (num == (lastdown + 1) || num == (lastdown + 2)))
        {
            lastdown = num;
            if(num==9)
            {
                if(first == 1)
                {
                    first = 0;
                }
                else
                {
                    console.log('Scroll down');
                } 
                down = 0;
            }
        }
        else if (up == 1 && (num == (lastup - 1) || num == (lastup - 2)))
        {
            lastup = num;
            if(num==0)
            {
                console.log('Scroll up');
                up = 0;
            }
        }
    });

    // example using a class
    $('.element').on('motion', function(ev, data){
        console.log('motion detected on a link to', data.spot.el.href);
    });
        
    for (var i = 0; i<10; i++)
    {
        $("#hotSpots").append('<div class="element num'+i+'" style="top: '+i*10+'%" ></div>"');
    }

})();