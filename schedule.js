var DD = function () {
    //come time-constants
    var msecPerMinute = 1000 * 60;
    var msecPerHour = msecPerMinute * 60;
    var msecPerDay = msecPerHour * 24;

    //rotationEvents: map[eventname, duration]
    var rotationEvents = {};
    rotationEvents['dungeon-delves'] = 1;
    rotationEvents['foundry'] = 1;
    rotationEvents['gauntlgrym1'] = 0.5;
    rotationEvents['gauntlgrym2'] = 0.5;
    rotationEvents['gauntlgrym3'] = 1;
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

    return {
        nextDD: function () { 
            //set what we know
            var lastKnownDDInMsec = new Date("07/29/2013 18:00").getTime();
            var currentTimeInMsec = new Date().getTime();
            var rotationLengthInHours = sumValues(mapValueToArray(rotationEvents));

            //calculate time since last known DD.
            var interval = currentTimeInMsec - lastKnownDDInMsec;
            var hours = Math.floor(interval / msecPerHour );
            interval = interval - (hours * msecPerHour );
            var minutes = Math.floor(interval / msecPerMinute );
            interval = interval - (minutes * msecPerMinute );
            var seconds = Math.floor(interval / 1000 );

            //calculate when the next DD should be
            passedDDsSince = Math.floor(hours / rotationLengthInHours);
            targetHours = (passedDDsSince + 1) * rotationLengthInHours;

            //calculate countdown
            hours = targetHours - hours;
            minutes = 60 - minutes;
            if (minutes === 60) {
                hours = hours+1;
                minutes = 0;
            }
            seconds = 60 -seconds;
            return (hours + " hours, " + minutes + " minutes, " + seconds + " seconds.");
        }
    }
}
var dd = new DD();
