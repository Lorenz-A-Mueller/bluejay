# BlueJay Premium

</br>

### Final Project for UpLeveled Bootcamp, Vienna

<br/>
A full-scale customer-support-system for "premium" passengers of the fictional airline "BlueJay". Customers can use the mobile app to get in touch with customer support; airline staff can log-in to the help-desk web-app and interact with tickets issued by customers.

</br>
</br>

- Help-Desk-App (Next.js):  
  https://bluejay-helpdesk.herokuapp.com/
- Mobile-App (React Native with Expo):  
  https://expo.dev/@lorenz-arthur/bluejay-premium-app
- API (GraphQL, Apollo-Server-Express):  
  https://bluejay-api.herokuapp.com/graphql

### Go to

[Gallery](#gallery)
<br/>
[Try it out yourself](#try-it-out-yourself)
<br/>
[Functionalities](#functionalities)
<br/>
[Technologies](#technologies)

<br />

### Gallery

<br />

- Help-Desk-App

<br/>

![landing page - help-desk-app](screenshots/screenshot_1.png)

<br />

![tickets page - help-desk-app](screenshots/screenshot_2.png)

<br />

![tickets page wit opened ticket- help-desk-app](screenshots/screenshot_3.png)

<br />

![tickets report page - help-desk-app](screenshots/screenshot_4.png)

<br />

- Mobile App

<br />

<p float="left">

<img src="screenshots/mobile_1.jpg" alt="splash-screen - mobile app" width="150"/>
<img src="screenshots/mobile_2.jpg" alt="log-in-screen - mobile app" width="150"/>
<img src="screenshots/mobile_3.jpg" alt="main-screen - mobile app" width="150"/>
<img src="screenshots/mobile_4.jpg" alt="open correspondence- mobile app" width="150"/>

</p>

<br />

- Data-Base Schema - drawSQL

<br />

<img src="screenshots/drawsql_1.png" alt="open correspondence- mobile app"/>

<br />

- Wire-Frames (example) - Figma

<br />

<img src="screenshots/figma_1.png" alt="open correspondence- mobile app" />

<br />

- Functionality-Map - Miro

<br />

<img src="screenshots/miro_1.png" alt="open correspondence- mobile app" />

<br />

- System Architecture - Excalidraw

<br />

<img src="screenshots/excalidraw_1.png" alt="open correspondence- mobile app" />

<br />

### Try it out yourself

<br/>

- Open the help-desk app (https://bluejay-helpdesk.herokuapp.com) as well as the API (bluejay-api.herokuapp.com/graphql) (in order to "wake up" the API server) - this may take a moment.
  - Log in using Employee ID _"00001"_ and Password _"JenniferTestPassword1"_
  - You are now logged in as "Jennifer" with admin-rights
  - See tickets, click on any to write responses, close them, delete them, assign them to team members or change their priority status
  - Try out the various filter-methods in the sidebar or above
  - Click on the pie-chart icon on the left to inspect ticket report data, change the time window with the calendar functionality
  - Log out and log in again, using Employee ID _"00002"_ and Password _"JohnTestPassword1"_
  - You are now logged in as "John" without admin-rights
  - See only tickets assigned to John, missing the admin functionalities
- Register at EXPO and download the Expo mobile app (scan the QR code) (https://expo.dev/@lorenz-arthur/bluejay-premium-app) to your phone
  - Create a new user by following the link beneath the log-in
  - Log in with your newly created e-mail and password
  - Press _Contact_, then _Messages_
  - Create a new message and press send
  - You can now go back to the help-desk app (see instructions above) and inspect the newly created ticket, send a response there and re-inspect that response in the Expo app.
    </br>
    </br>

### Functionalities

</br>

- Help-Desk Web-App

  - Cookie-based employee-authentication (log-in)
  - Authorization (admin-rights)
  - Inspect tickets
  - Filter tickets (status, category, urgency,only unassigned, etc.)
  - Admin: assign individual tickets or change urgency
  - Close, delete, reopen tickets
  - Admin: ticket-report-page: inspect information about all tickets issued in a given time-period (that can be adjusted)

  </br>

- Mobile App
  - Cookie-based customer-authentication (log-in / register)
  - Send a new message (create a ticket)
  - Choose a category for the new ticket and a title
  - Respond within the opened ticket
  - Notification on the button "Contact", indicating that the customer has received a message from the airline staff but did not yet respond

</br>

### Technologies

</br>

- Help-Desk Web-App
  - Typescript
  - Next.js
  - Emotion (CSS-in-JS)
  - Jest (unit testing)
  - Cypress (E2E-testing)

</br>

- Mobile App
  - React Native
  - Developed with Expo

</br>

- API
  - GraphQL
  - Apollo-Server
  - Express
  - Node.js
  - PostgreSQL

</br>

- Using Yarn Workspaces (Monorepo)
