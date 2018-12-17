
// consider using a debounce utility if you get too many consecutive events
$(window).on('motion', function(ev, data){
    //console.log('detected motion at', new Date(), 'with data:', data);
    var spot = $(data.spot.el);
    if(spot.hasClass('standardArea'))
    {
        spot.addClass('active');
        setTimeout(function(){
            spot.removeClass('active');
        }, 230);
    }
});


//Language
var lang = (navigator.language) ? navigator.language : navigator.userLanguage;
lang = lang.substr(0,2);

var redText;
var greenText;
var orangeText;
var blueText;
var timeText;
var loseText;
var restartText;
var rightText;
var startingText;

if (lang == "de") {
    redText = 'Rot';
    greenText = 'Grün';
    orangeText = 'Orange';
    blueText = 'Blau';
    timeText = 'Zeit';
    loseText = 'Verloren';
    restartText = 'Neustart';
    rightText = 'Richtig';
    startingText = 'Spiel wird gestartet!';
} else {
    redText = 'Red';
    greenText = 'Green';
    orangeText = 'Orange';
    blueText = 'Blue';
    timeText = 'Time';
    loseText = 'Lose';
    restartText = 'Restart';
    rightText = 'Right';
    startingText = 'Game starts!';
}

var startTime = 10000;
var addTime = 1700;
 
var text = $('#textArea');
var scorearea = $('#scoreArea');
var colorSearch;
var time = startTime;
var score = 0;
var bestscore = 0;
var inplay = 0;
var insearch = 0;
var interval;

var errorBlue;
var errorGreen;
var errorRed;
var errorOrange;

writeScore();
deleteErrors();

var ts = parseInt(get_cookie('best'));
if(isNaN(ts))
{
    ts = 0;
}
bestscore = ts;


$(window).on('start', function(ev){
    $('#scoreArea').fadeIn();
    $('#textArea').fadeIn();
    start();
});
    

// example using a class
$('#greenArea').on('motion', function(ev, data){
    haveDetected('green');
});
        
$('#redArea').on('motion', function(ev, data){
    haveDetected('red');
});
        
$('#blueArea').on('motion', function(ev, data){
    haveDetected('blue');
});
        
$('#orangeArea').on('motion', function(ev, data){
    haveDetected('orange');
});
    
function newColor()
{
    var num = Math.floor(Math.random()*4)
    if(num == 0)
    {
        colorSearch = 'blue';
        text.html('<span class="blue">'+blueText+'</span>');
    } else if (num == 1)
{
        colorSearch = 'red';
        text.html('<span class="red">'+redText+'</span>');
    } else if (num == 2)
{
        colorSearch = 'green';
        text.html('<span class="green">'+greenText+'</span>');
    } else if (num == 3)
{
        colorSearch = 'orange';
        text.html('<span class="orange">'+orangeText+'</span>');
    }
    insearch = 1;
    deleteErrors();
}

function haveDetected(color)
{
    if(inplay == 1 && insearch == 1)
    {
        if(color == colorSearch)
        {
            colorSearch = '';
            insearch = 0;
            text.html(rightText+'!');
            changeScore(1);
            changeTime(addTime);
            setTimeout(function(){
                newColor();
            }, 800);
        }
        else
        {
            if (color == 'blue' && colorSearch == 'green')
            {
                    
            }
            else if (color == 'orange' && colorSearch == 'red')
            {
                    
            }
            else
            {
                addErrors(color);
            }
        }
    }
}

function changeScore(add)
{
    score = score + add;
    if(score > bestscore)
    {
        bestscore = score;
        set_cookie('best',score);
    }
}

function changeTime(add)
{
    time = time + add;
    if (time < 1000)
    {
        time = 1000;
    }
}

function writeScore()
{
    var viewtime = Math.round(time/1000);
    if(viewtime < 0)
    {
        viewtime = 0;
    }
    scorearea.html(timeText+": "+viewtime+" | Score: "+score+" | Best: "+bestscore);
}

function newTime()
{
    if(inplay == 1)
    {
        time = time - 1000;
        writeScore();
        if(time < 500)
        {
            clearInterval(interval);
            text.html(loseText+' | <a class="restart" onclick="start()">'+restartText+'</a>');
            inplay = 0;
        }
    }
}

function start()
{
    time = startTime;
    score = 0;
    writeScore();
    text.html(startingText);
    setTimeout(function(){
        newColor();
        inplay = 1;
        interval = window.setInterval(function(){
            newTime()
        },1000);
    }, 3000);
}

function addErrors(color)
{
    if(color == 'blue' && errorBlue == 0)
    {
        errorBlue = 1;
        changeTime(-1000);
    }
    else if(color == 'green' && errorGreen == 0)
    {
        errorGreen = 1;
        changeTime(-1000);
    }
    else if(color == 'red' && errorRed == 0)
    {
        errorRed = 1;
        changeTime(-1000);
    }
    else if(color == 'orange' && errorOrange == 0)
    {
        errorOrange = 1;
        changeTime(-1000);
    }

}

function deleteErrors()
{
    errorBlue = 0;
    errorGreen = 0;
    errorRed = 0;
    errorOrange = 0;
}


function get_cookie( cookieName )
{
    strValue = false;
    
    if( strCookie = document.cookie )
    {
        if( arrCookie = strCookie.match( new RegExp( cookieName + '=([^;]*)', 'g')))
        {
            strValue=RegExp.$1;
        }
    }
    return(strValue);
}
      
function set_cookie(cookieName,cookieValue)
{
    if(!is_cookie_enabled())
    {
        return false;
    }
    document.cookie = cookieName + '=' + 
    cookieValue + ';';
    return true;
}
 
function delete_cookie(cookieName)
{
    if(document.cookie)
    {
        document.cookie = cookieName + '=' +
        get_cookie(cookieName) +
        ';expires=Thu, 01-Jan-1970 00:00:01 GMT;'; 
        return true;
    }
    return false;
}

function is_cookie_enabled()
{
    if(typeof navigator.cookieEnabled!='undefined')
    {
        return navigator.cookieEnabled;
    }
    
    set_cookie('testcookie','testwert',1);
    
    if(!document.cookie)
    {
        return false;
    }
    
    delete_cookie('testcookie');
    return true;        
}