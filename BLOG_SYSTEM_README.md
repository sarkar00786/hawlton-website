# Firebase Blog System

This document explains how to set up and use the Firebase-powered blog system for the Hawlton website.

## Overview

The blog system includes:
- 🔐 **Authentication**: Secure admin access limited to authorized emails
- ✍️ **Rich Text Editor**: Full-featured blog post editor with formatting
- 🖼️ **Image Upload**: Drag-and-drop image support with Firebase Storage
- 📱 **Responsive Design**: Mobile-friendly blog interface
- 🔍 **Search & Filter**: Category filtering and search functionality
- 📊 **Analytics**: Post views and likes tracking

## Quick Setup

### 1. Install Dependencies

Run the setup script for your platform:

**Windows:**
```bash
./setup-blog.bat
```

**macOS/Linux:**
```bash
chmod +x setup-blog.sh
./setup-blog.sh
```

**Or manually:**
```bash
npm install firebase react-quill quill react-dropzone
npm install @types/react-quill @types/react-dropzone --save-dev
```

### 2. Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project or select existing one
3. Enable the following services:
   - **Firestore Database** (Start in production mode)
   - **Storage** (Start in production mode)
   - **Authentication** (Enable Email/Password provider)

### 3. Environment Configuration

1. In Firebase Console, go to Project Settings → General
2. Copy your Firebase config
3. Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
NEXT_PUBLIC_ADMIN_EMAILS=azkabloch786@gmail.com
```

### 4. Firebase Security Rules

#### Firestore Rules
In Firebase Console → Firestore Database → Rules:

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

#### Storage Rules
In Firebase Console → Storage → Rules:

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

## Usage

### Accessing the Blog Admin

1. Visit `/blog/admin` on your website
2. Sign in with an authorized email (`azkabloch786@gmail.com`)
3. Use the admin interface to create, edit, and manage blog posts

### Blog Editor Features

- **Rich Text Formatting**: Bold, italic, headings, lists, links
- **Image Upload**: Drag and drop images directly into the editor
- **Categories**: Organize posts by category
- **Tags**: Add tags for better organization
- **Draft/Published**: Control post visibility
- **SEO**: Custom excerpts and slugs

### Blog Display

- **Main Blog Page**: `/blog` - Shows all published posts
- **Category Filtering**: Filter posts by category
- **Search**: Search posts by title and content
- **Individual Posts**: `/blog/[slug]` - Individual post pages

## File Structure

```
src/
├── app/
│   └── blog/
│       ├── admin/
│       │   └── page.tsx          # Blog admin interface
│       └── page.tsx              # Main blog listing page
├── components/
│   └── blog/
│       └── BlogEditor.tsx        # Rich text blog editor
└── lib/
    ├── firebase.ts               # Firebase configuration
    └── services/
        └── blog.ts               # Blog service (CRUD operations)
```

## API Reference

### Blog Service Methods

```typescript
// Create a new post
await blogService.createPost(postData)

// Update existing post
await blogService.updatePost(postId, updateData)

// Delete post
await blogService.deletePost(postId)

// Get all posts
await blogService.getAllPosts()

// Get published posts only
await blogService.getPublishedPosts()

// Get post by slug
await blogService.getPostBySlug(slug)

// Upload image
await blogService.uploadImage(file)

// Search posts
await blogService.searchPosts(searchTerm)
```

## Customization

### Adding New Admin Users

1. Update `NEXT_PUBLIC_ADMIN_EMAILS` in your `.env.local`:
```env
NEXT_PUBLIC_ADMIN_EMAILS=email1@example.com,email2@example.com
```

2. Update Firebase Security Rules to include the new emails

### Styling

The blog components use Tailwind CSS with your existing design system:
- Primary colors: navy, gold, platinum, charcoal
- Responsive breakpoints
- Consistent spacing and typography

### Adding Features

The blog service is extensible. You can add features like:
- Comments system
- Post sharing
- Email notifications
- RSS feed
- SEO meta tags

## Troubleshooting

### Common Issues

1. **Firebase connection errors**: Check environment variables
2. **Permission denied**: Verify Firebase security rules
3. **Image upload fails**: Check Storage rules and bucket configuration
4. **Build errors**: Ensure all dependencies are installed

### Debug Mode

To enable Firebase debug logging:

```typescript
// In your firebase.ts file
import { enableNetwork } from 'firebase/firestore'
// Enable logging in development
if (process.env.NODE_ENV === 'development') {
  // Firebase debug logging
}
```

## Security Considerations

- Admin access is restricted by email authentication
- Firebase Security Rules prevent unauthorized writes
- Images are stored in a dedicated Storage bucket
- All user inputs are sanitized by the rich text editor

## Production Deployment

Before deploying to production:

1. ✅ Update Firebase Security Rules
2. ✅ Set production environment variables
3. ✅ Test all admin functionality
4. ✅ Verify image upload/deletion works
5. ✅ Check responsive design on all devices

## Support

For issues with the blog system:
1. Check this documentation first
2. Review Firebase Console for errors
3. Check browser console for client-side errors
4. Verify environment variables are set correctly

---

**Happy Blogging! 🚀**
