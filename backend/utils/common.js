module.exports = {
  currentUser: {},
  parse2Plain: (object) => {
    if (!object) return null;

        return JSON.parse(JSON.stringify(object));
    },
    getMondayOfLastWeek: () => {
        var date = new Date();
        var day = date.getDay();
        var prevMonday = new Date();
        if(date.getDay() == 0){
            prevMonday.setDate(date.getDate() - 7);
        }
        else{
            prevMonday.setDate(date.getDate() - (day-1) - 7);
        }

        prevMonday.setHours(0, 0, 0, 0);

        return prevMonday;
    },
    getSundayOfLastWeek: () => {
        var date = new Date();
        var day = date.getDay();
        var prevSunday = new Date();
        if(date.getDay() == 0){
            prevSunday.setDate(date.getDate());
        }
        else{
            prevSunday.setDate(date.getDate() - day);
        }

        prevSunday.setHours(23, 59, 59, 999);

        return prevSunday;
    },
  padLeadingZero: (num, size) => {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }
}