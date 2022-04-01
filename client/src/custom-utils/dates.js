export const calculate_age = (dob) => {
    var today = new Date();
    var birthday = new Date(dob)
    var age_now = today.getFullYear() - birthday.getFullYear();
    var m = (today.getMonth() + 1) - birthday.getMonth();
    if (m < 0) {
        m = (12 + m);
        age_now--;
    }
    return `${age_now} years ${m} months`;
  }

  export const getTime = (d) => {
    let date = new Date(d)
    let dateString = {
        day: date.getDate(),
        month: (date.getMonth() + 1),
        year: date.getFullYear()
    }
    return dateString;
  }