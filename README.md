# pdf-api
A secure Node.js/Express API for uploading PDF files and retrieving signed URL using Firebase Storage and Firestore, with JWT authentication.

## Tech Stack
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **Authentication**: JWT (jsonwebtoken)
- **File Upload**: Multer

## Prerequisites
- Node.js (v16 or higher)
- Firebase project with:
  - Firestore enabled
  - Storage enabled
  - Service account credentials

## API Endpoints
1. Upload PDF
   - Endpoint: POST /api/upload-pdf
   - Description: Upload a PDF file to Firebase Storage and store its metadata in Firebase Firestore.
   - Request: Form-data containing the PDF file (use file field in the form).
   - Authentication: Requires a valid JWT token.
2. Get PDF URL
   - Endpoint: GET /api/get-url/:id
   - Description: Get a signed URL for accessing a PDF file.
   - Authentication: Requires a valid JWT token.
