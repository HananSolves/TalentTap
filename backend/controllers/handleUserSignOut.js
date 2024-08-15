function handleUserSignOut(req, res) {
  res.clearCookie("uid");
  return res.status(200).json({ msg: "Successfully Signed Out" });
}

export default handleUserSignOut;
