function getDateInMonth(year, month) {
    if (month === 2)
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28;
    var b = month <= 7 ? 0 : 1;
    return 30 + (month % 2) ^ b
}

function toDate(n) {
    var m = null;
    if (typeof n === "string") {
        m = n.match(/^(\d{4})\D(\d{1,2})\D(\d{1,2})[^+Z]*$/);
        if (m) {
            return new Date(+m[1], +m[2] - 1, +m[3])
        }
    }
    return new Date(n)
}

function dateDiff(a, b) {
    a = toDate(a);
    b = toDate(b);
    if (isNaN(+a) || isNaN(+b)) return null;
    var i = 1;
    if (+a > +b) {
        i = a;
        a = b;
        b = i;
        i = -1
    }
    var pY = a.getFullYear();
    var pM = a.getMonth();
    var pD = a.getDate();
    var cY = b.getFullYear();
    var cM = b.getMonth();
    var cD = b.getDate();
    var y = cY - pY;
    var m = cM - pM;
    var d = cD - pD;
    if (d < 0) {
        var dY = cY, dM = cM, dD = pD;
        if (dM < 1) { dM += 12; dY--; }
        var mid = getDateInMonth(dY, dM)
        if (pD > mid) {
            dD = mid
        }
        d = mid - dD + cD
        m--;
    }
    if (m < 0) {
        y--;
        m += 12;
    }
    return [y * i, m * i, d * i];
}

export default dateDiff;
