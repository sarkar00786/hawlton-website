# Authentication Setup Guide

This guide will help you set up Firebase Authentication and Google OAuth for your Hawlton website.

## 🔧 Quick Setup

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your existing project "hawlton" or create a new one
3. **Enable Authentication:**
   - Click "Authentication" in the left sidebar
   - Click "Get started"
   - Go to "Sign-in method" tab
   - Enable **Email/Password** provider
   - Enable **Google** provider (you'll get the credentials from step 2)

### 2. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your project or create a new one
3. **Enable Google+ API:**
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API" and enable it
4. **Create OAuth Credentials:**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client ID"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (for development)
     - `https://your-domain.com/api/auth/callback/google` (for production)
   - Save and copy the Client ID and Client Secret

### 3. Environment Variables

1. Copy `.env.local.example` to `.env.local`
2. Fill in all the required values:

```env
# NextAuth.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-a-random-secret-key

# Google OAuth Configuration (from step 2)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Firebase Configuration (from Firebase project settings)
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id

# Admin Configuration
NEXT_PUBLIC_ADMIN_EMAILS=your-admin-email@example.com
```

### 4. Get Firebase Configuration

1. In Firebase Console, go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click on your web app or create one
4. Copy the configuration values to your `.env.local`

### 5. Generate NextAuth Secret

Run this command to generate a secure secret:
```bash
openssl rand -base64 32
```
Add the result to `NEXTAUTH_SECRET` in your `.env.local`

## 🚀 Testing

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Test Email Signup:**
   - Go to `http://localhost:3000/auth/signup`
   - Create an account with email/password
   - Verify you receive a success message

3. **Test Email Signin:**
   - Go to `http://localhost:3000/auth/signin`
   - Sign in with the account you just created
   - Verify you're redirected to the dashboard

4. **Test Google OAuth:**
   - Click "Sign in with Google" on either page
   - Complete the Google OAuth flow
   - Verify you're signed in successfully

## 🔧 Troubleshooting

### "Account not found" Error
- Make sure Firebase Authentication is enabled
- Check that you're using the correct Firebase project
- Verify the user was created in Firebase Console → Authentication → Users

### Google OAuth Not Working
- Check that Google OAuth is enabled in Firebase
- Verify your Google Client ID and Secret are correct
- Make sure redirect URIs are properly configured in Google Cloud Console

### CSP (Content Security Policy) Issues
- The CSP has been updated to allow Firebase and Google services
- If you see CSP errors, restart your development server

### Environment Variables Not Loading
- Make sure your `.env.local` file is in the project root
- Restart your development server after changing environment variables
- Check that variable names are exactly as shown in the example

## 📝 What's Fixed

1. ✅ **Signup now creates real Firebase users** (instead of just showing a success message)
2. ✅ **Signin authenticates against Firebase** (instead of mock users)
3. ✅ **Removed demo credentials** from signin page
4. ✅ **Added Google OAuth buttons** to both signin and signup pages
5. ✅ **Fixed CSP headers** to allow Firebase and Google services
6. ✅ **Better error handling** with proper Firebase error messages

## 🎯 Features Working

- ✅ Email/Password Signup
- ✅ Email/Password Signin
- ✅ Google OAuth Signup
- ✅ Google OAuth Signin
- ✅ User profile management
- ✅ Secure session handling
- ✅ Proper error messages
- ✅ Redirect to dashboard after successful authentication

Your authentication system is now fully functional with Firebase backend! 🎉
