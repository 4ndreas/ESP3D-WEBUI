var maxSliderLength = 900;

// call backs
function onMoveTimeChange() {
    var movetimevalue = clamp(parseInt(id('slidermovementtime').value),0,3600);
    var moveFrom = clamp(parseInt(id('slidermovementfrom').value),0,100);
    var moveto = clamp(parseInt(id('slidermovementto').value),0,100);

    id('slidermovementtime').value = movetimevalue;
    id('slidermovementfrom').value = moveFrom;
    id('slidermovementto').value = moveto;
}

function onExecuteMove(dir){

    var movetimeValue = clamp(parseInt(id('slidermovementtime').value),0,3600) / 60;

    var moveFrom = clamp(parseInt(id('slidermovementfrom').value),0,100) * (maxSliderLength / 100);
    var moveTo = clamp(parseInt(id('slidermovementto').value),0,100) * (maxSliderLength / 100);
    
    var panFrom = id('sliderpanfrom').value;
    var panTo = id('sliderpanto').value;

    var tiltFrom = id('slidertiltfrom').value;
    var tiltTo = id('slidertiltto').value;
    
    if(dir == 'from'){
        moveTo = WPOS[0];
        panTo =  WPOS[1];
        tiltTo =  WPOS[2];
    }
    else if(dir == 'to'){
        moveFrom = WPOS[0];
        panFrom =  WPOS[1];
        tiltFrom =  WPOS[2];
    }

    var deltaMove = Math.abs(moveFrom - moveTo) / movetimeValue;
    var deltaPan = Math.abs(panFrom - panTo) / movetimeValue;
    var deltaTilt = Math.abs(tiltFrom - tiltTo) / movetimeValue;

    if(dir == 'move'){
        sliderMove(moveFrom,moveTo,panFrom,panTo, tiltFrom,tiltTo, Math.max(deltaMove,deltaPan,deltaTilt));
    }
    else if (dir == 'reverse'){
        sliderMove(moveTo,moveFrom,panTo,panFrom, tiltTo,tiltFrom, Math.max(deltaMove,deltaPan,deltaTilt));
    }
    else if(dir == 'from'){
        sliderMove(moveTo,moveFrom,panTo,panFrom, tiltTo,tiltFrom, Math.max(deltaMove,deltaPan,deltaTilt));
    }
    else if(dir == 'to'){
        sliderMove(moveFrom,moveTo,panFrom,panTo, tiltFrom,tiltTo, Math.max(deltaMove,deltaPan,deltaTilt));
    }
}

function onDefault(axis){

    if(axis == 0)
    {
        id('slidermovementfrom').value = WPOS[axis] * (100 / maxSliderLength);
        id('slidermovementto').value = WPOS[axis] * (100 / maxSliderLength);
    }
    else if(axis == 1)
    {
        id('sliderpanfrom').value = WPOS[axis];
        id('sliderpanto').value = WPOS[axis];
    }
    else if(axis == 2)
    {
        id('slidertiltfrom').value = WPOS[axis];
        id('slidertiltto').value = WPOS[axis];
    }
}

function onPanHelper(){

    var moveFrom = clamp(parseInt(id('slidermovementfrom').value),0,100) * (maxSliderLength / 100);
    var moveTo = clamp(parseInt(id('slidermovementto').value),0,100) * (maxSliderLength / 100);
    var deltaMove = Math.abs(moveFrom - moveTo) / 2;

    var dist = id('sliderpandistance').value *1000;
    var pan = rad2deg(Math.atan(deltaMove/dist));

    id('sliderpanfrom').value = -pan;
    id('sliderpanto').value = pan;
}

function sliderGrblState(grbl, response) {

}

// helper functions
function sliderMove(moveFrom,moveTo,panFrom,panTo,tiltFrom,tiltTo, feedrate){

    console.log('Execute Move form: ' + moveFrom + 'mm to ' + moveTo + 'mm pan from:' + panFrom + '° to ' + panTo + '° Feedrate:' + feedrate + ' mm/min');

    cmd = 'G1 X' + moveFrom + ' Y' + panFrom + ' Z' + tiltFrom + ' F100000';
    console.log(cmd);
    SendPrinterCommand(cmd, true, get_Position);

    // cmd = 'G04 P1000';
    // SendPrinterCommand(cmd, true, get_Position);

    cmd = 'G1 X' + moveTo + ' Y' + panTo + ' Z' + tiltTo + ' F' + feedrate;
    console.log(cmd);
    SendPrinterCommand(cmd, true, get_Position);

    // function SendJogcommand(cmd, feedrate) {
    // cmd = 'X' + moveTo + ' Y' + panTo + ' Z' + tiltTo;
    // SendJogcommand(cmd, feedrate);
}

function clamp(val, min, max) {
    return val > max ? max : val < min ? min : val;
}

var rad2deg = function(rad){
    return rad * 180 / Math.PI;
}