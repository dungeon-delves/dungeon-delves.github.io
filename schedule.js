var DD = function () {
    //come time-constants
    var msecPerMinute = 1000 * 60;
    var msecPerHour = msecPerMinute * 60;

    //rotationEvents: map[eventname, duration]
    var rotationEvents = {};
    rotationEvents['dungeon-delves'] = 1;
    rotationEvents['foundry'] = 1;
    rotationEvents['gauntlgrym-pve'] = 0.5;
    rotationEvents['gauntlgrym-pvp'] = 0.5;
    rotationEvents['gauntlgrym-dungeon'] = 0.5;
    rotationEvents['professions'] = 1;
    rotationEvents['skirmishes'] = 1;
    rotationEvents['pvp'] = 1;

    var mapValueToArray = function (mapObj) {
        var array = new Array();
        for (var key in rotationEvents) {
            if (rotationEvents.hasOwnProperty(key)) {
                var value = rotationEvents[key];
                array.push(value);
            }
        }
        return array;
    }

    var sumValues = function (array) {
        return array.reduce(function(previousValue, currentValue){
            return previousValue + currentValue;
        }); 
    }

    var calculateCurrentEvent = function(hours, minutes, rotationDuration) {
        var durationSum = rotationDuration;
        var toCompare = hours + (minutes/60);
        for (event in rotationEvents) {
            var duration = rotationEvents[event];
            durationSum -= duration;
            if (durationSum < toCompare) {
                return event;
            }
        }
        return "error"
    }

    return {
        nextEvent: function () { 
            //set what we know
            var rotationLengthInHours = sumValues(mapValueToArray(rotationEvents));
            var lastKnownDDInMsec = new Date("07/31/2013 10:00").getTime();
            var currentTimeInMsec = new Date().getTime();

            //calculate time since last known DD.
            var elapsedInMSec = currentTimeInMsec - lastKnownDDInMsec;

            //calculate when the next DD should be
            passedDDsSince = Math.floor(elapsedInMSec / (rotationLengthInHours*msecPerHour));
            targetHours = (passedDDsSince + 1) * rotationLengthInHours;

            //calculate countdown
            var countdownMSec = targetHours * msecPerHour - elapsedInMSec;
            var hours = Math.floor(countdownMSec / msecPerHour);
            var minutes = Math.ceil((countdownMSec - (hours * msecPerHour)) / msecPerMinute);
            var current = calculateCurrentEvent(hours, minutes, rotationLengthInHours);

            return {
                ddCountdown: {hours: hours, minutes: minutes},
                current: current
            }
        },


        updateDom: function () {
            var nextEvent = this.nextEvent();
            var ddDiv = document.getElementById("dd");
            var ddSpans = ddDiv.getElementsByTagName("span");
            for (spanId in ddSpans) {
                var span = ddSpans[spanId];
                var val = nextEvent.ddCountdown[span.className];
                span.innerHTML = ((''+val).length < 2) ? '0'+val : val ;
            }
            var currentDiv = document.getElementById("current");
            var currentSpan = currentDiv.getElementsByTagName("span")[0];
            currentSpan.innerHTML = nextEvent.current;
        }
    }
}
var dd = new DD();
