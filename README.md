# todoapp-fatfish
Simple to do list app for technical assessment for Fat Fish Digital

## Setup instructions:
- Software needed to run locally connecting to live Serverless API deployment: Android Studio (or other emulator), Node, IDE (I used VSCode)
- Download Android Studio to use this with an Android emulator. Once Android Studio is installed, click "More" > "Virtual Device Manager", and add a new device - I use the Pixel 7 Pro with API 33.
- The development build link is here: https://expo.dev/accounts/phia_nova/projects/app/builds/49b66360-4705-489f-a111-10a0089187fd, please click this link and download the build to run it on your emulator.
- The API is deployed to Serverless at: https://4wgjp9tm5d.execute-api.eu-west-1.amazonaws.com/dev/, which the app should already be configured to call.
- Run `npm install` in each of `/api` and `/app` to download the requisite packages in your local environment.
- The app can be run from within `/app` using the command `npx expo start` and pressing `a` when prompted to run it in your emulator.
- The Clerk publishable key SHOULD be build into the development build env, but just in case it doesn't pull through when run locally (i.e. you get the error "Missing Publishable Key"), please create a `.env` file in your `/app` directory and add the following to ensure the auth works as expected:
`EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_bWFpbi1zbmFrZS0xOC5jbGVyay5hY2NvdW50cy5kZXYk`

## Project overview:
Tech:
- CRUD API in Node.js/TypeScript with Express/MongoDB
- React Native app with Expo in TypeScript
- Jest testing framework with Supertest
- Redux state management
- Serverless deployment
- Clerk auth

Structure:
- Monorepo with /app and /api directories - [x]
- To do object should have title, description, due date, created date, priority, completed status - [x]
- Components should include todo item, expanded todo item, list container - [x]
- User should be able to sign in and view their own todos but not others' - [x]
- User email should be added in both Clerk and MongoDB on sign up - [x]
- User should be able to add todos - [x]
- User should be able to "complete" todos by selecting checkbox and this should reflect in backend - [x]
- User should be able to edit and delete todos - [x]
- Todo state in frontend should be kept up to date with backend - [x]

Nice-to-have functionality:
- Strikethrough effect on completion - [x]
- "Today" list - [x]
- Colour priority indicators - [x]
- Priority selector for "low/medium/high" instead of numbers 1-3 - [ ]
- Expanded/collapsed Todo items - [x]
- Date picker to add due dates in a user-friendly way - [ ]

## Thoughts on:

### Data storage
I went with a MongoDB database - partly because of familiarity, but partly because I felt the JSON-style data storage would make more sense for the todo objects than a relational database would. 
However, having wrestled a bit with Mongo's interactions with Serverless, I think on balance I would choose DynamoDB if I did this again!
This was also my first time using Redux for state management. I think had I fully understood its capabilities from the start I would have streamlined my project a bit more in terms of how my API calls were made to update the state.

### Auth
I went with the principle of "never build your own auth" and started out trying to use Kinde, which I've used before. They have a React Native SDK and their prebuilt sign-up/sign-in pages work really well if you have a straightforward setup like this one. However, it seems their React Native/Expo SDKs are experiencing an ongoing bug at the moment, and they're soon to release a new Expo version. Given this (and the fact I immediately encountered said bug), I quickly got to grips with Clerk - which I actually found to be a lot better documented and still very user-friendly.

### Automated testing
I set up Jest to create snapshot tests and unit tests for my frontend components. However, I unfortunately ran into an issue with my Jest configuration such that I wasn't able to get my frontend testing suite to work in time. It seems like a well-documented issue but there should be a solution (see here, and other linked posts on StackOverflow etc: https://github.com/expo/expo/issues/11012), I just unfortunately didn't have time to find it!
My attempt at creating frontend tests can be found on the `6-frontend-tests` branch in the repository for reference - it involved changing a fair bit of the Redux code structure so I didn't feel merging it would be a good idea given the test suite wasn't working.
I created some tests for my API endpoints with Supertest in api/index.test.ts. This suite of tests can be run in the /api directory with `npm run test`. Again, had I known how temperamental Mongoose could be with Jest, I would perhaps have opted for DynamoDB data storage instead.

### Monorepo/separate repos
I went for a monorepo. I think it makes sense to have one repo for everything to do with a singular product. This is partly just for "tidiness" - keeping everything in one place to avoid context switching - but also so that changes to one part of the product can easily be tested for any unintended impacts across the whole scope of the product.

### Code structure
I began with the boilerplate Expo app and tweaked the structure to meet my needs. As this was a very basic app, I didn't need some of the functionality therein so I removed it to make the file structure clearer and cleaner. For the backend Express API, I separated out the router from the index and controller to clearly indicate which functionality lay with each stage.
I abstracted out my API client in the frontend to a class constructor, keeping the bulk of the functionality out of my pages/components. 
The component structure is pretty simple - I used a modal to add a new todo item, a container component to produce each list (meaning there's scalability if you wanted to, for example, add filtering and other functionality in future), and a collapsed and expanded todo component. There wasn't really a need for complex navigation components in this case so I kept it very simple. 
If I had prior knowledge of Redux, I would have used it from the start, but I wanted to ensure I had a working app and also gain an understanding of how it differs from standard React, so I started with a basic React Native application and then abstracted out the state management later.

### Code linting
I used ESLint - I think it makes sense for everyone across an organisation to use the same formatter/linter, regardless what that might be. I installed the TypeScript extensions to ensure the linter checked for type safety.


## The assessment task is below for reference.
*Assessment Brief:*
*Our tech stack is as follows:*
*● Core*
*○ Node.js with TypeScript*
*○ Git Version Control via GitHub*
*○ Jest*
*○ ESLint*

*● Backend*
*○ Amazon Web Services/Azure*
*○ Relational and Non-Relational Databases*
*○ Serverless Framework*
*○ Headless CMSes like Prismic and Sanity*
*○ Low-Code/No-Code platforms like Xano*

*● Frontend*
*○ React Native for mobile apps on iOS and Android*
*○ React for web*
*○ Redux*

*Using the tech stack described above, produce a simple To Do list project (or similar). *
*You are not expected to use the full stack, but it should be written in TypeScript and include the following:*
*1. CRUD API written in TypeScript that can be deployed via Serverless to AWS*
*2. React Native mobile app that interacts with your CRUD API, and utilizes Redux state management*

*We should be able to view your project in a GitHub repository/repositories and be able to deploy and run your code.* *Please include any instructions for us to do this in a README.md.*

*We are not judging your UI design skills so don’t worry how it looks, we want to see the components you use for your solution and clean, well structured code.*

*Remember, your project can be kept very basic! However, bonus points are on offer for either implementing or including your thoughts in your README.md on the following:*

*● Data storage on both the front and back end. This could be backed by file storage, a non-relational database, secure device storage, in memory stores or anything else that makes sense*
*● Authentication between the front and back end*
*● Automated testing tools: Think Jest. You don't need to build a CI/CD pipeline!*
*● Monorepo or separate repos*
*● Project/code structure*
*● Code Linting*