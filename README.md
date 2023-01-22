
# Camera Slider
this is intended to run the FluidNC board as a camera slider 
<img src='https://raw.githubusercontent.com/4ndreas/ESP3D-WEBUI/cameraslider/docs/images/cameraSlider.PNG'/>  

## Installation
Please use the latest [Fluid NC firmware] http://wiki.fluidnc.com/


## Debug

#### Run the debug webserver
``` bash 
gulp dev --192.168.2.134
```

the optional IP proxies to the ESP32 board for live debug 

#### Live update
to update the site of the dev-webserver
``` bash 
gulp update --lang en 
```
or for the test version that did not sends the commands to the ESP32
``` bash 
gulp updateTest --lang en 
```

#### The final build run
``` bash 
gulp package --lang en
```
* note that there is not enough memory to compile the site with all languages packackes so you have to chose one or two

