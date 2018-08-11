// var message = 'ALL YOUR BASE', length = Buffer.byteLength(message), buffer = new Buffer(4 + Buffer.byteLength(message));// 4 bytes = 32 bits
// var bla = new Buffer('0006', 'hex');
// buffer.writeUInt32BE(length, 0);
// buffer.write(message, 4);

// buffer;
// console.log(length);
// console.log(buffer);
// console.log(buffer.toString());
// console.log(bla.toString());

var number2bcd = function(number, size) {
    var s = size || 4; //default value: 4
    var bcd = new Buffer(s);
    bcd.fill(0);
    while(number !== 0 && s !== 0) {
        s-=1;
        bcd[s] = (number % 10);
        number = (number / 10)|0;
        bcd[s] += (number % 10) << 4;
        number = (number / 10)|0;
    }
    // console.log(bcd);
    return bcd;
}

// var bcd1 = number2bcd(2417115, 4)
var bcd1 = Buffer.from("242480002537E300A0130118072835024171150543868800000000C0470007A819280116A01D00FFE20D", "hex")
console.log(bcd1)
console.log(bcd1.length)


var bcd2number = function(bcd) {
    var n = 0;
    var m = 1;
    for(var i = 0; i<bcd.length; i+=1) {
        n += (bcd[bcd.length-1-i] & 0x0F) * m;
        n += ((bcd[bcd.length-1-i]>>4) & 0x0F) * m * 10;
        m *= 100;
    }
    // console.log(n);
    return n;
}




var num1 = bcd2number(bcd1);
console.log(num1)
console.log(num1.toString());
var num1str = num1.toString();
var degrees = num1str.substring(0, 3);
console.log('degrees: ' + degrees);
degrees = parseInt(degrees);
console.log(degrees)
console.log(typeof degrees)


