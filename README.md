# Trips on Trips
## Kim Blanck and Eric Culley

Brief description: Trip planning board for brainstorming future travel plans and bucket list vacations.

Technologies Used:
- React.js: Used to create a single page application.
- Express.js: Used to build full CRUD.
- MongoDB/Mongoose: Used as the backend database.
- Heroku: Used for app hosting/management.
- jQuery: Used minimally to help control details elements.
- Cloudinary: Used as third party media storage for images uploaded to the app.

Live Site:
http://kim-eric-trips.herokuapp.com

Instructions:
- User can create new trips in the "Add a Trip" box.
- Users can upload images directly from their device without having to use a URL.
- User can view/read the details of their upcoming trip on the home page.
- Users update the details of their trip by clicking on "Edit Trip Details"
- If an input in the "Edit Trip Details" is left unedited, it remains the initial value.
- Users can delete a trip post by clicking "remove" and then confirming their choice on the pop up window.
- Users can leave a comment on a post by entering their name and the comment. The comments are displayed with the most recent ones listed first.

Unfinished ideas:
- Implement a file upload with Cloudinary on the edit/update route as well.
- Use socket.io to show live note updates across all active clients.