const model = require("./model.js");

model.sequelize.sync({
    force: false
}).done(() => {
    console.log('wait for one minute and ctrl c to exit ');
})

console.log("init db OK!");
// process.exit(0);