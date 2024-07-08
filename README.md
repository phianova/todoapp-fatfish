# todoapp-fatfish
Simple to do list app for technical assessment for Fat Fish Digital

## Setup instructions:
Software:
- Download Android Studio to use this with an Android emulator. Once Android Studio is installed, click "More" > "Virtual Device Manager", and add a new device - I use the Pixel 7 Pro with API 33.
- Development build link is here: https://expo.dev/accounts/phia_nova/projects/app/builds/aa75a012-714e-4062-b242-3ebf1660e0c9
- The API is deployed to Serverless at: https://4wgjp9tm5d.execute-api.eu-west-1.amazonaws.com/dev/
- Run `npm install` in each of /api and /app to download the requisite packages in your local environment.
- The app can be run from within /app using the command `npx expo start` and pressing `a` to run it in your emulator.

## Project plan/starting points:
Tech:
- Setup CRUD API in Node.js/TypeScript with Express/MongoDB
- Set up Jest testing framework
- Set up React Native frontend
- Set up Kinde auth
- Research Redux
- Research Serverless & deploy

Structure:
- To do object should have title, description, due date, created date, priority, completed status
- Components should include todo item, expanded todo item, list container
- Monorepo with /app and /api directories

Desired functionality on top of CRUD:
- Strikethrough effect on completion
- "Today" list
- Colour priority indicators
- Expanded/collapsed Todo items
- Date picker to add due dates in a user-friendly way

## Thoughts on:

### Data storage
I went with a MongoDB database - partly because of familiarity, but partly because I felt the JSON-style data storage would make more sense for the todo objects than a relational database would. However, having wrestled a bit with Mongo's interactions with Serverless, I think on balance I would choose DynamoDB if I did this again!

### Auth
I went with the principle of "never build your own auth" and used Kinde. They have a React Native SDK making integration relatively easy and their service works really well if you have a straightforward setup like this one.

### Automated testing
I used Jest with Supatest for testing.

### Monorepo/separate repos
I went for a monorepo. I think it makes sense to have one repo per product - not one repo for an entire company's activities, but one repo for everything to do with a singular product. This is partly just for "tidiness" - keeping everything in one place, where you need it, to avoid context switching - but also so that changes to one part of the product can easily be tested for any unintended impacts across the whole scope of the product.

### Code structure
I began with the boilerplate Expo app and tweaked the structure to meet my needs. As this was a very basic app, I didn't need some of the functionality therein so I removed it to make the file structure clearer and cleaner. For the backend Express API, I separated out the router from the index and controller to clearly indicate which functionality lay with each stage.
I abstracted out my API client in the frontend to a class constructor, keeping the bulk of the functionality out of my pages/components. 
The component structure is pretty simple - I used a modal to add a new todo item, a container component to produce each list (meaning there's scalability if you wanted to, for example, add filtering and other functionality in future), and a collapsed and expanded todo component. There wasn't really a need for complex navigation components in this case so I kept it very simple. 
If I had prior knowledge of Redux, I would have used it from the start, but I wanted to ensure I had a working app and also gain an understanding of how it differs from standard React, so I started with a basic React Native application and then abstracted out the state management later.

### Code linting
I used ESLint - I think it makes sense for everyone across an organisation to use the same formatter/linter, regardless what that might be. I installed the TypeScript extensions to ensure the linter checked for type safety.


Brief:
Our tech stack is as follows:
● Core
○ Node.js with TypeScript
○ Git Version Control via GitHub
○ Jest
○ ESLint

● Backend
○ Amazon Web Services/Azure
○ Relational and Non-Relational Databases
○ Serverless Framework
○ Headless CMSes like Prismic and Sanity
○ Low-Code/No-Code platforms like Xano

● Frontend
○ React Native for mobile apps on iOS and Android
○ React for web
○ Redux

Using the tech stack described above, produce a simple To Do list project (or similar). 
You are not expected to use the full stack, but it should be written in TypeScript and include the following:
1. CRUD API written in TypeScript that can be deployed via Serverless to AWS
2. React Native mobile app that interacts with your CRUD API, and utilizes Redux state management

We should be able to view your project in a GitHub repository/repositories and be able to deploy and run your code. Please include any instructions for us to do this in a README.md.

We are not judging your UI design skills so don’t worry how it looks, we want to see the components you use for your solution and clean, well structured code.

Remember, your project can be kept very basic! However, bonus points are on offer for either implementing or including your thoughts in your README.md on the following:

● Data storage on both the front and back end. This could be backed by file storage, a non-relational database, secure device storage, in memory stores or anything else that
makes sense
● Authentication between the front and back end
● Automated testing tools: Think Jest. You don't need to build a CI/CD pipeline!
● Monorepo or separate repos
● Project/code structure
● Code Linting