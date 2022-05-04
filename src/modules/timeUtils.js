function getTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    return {"h": hours, "m": minutes, "am":ampm};
}
    
//adds "0" to start of one digit number (returns as string), returns the given number if already 2 digit
function make2digit(text){
    if(text.length < 2){
        return "0" + String(text);
    } else {
        return text;
    }
}

//takes day of week (as integer 0-7 starting at sunday) and returns the name of the day
function convertWeekDay(day){
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekDays[day];
}

//same as weekday, but for months
function convertMonth(month){
    const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[month];
}

//gets suffix of a number
function getSuffix(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return "st";
    }
    if (j == 2 && k != 12) {
        return "nd";
    }
    if (j == 3 && k != 13) {
        return "rd";
    }
    return "th";
}