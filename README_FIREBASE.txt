VehicleVerse Firebase Edition
==========================

Changes made:
- Added js/firebase-config.js using the Firebase Web configuration you supplied.
- Updated js/script.js so enquiry submissions are saved to Firestore collection "enquiries".
- Updated enquiry.html to submit through JavaScript (removed PHP form action).
- Updated enquiries.html to load the shared JavaScript as an ES module.
- Displays visible success/error status and only clears the form after Firestore confirms save.

IMPORTANT: Run this website through a local web server (VS Code Live Server) or Firebase Hosting.
Do not open HTML files directly with file://.

Firestore Rules currently discussed in your Firebase console allow CREATE only and deny READ/DELETE.
That is safer for customer personal data. Therefore the Saved Enquiries page will not be able to
show or delete customer records until we add Firebase Authentication and secure admin access.
Do not make read/delete public for a real site because enquiries contain names, emails and phone numbers.

Firebase Hosting deployment (GitHub workflow):
1. Create a GitHub repository and upload the contents inside VehicleVerse_Modified (not the outer folder).
2. In Firebase Console, open Build > Hosting > Get started. Or install Firebase CLI:
   npm install -g firebase-tools
3. In VS Code terminal inside the project folder run:
   firebase login
   firebase init hosting
   (select existing project vehicleverse-1123d; public directory = .; configure as single-page app = No;
    do not overwrite existing index.html)
4. Create firebase.json as:
   {
     "hosting": {
       "public": ".",
       "ignore": ["firebase.json", ".*", "node_modules/**", "README*", "database.sql", "*.php"],
       "headers": [{"source":"/**/*.@(js)","headers":[{"key":"Cache-Control","value":"no-cache"}]}]
     }
   }
5. Deploy with: firebase deploy --only hosting
6. Firebase gives a public URL such as https://vehicleverse-1123d.web.app

For GitHub automatic deployment, Firebase Console > Hosting > connect GitHub repository,
select the repo/branch and follow the setup wizard. Ensure the site root is the folder
containing index.html, css/, js/, and images/.
