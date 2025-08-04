@echo off
echo 🔥 FIREBASE EMERGENCY FIX - APPLYING RULES NOW
echo.

echo Step 1: Installing Firebase CLI (if not installed)...
npm install -g firebase-tools

echo.
echo Step 2: Login to Firebase (this will open browser)...
firebase login

echo.
echo Step 3: Initialize Firebase project...
firebase use hawlton

echo.
echo Step 4: Apply Firestore Rules...
firebase deploy --only firestore:rules

echo.
echo Step 5: Apply Storage Rules...
firebase deploy --only storage

echo.
echo Step 6: Configure Storage CORS...
gsutil cors set cors.json gs://hawlton.firebasestorage.app

echo.
echo ✅ Firebase rules and CORS have been applied!
echo Now test your blog at: https://hawlton.com/blog/admin
pause
