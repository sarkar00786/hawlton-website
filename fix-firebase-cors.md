# Fix Firebase Storage CORS Issues

The image upload issue you're experiencing is due to Firebase Storage CORS (Cross-Origin Resource Sharing) configuration. Here's how to fix it:

## Method 1: Use Firebase Console (Recommended)

1. **Go to Firebase Console**: https://console.firebase.google.com/project/hawlton
2. **Navigate to Storage** in the left sidebar
3. **Click on "Rules" tab**
4. **Update your Storage Rules** to this:

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

5. **Click "Publish"**

## Method 2: Use Google Cloud Console (Alternative)

1. **Install Google Cloud SDK** if not already installed
2. **Run this command** in your terminal:

```bash
gsutil cors set cors.json gs://hawlton.firebasestorage.app
```

## Method 3: Check Firebase Configuration

Ensure your Firebase configuration in `.env.local` is correct:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=hawlton.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=hawlton
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=hawlton.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Troubleshooting Steps

1. **Clear browser cache** and cookies
2. **Try a different browser** or incognito mode
3. **Check network tab** in browser dev tools for specific error messages
4. **Verify authentication** - make sure you're logged in with azkabloch786@gmail.com
5. **Check file size** - Firebase has upload limits

## Testing

After applying the fix:

1. Go to `/blog/admin`
2. Create a new post
3. Try uploading a featured image
4. Try adding images to the content

The images should now upload successfully without CORS errors.

## Backup Solution

If Firebase Storage continues to fail, the SimpleBlogEditor component has a fallback that converts images to base64, which will work but may result in larger database storage usage.
