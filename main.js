img = "";
status ="";
objects = [];
alarm = "alarm.mp3";
function preload(){
    img = loadImage("baby.jpg");
}

function setup(){
    canvas = createCanvas(640,420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(img,0,0,640,420);
    if(status!=""){
        r = random(255);
        g = random(255);
        b = random(255);
        for(i=0;i<objects.length;i++){
            if(objects==person){
                document.getElementById("status").innerHTML = "Status : Baby Detected";
                console.log("Houston, mission success");
                alarm.stop();
                document.getElementById("status").innerHTML = "Status : Objects Detected";
                document.getElementById("no_of_objects").innerHTML = "Number of objects detected : " + objects.length;
                fill(r,g,b);
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
                noFill();
                stroke(r,g,b);
                rect(objects[i].x , objects[i].y, objects[i].width, objects[i].height);
            }
            else{
                document.getElementById("status").innerHTML = "Status : Baby Not Detected";
                console.log("Houston, we got a problem");
                alarm.stop();
            }
        }
    }

}

