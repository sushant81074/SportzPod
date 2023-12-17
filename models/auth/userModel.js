const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email musn't be registered allready"],
    },
    password: {
      type: String,
      required: [true, "password is required "],
      minLength: [8, "password must contain more than 8 chars "],
      minLength: [16, "password musn't contain more than 16 chars "],
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
      required: true,
    },
    loginType: {
      type: String,
      enum: ["GOOGLE", "GITHUB", "LOCAL"],
      default: "LOCAL",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.method.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
