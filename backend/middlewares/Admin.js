const Admin = (req, res, next) => {
    if(req.user.role !== "admin"){
        return res.json({message: "You don't have permission to see all Notes.", success: false})
    }
    next();
}

module.exports = Admin;