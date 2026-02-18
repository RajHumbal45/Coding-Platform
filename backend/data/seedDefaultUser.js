const bcrypt = require("bcryptjs");
const User = require("../models/User");

const ensureDefaultUsers = async () => {
  const defaults = [
    {
      name: "Demo Student",
      email: "student@example.com",
      password: "student123",
      role: "student",
    },
    {
      name: "Admin User",
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
    },
  ];

  for (const item of defaults) {
    const existing = await User.findOne({ email: item.email });

    if (!existing) {
      const passwordHash = await bcrypt.hash(item.password, 10);
      await User.create({
        name: item.name,
        email: item.email,
        password: passwordHash,
        role: item.role,
      });
      console.log(`Created default ${item.role}: ${item.email} / ${item.password}`);
    }
  }
};

module.exports = ensureDefaultUsers;
