# Firebase Console Setup Instructions

## 🔥 Firebase Project Configuration

Your Firebase project "hawlton" is already created! Now you need to enable the required services.

### 1. Enable Firestore Database
1. Go to [Firebase Console](https://console.firebase.google.com/project/hawlton)
2. Click on **"Firestore Database"** in the left sidebar
3. Click **"Create database"**
4. **Production mode** → **Next**
5. Choose your location (pick the closest to your users)
6. Click **"Create"**

### 2. Enable Firebase Storage
1. In Firebase Console, click **"Storage"** in the left sidebar
2. Click **"Get started"**
3. **Production mode** → **Next**
4. Choose the same location as Firestore
5. Click **"Create"**

### 3. Enable Authentication
1. Click **"Authentication"** in the left sidebar
2. Click **"Get started"**
3. Go to **"Sign-in method"** tab
4. **Enable Email/Password:**
   - Click on **"Email/Password"**
   - **Enable** the first option (Email/Password)
   - Click **"Save"**
5. **Enable Google OAuth:**
   - Click on **"Google"**
   - **Enable** Google sign-in
   - Enter your project support email: `azkabloch786@gmail.com`
   - Click **"Save"**

### 4. Configure Security Rules

#### Firestore Rules
1. Go to **Firestore Database** → **Rules** tab
2. Replace the existing rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Blog posts - read all, write only for authenticated users
    match /blog_posts/{document} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email in ['azkabloch786@gmail.com'];
    }
    
    // Blog categories - read all, write only for authenticated users
    match /blog_categories/{document} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email in ['azkabloch786@gmail.com'];
    }
  }
}
```

3. Click **"Publish"**

#### Storage Rules
1. Go to **Storage** → **Rules** tab
2. Replace the existing rules with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /blog-images/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email in ['azkabloch786@gmail.com'];
      allow delete: if request.auth != null && request.auth.token.email in ['azkabloch786@gmail.com'];
    }
  }
}
```

3. Click **"Publish"**

### 5. Create Admin User
1. Go to **Authentication** → **Users** tab
2. Click **"Add user"**
3. Enter email: `azkabloch786@gmail.com`
4. Enter a password (you'll use this to log into the blog admin)
5. Click **"Add user"**

## 🚀 Test Your Setup

1. Make sure your dev server is running: `npm run dev`
2. Visit: [http://localhost:3000/blog](http://localhost:3000/blog)
3. Visit: [http://localhost:3000/blog/admin](http://localhost:3000/blog/admin)
4. Sign in with the admin account you created
5. Try creating a test blog post

## ✅ You're Ready to Blog!

Your Firebase-powered blog system is now fully configured and ready to use!

### Next Steps:
- Create your first blog post via `/blog/admin`
- Customize categories in the BlogEditor component
- Add more admin users by updating the security rules
- Configure Firebase Analytics (optional)

### Troubleshooting:
- **Can't sign in?** Check Authentication is enabled and user exists
- **Can't save posts?** Check Firestore rules and authentication
- **Can't upload images?** Check Storage rules and authentication
- **Console errors?** Check environment variables in `.env.local`

---
**Happy Blogging! 🎉**
