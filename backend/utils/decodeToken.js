import jwt from "jsonwebtoken";

export const decodeToken = (req, ignoreExpiration=true)=>{
    const data = req.header("Authorization");
    const token = data && data.split(" ")[1];
    
    try{
      const decoded = jwt.verify(token, process.env.SECRET_KEY, {
        ignoreExpiration: ignoreExpiration,
      });

    return {decoded, token};
    }
    catch{
      return {decoded: '', token: ''}
    }
}