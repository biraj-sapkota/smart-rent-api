const connectToMongo = require("./config/dbConnection");
const User = require("./models/User");
const bcrypt = require("bcrypt");

const defaultAdmin = {
  name: "Admin User",
  email: "smartrent.app@gmail.com",
  hashPassword: bcrypt.hashSync("admin", 10),
  address: "Admin Address",
  DOB: new Date("1990-01-01"),
  contact: "9800000000",
  userType: "admin",
  gender: "male",
  verified: true,
};

const seedAdminUser = async () => {
  await connectToMongo();

  const adminUser = await User.findOne({ userType: "admin" });
  if (!adminUser) {
    await User.create(defaultAdmin);
    console.log("Default admin user created.");
  } else {
    console.log("Admin user already exists.");
  }
};

seedAdminUser().catch((error) => {
  console.error("Error seeding admin user:", error);
  process.exit(1);
});
