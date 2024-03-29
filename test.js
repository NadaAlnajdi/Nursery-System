const bcrypt = require("bcrypt");
const saltRounds = 10;
let myPlaintextPassword = "123456";
const someOtherPlaintextPassword = "not_bacon";

// bcrypt.genSalt(saltRounds, function(err, salt) {
//     console.log(salt);
//     bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
//         console.log(hash);
//     });
// });

// bcrypt.hash(myPlaintextPassword, 10, function (err, hash) {
//   console.log(hash);

// });



//   // Load hash from your password DB.
//   myPlaintextPassword = "12345";
  
//   bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
//     console.log(result);
//   });


const hashPassword=bcrypt.hashSync("lab123",10)
console.log(hashPassword);
console.log(
    bcrypt.compareSync("lab1234",hashPassword)
);