# Getting Started with the App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).\
Using the api calls from this as the backend - https://photo-generator-7si8.onrender.com/ \
Backend code : https://github.com/pooja-thalur/photo-generator 

The application is deployed and live at : https://photo-gallery-explorer.vercel.app/

1. git clone [https://github.com/pooja-thalur/photo-gallery-explorer.git]
2. Install dependencies: npm install
3. Start the server: npm start

# Architectural Choices
1. React with react-window for efficient list virtualization and performance on large datasets
2. Context API to manage app-wide state (photos, filters, pagination)
3. Custom hooks (useGalleryPage, etc.) to separate data logic from UI components
4. Debounced infinite scrolling at 75–80% threshold to prefetch large lists smoothly
5. Modular structure with clear separation of components, pages, and hooks

# Known Limitations
1. Scroll logic may still call loadMore() multiple times on extremely fast scrolls
2. No persistent caching, the page refresh resets the photo list
3. Need to make the application responsive

# Next Three Improvements for Production
1. Fix the scroll issue on fast scrolls.
2. Try out the SWR for data caching
3. Implement E2E and unit testing 
