@echo off
echo 🚀 Setting up Firebase Blog System...

REM Install Firebase dependencies
echo 📦 Installing Firebase dependencies...
npm install firebase

REM Install rich text editor and related dependencies
echo 📝 Installing rich text editor dependencies...
npm install react-quill quill
npm install @types/react-quill --save-dev

REM Install additional utilities
echo 🔧 Installing additional utilities...
npm install react-dropzone
npm install @types/react-dropzone --save-dev

echo ✅ Blog system dependencies installed successfully!
echo.
echo 🔧 Next steps:
echo 1. Create a Firebase project at https://console.firebase.google.com
echo 2. Enable Firestore Database
echo 3. Enable Firebase Storage
echo 4. Enable Firebase Authentication (Email/Password)
echo 5. Copy your Firebase config from Project Settings
echo 6. Create a .env.local file with your Firebase config values
echo 7. Run 'npm run dev' to start development server
echo.
echo 📋 Example .env.local content:
echo NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
echo NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
echo NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
echo NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
echo NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
echo NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
echo NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
echo NEXT_PUBLIC_ADMIN_EMAILS=azkabloch786@gmail.com
pause
