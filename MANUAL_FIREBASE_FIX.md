# 🚨 MANUAL FIREBASE FIX - DO THIS NOW!

Your blog is failing because Firebase rules haven't been applied. Here's exactly what to do:

## 🔥 STEP 1: Fix Firestore Rules (CRITICAL)

1. **Go to:** https://console.firebase.google.com/project/hawlton/firestore/rules
2. **Delete all existing rules and paste this exactly:**

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Blog posts - read all, write only for authenticated admin
    match /blog_posts/{document} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == "azkabloch786@gmail.com";
    }
    
    // Blog categories - read all, write only for authenticated admin
    match /blog_categories/{document} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == "azkabloch786@gmail.com";
    }
    
    // Allow reading user profiles (for admin verification)
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. **Click "Publish"**

## 🔥 STEP 2: Fix Storage Rules (CRITICAL)

1. **Go to:** https://console.firebase.google.com/project/hawlton/storage/rules
2. **Delete all existing rules and paste this exactly:**

```javascript
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    // Public images can be read
    match /blog-images/{allPaths=**} {
      allow read: if true;
      // Write allowed only for the authenticated admin
      allow write, delete: if request.auth != null && request.auth.token.email == "azkabloch786@gmail.com";
    }
  }
}
```

3. **Click "Publish"**

## 🔥 STEP 3: Add Authorized Domains

1. **Go to:** https://console.firebase.google.com/project/hawlton/authentication/settings
2. **Scroll to "Authorized domains"**
3. **Add these domains:**
   - `hawlton.com`
   - `www.hawlton.com`

## 🔥 STEP 4: Check Storage CORS (Advanced)

If image uploads still fail after the above:

1. **Install Google Cloud SDK** (if not installed):
   - Go to: https://cloud.google.com/sdk/docs/install
   - Download and install

2. **Run this command in terminal:**
```bash
gsutil cors set cors.json gs://hawlton.firebasestorage.app
```

## 🧪 STEP 5: Test

1. **Wait 2-3 minutes** for rules to propagate
2. **Go to:** https://hawlton.com/blog/admin
3. **Sign in with:** azkabloch786@gmail.com
4. **Try creating a blog post**
5. **Try uploading an image**

## ❌ If Still Not Working:

1. **Check Firebase Console → Project Settings → General**
2. **Verify Storage bucket is:** `hawlton.firebasestorage.app`
3. **Clear browser cache and try again**
4. **Check Vercel environment variables have all Firebase config**

## 🚨 URGENT: Do Steps 1 & 2 NOW!

The main issues are:
- ❌ Firestore rules blocking blog post creation
- ❌ Storage rules blocking image uploads  
- ❌ Missing authorized domains

**These MUST be fixed in Firebase Console manually!**
