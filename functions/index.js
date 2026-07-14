const { onCall, HttpsError } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

admin.initializeApp();

exports.deleteStaffAccount = onCall(async (request) => {
  const callerEmail = request.auth?.token?.email?.toLowerCase();
  if (!callerEmail) {
    throw new HttpsError("unauthenticated", "You must be signed in.");
  }

  const callerRoleDoc = await admin.firestore().doc(`staffRoles/${callerEmail}`).get();
  if (!callerRoleDoc.exists || callerRoleDoc.data().role !== "admin") {
    throw new HttpsError("permission-denied", "Only admins can delete staff accounts.");
  }

  const targetEmail = (request.data?.email || "").toLowerCase().trim();
  if (!targetEmail) {
    throw new HttpsError("invalid-argument", "An email is required.");
  }

  try {
    const userRecord = await admin.auth().getUserByEmail(targetEmail);
    await admin.auth().deleteUser(userRecord.uid);
  } catch (err) {
    if (err.code !== "auth/user-not-found") {
      throw new HttpsError("internal", "Could not delete the login: " + err.message);
    }
  }

  await admin.firestore().doc(`staffRoles/${targetEmail}`).delete();

  return { success: true };
});
