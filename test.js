const jwt = require('jsonwebtoken');
const config = require('config');


const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYzI2YTFhOWRlNThiNWQ3ODk2YTg5YiIsImZpcnN0X25hbWUiOiJNYXJrIEpheXZlZSIsImxhc3RfbmFtZSI6IlBheiIsInVzZXJuYW1lIjoiamliZWhqaWJlaCIsImlhdCI6MTU3MzAyODA1MiwiZXhwIjoxNTczMDM4ODUyfQ.S-EO4CAsgrNdQGqKCalQ-AwBsf0GsxO5Kx25GXwZf9E';


// var decoded = jwt.decode(token, {complete: true});
// console.log(decoded.payload.username);


var decoded = jwt.verify(token, config.get('jwtSecret'));

console.log(decoded);