var DD = function () {
    var lastKnownDDInMsec = new Date("2013-07-29 18:00").getTime();
    var hoursBetweenDDs = 6;
    var msecPerMinute = 1000 * 60;
    var msecPerHour = msecPerMinute * 60;
    var msecPerDay = msecPerHour * 24;

    return {
        nextDD: function () { 
            var currentTimeInMsec = new Date().getTime();
            var interval = currentTimeInMsec - lastKnownDDInMsec;
            //calculate time sind last known DD.
            var hours = Math.floor(interval / msecPerHour );
            interval = interval - (hours * msecPerHour );
            var minutes = Math.floor(interval / msecPerMinute );
            interval = interval - (minutes * msecPerMinute );
            var seconds = Math.floor(interval / 1000 );

            //calculate when the next DD should be
            passedDDsSince = Math.floor(hours / hoursBetweenDDs) ;
            targetHours = (passedDDsSince + 1) * hoursBetweenDDs

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
console.log(dd.nextDD());
