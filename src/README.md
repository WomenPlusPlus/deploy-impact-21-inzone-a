
# Development

## Contents

- [About](#about)
- [Technology stack](#technologyS)
- [Installation](#installation)
- [Offline solution](#offline)
- [How to continue](#future)

## About <a name="about"></a>
Here you will find information for getting started. 

## Technology Stack <a name="technologyS"></a>
To develop the app *spoky* we used:

### Frontend:
- [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) => High Level, Dynamic, Interpreted Language
- [Node.js](https://nodejs.org/en/) => Open source server environment
- [React](https://reactjs.org/) => JavaScript library for building user interfaces
- [React Native](https://reactnative.dev/) => JavaScript framework for building cross-platform apps
- [Expo](https://expo.dev/) => Framework and platform for universal React applications

### Backend:
- [Parse](https://parseplatform.org/) => Open source backend 
</br>You can find more information about *spoky* backend [here](https://github.com/WomenPlusPlus/deploy-impact-21-inzone-a/blob/main/docs/backend/README.md)

## Installation <a name="installation"></a>
To follow the next steps you will need to run the commands in a terminal.

- Install [Node.js](https://nodejs.org/en/). [NPM](https://www.npmjs.com/) will be installed too.
</br>After the installation you can check that it worked with these commands (they will show what version is installed on your machine):
```
node --version
```
```
npm --version
```
- Install [Git](https://git-scm.com/downloads) a version control system. You will need it to clone *spoky* repository from GitHub.

- We used [Expo](https://expo.dev/) so you'll need to install Expo CLI (more information on Expo installation [here](https://docs.expo.dev/get-started/installation/))
```
npm install --global expo-cli
```
- Clone *spoky* repository. You can use the command:
```
git clone https://github.com/WomenPlusPlus/deploy-impact-21-inzone-a.git
```
- The first time that you run the project, you'll have to make sure to copy an hotfix we introduced during development. </br>Navigate to the directory *deploy-impact-21-inzone-a/src* using the terminal and when you are in the directory run the following commands:
```
rm -rf node_modules
```
```
npm install
```
```
cp hotfixes/Parse.js node_modules/parse/lib/react-native/Parse.js
```
```
npm run web
```
- After having  successfully completed the last step, when you want to run the project again is enough to navigate to the directory *deploy-impact-21-inzone-a/src* using the terminal and when you are in the directory run:
```
npm install
```
```
expo start
```
The Metro Bundler will start in your browser and you can now use *spoky* in a web browser. 
</br>To use *spoky* on your phone simply download the [Expo Go](https://expo.dev/client) app and scan the QR code that you see in your terminal or on the Metro Bundler.</br> IMPORTANT: do not close the terminal or the process will be interrupted and you will have to run again *npm install* and *expo start*.

- If you want, you can run *spoky* in an emulator for Android or iOS. You can find more information at the links below:
  - [Android Studio Emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
  - [iOS Simulator](https://docs.expo.dev/workflow/ios-simulator/) (only for macOs)

## Offline solution <a name="offline"></a>
*spoky* is designed to be a tool that can be effectively used in areas where internet connectivity is poor. That is why our solution focused on the possibilities for offline usage. 
</br>We accomplished that by using [AsyncStorage](https://react-native-async-storage.github.io/async-storage/docs/install), an easy to implement module for safely storing data and asynchronously downloading/uploading them.

## How to continue <a name="future"></a>
This is just the beginning for *spoky*. </br>Here are some ideas for the future that we didn't have time to implement:
- complete skip feature to align with design:
   - change color of 'bubbles' with question numbers to red
   - display all skipped questions
- display all the questions that the user hasn't yet answerd (skipped + next)
- add a spinning wheel to clearly indicate to the user that the app is trying to download/upload something from the backend if there is no connection or the backend is not responding
- automatically submit if the time is up
- improve timer alerts at 1 hour, 30 minutes, 10 minutes
- include instructions screen and demo exam



 


 
