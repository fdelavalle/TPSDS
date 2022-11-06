print("Started Adding the Users.");
db = db.getSiblingDB("tpsds");
db.createUser({
  user: "test_user",
  pwd: "test_pass",
  roles: [{ role: "readWrite", db: "tpsds" }],
});
print("End Adding the User Roles.");