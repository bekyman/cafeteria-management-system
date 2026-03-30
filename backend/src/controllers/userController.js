export const getMe = (req, res) => {
  return res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      employeeId: req.user.employeeId,
      userType: req.user.userType,
      role: req.user.role,
    },
  });
};

export const canUseCafeteria = (req, res) => {
  return res.json({
    access: true,
    message: "Cafeteria access granted for working hours",
    user: {
      id: req.user._id,
      name: req.user.name,
      userType: req.user.userType,
    },
  });
};
