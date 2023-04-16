
var clockTimes = [];

var HTMLbuttonAddTime = `
<button class="addTime" onclick="handleTimeLineBlockDisplay(this)">+</button>
`;

var HTMLtextAddTimeLine = `
<div id="addTimeLineBlock">
<input type="time" name="addTimeLine" id="addTimeLine">
<button class="addTime" onclick="handleAddTimeLine()">+</button>
<button class="deleteBlockTimeLine" onclick="handleClockTimesDisplay()">x</button>
</div>
`;

var addressClockTime = document.getElementById('clockTimes');

// Variables for Lamp Controller

var addressCheckSwitch = document.getElementById('checkSwitch');

var booleanCheckSwitch; // Signal connect     SocketServer


// Listen for click


// Run function



function handleClockTimesDisplay() {
    let textClockTimes = "";
    clockTimes.forEach(time => {
        if (time) {
            textClockTimes +=
                `<div value="${time}" class="timeDisplay">
                    <li class="time">${time}</li>
                    <button value="${time}" class="deleteTime" onclick="handleDeleteTime(this)">X</button>
                </div>
            `;
        }
    });
    textClockTimes += HTMLbuttonAddTime;
    addressClockTime.innerHTML = textClockTimes;
}

function handleAddTimeLine() {
    let dataTimeAdded = document.getElementById('addTimeLine').value;
    if (dataTimeAdded != '') {
        if (!clockTimes.includes(dataTimeAdded)) clockTimes.push(dataTimeAdded);
        handleSortTimeArray();
        handleClockTimesDisplay();
    }
}

function handleDeleteTime(element){
    for (let index = 0; index < clockTimes.length; index++) {
        if (clockTimes[index] != element.value) continue;
        delete clockTimes[index];
        break;
    }
    let changeStatus = element.parentNode;
    changeStatus.classList.add('blur');
    element.remove();
    handleSortTimeArray();
}

function handleTimeLineBlockDisplay(element) {
    element.outerHTML = HTMLtextAddTimeLine;
}

function handleSortTimeArray() {
    clockTimes.sort();
    while (!clockTimes[clockTimes['length']-1] && clockTimes['length'] != 0) clockTimes.pop();
    sendDataAlarmClockToServer();
}

// ----------------------------------------------- //

var valueSwap = {
    setClockTimes: function(array) {
        clockTimes = array;
    },
    setBooleanCheckSwitch: function(b) {
        booleanCheckSwitch = b;
    },
    getClockTimes: function() {
        return clockTimes;
    },
    getBooleanCheckSwitch: function() {
        return booleanCheckSwitch;
    },
    getAddressCheckSwitch: function() {
        return addressCheckSwitch;
    }
}

// ----------------------------------------------- //


// Check data in some times


var gateway = `ws://${window.location.hostname}/ws`;
var websocket;




window.addEventListener('load', onLoad);
window.addEventListener('DOMContentLoaded', onLoaded);
valueSwap.getAddressCheckSwitch().addEventListener('change', handleToggleSwitch);



function handleToggleSwitch(event) {
    handleSwitchDisplay();
    toggleSwitch(event);
    sendSignalSwitchToServer();
}

function handleSwitchDisplay() {
    const temp = valueSwap.getAddressCheckSwitch();
    temp.setAttribute('disabled', true);
    setTimeout(() => {
        temp.removeAttribute('disabled');
    }, 1000);
}

function toggleSwitch(event) {
    const Medium = valueSwap.getAddressCheckSwitch().checked;
    valueSwap.setBooleanCheckSwitch(Medium);
}

function sendSignalSwitchToServer() {
    console.log('Sending signal to server');
    const signalTemp = JSON.stringify(valueSwap.getBooleanCheckSwitch());
    websocket.send(signalTemp);
}

function sendDataAlarmClockToServer() {
    const dataTemp = clockTimes.toString();
    websocket.send(dataTemp);
}

function convertDataAlarms() {
    let dataTemp="";
    clockTimes.forEach((data) => {
        let temp = data[0] + data[1] + data[3] + data[4];
        dataTemp += temp;
    });
    return dataTemp;
}

function onLoad() {
    initWebSocket();
}

function configureValue() {
    fetch('/statusSwitch')
        .then(response => response.text())
        .then((signal) => {
            console.log(signal);
            valueSwap.getAddressCheckSwitch().checked = (signal === 'true');
        })
        .catch((error) => console.log('Error'));
        
    fetch('/dataAlarmClock')
        .then(response => response.text())
        .then((data) => {
            console.log(data);
            clockTimes = data.split(',');
            handleClockTimesDisplay();
        })
        .catch((error) => console.log('Error'));
}

function initWebSocket() {
    console.log('Trying to open a WebSocket connection...');
    websocket = new WebSocket(gateway);
    websocket.onopen    = onOpen;
    websocket.onclose   = onClose;
}

function onOpen(event) {
  console.log('Connection opened');
}

function onClose(event) {
    console.log('Connection closed');
    setTimeout(initWebSocket, 2000);
}

function onLoaded(event) {
    configureValue();
}