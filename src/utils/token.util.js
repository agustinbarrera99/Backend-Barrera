import jwt from "jsonwebtoken";

export const createToken = (data) => {
  const token = jwt.sign(data, process.env.SECRET, {
    expiresIn: 60 * 60 * 24 * 7,
  });
  return token;
};

export const verifyToken = (token) => {
  if(token) {
    const data = jwt.verify(token, process.env.SECRET)
    return data
  } 
  const error = new Error("bad auth token")
  error.statusCode = 401
  throw error
};
