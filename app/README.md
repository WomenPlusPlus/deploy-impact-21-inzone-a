
# Development

## Contents

- [About](#about)
- [Technology stack](#technologyS)
- [Installation](#installation)

## About <a name="about"></a>
Here you will find information for getting started. 

## Technology Stack <a name="technologyS"></a>
To develop the app *spoky* we used:

### Frontend:
- [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) => High Level, Dynamic, Interpreted Language
- [Node.js](https://nodejs.org/en/) => Open sorce server environment
- [React](https://reactjs.org/) => JavaScript library for building user interfaces
- [React Native](https://reactnative.dev/) => JavaScript framework for building cross-platform apps
- [Expo](https://expo.dev/) => Framework and platform for universal React applications

### Backend:
- [Parse](https://parseplatform.org/) => Open source backend 
</br>You can find more information about *spoky* backend [here](https://github.com/WomenPlusPlus/deploy-impact-21-inzone-a/tree/main/backend)

## Installation <a name="installation"></a>
To follow these steps you will need to run the commands in a terminal.

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
-Navigate to the directory *deploy-impact-21-inzone-a/app* using the terminal and when you are in the directory run:
```
npm install
```
```
expo start
```
The Metro Bundler will be started in your browser and you can now use *spoky* in a web browser or on your phone simply by downloading the [Expo Go](https://expo.dev/client) app and scanning the QR code you see in your terminal or on the Metro Bundler. IMPORTANT: do not close the terminal or the process will be interrupted and you will have to run again npm install and expo start.

- If you want, you can run *spoky* on an emulator for Android or iOS. You can find detailed information at the links below:
  - [Android Studio Emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
  - [iOS Simulator](https://docs.expo.dev/workflow/ios-simulator/) (only for macOs)



 


 
