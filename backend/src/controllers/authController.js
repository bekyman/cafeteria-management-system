import jwt from "jsonwebtoken";

export const login = (req, res) => {
  const { username } = req.body;

  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });

  res.json({ token });
};