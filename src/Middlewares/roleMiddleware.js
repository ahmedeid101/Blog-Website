// import { Response, NextFunction } from 'express';
// import { AuthRequest } from './auth.middleware';

// //The --authorizeRoles-- middleware is used for Role-Based Access Control (RBAC) 
// // — it restricts access to certain routes based on the user's role.

// export const authorizeRoles = (...roles: string[]) =>{
//     return (req: AuthRequest, res: Response, next: NextFunction): void => {
//         if(!req.user || !roles.includes(req.user.role)){
//             res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
//             return;
//         }
//         next();
//     };
// };