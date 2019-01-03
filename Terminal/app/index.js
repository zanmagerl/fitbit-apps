import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { today } from "user-activity"; 
import { goals } from "user-activity";
import { battery } from "power";
import { HeartRateSensor } from "heart-rate";
import { me as device } from "device";

// Update the clock every minute
clock.granularity = "minutes";
const deviceName = device.modelName.toLowerCase();
// Get a handle on the <text> element
const myLabel = document.getElementById("myLabel");
const timeInstructionI = document.getElementById("timeInstructionI");
const timeInstructionII = document.getElementById("timeInstructionII");
const heartInstructionI = document.getElementById("heartInstructionI");
const heartInstructionII = document.getElementById("heartInstructionII");
const heartData = document.getElementById("heartData");
const stepsInstructionI = document.getElementById("stepsInstructionI");
const stepsInstructionII = document.getElementById("stepsInstructionII");
const stepsData = document.getElementById("stepsData");

const dateInstructionI = document.getElementById("dateInstructionI");
const dateInstructionII = document.getElementById("dateInstructionII");
const dateData = document.getElementById("dateData");

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  timeInstructionI.text = 'watch@'+deviceName+':~$'; 
  timeInstructionII.text = ' time';
  myLabel.text = `${hours}:${mins}`;
}

dateInstructionI.text = 'watch@'+deviceName+':~$';
dateInstructionII.text = ' date';

var date = new Date();

var dayInWeek = date.getDay();
if(dayInWeek == 0){
  dayInWeek = 6;
}else{
  dayInWeek--;
}
var days = [
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT",
  "SUN"
];
dateData.text = days[dayInWeek] + " " + date.getDate();

heartInstructionI.text = 'watch@'+deviceName+':~$';
heartInstructionII.text = ' heart';
  
let hrm = new HeartRateSensor();
hrm.start();
// Begin monitoring the sensor
setInterval(heart, 1000);
setInterval(koraki, 30000);

stepsInstructionI.text = 'watch@'+deviceName+':~$';
stepsInstructionII.text = ' steps';
stepsData.text = today.adjusted.steps;



function heart(){
  document.getElementById("heartData").text = hrm.heartRate;
}
function koraki(){
  stepsData.text = today.adjusted.steps;
}
