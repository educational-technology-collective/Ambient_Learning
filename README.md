# Space-Repetition-App

## Description
This is a mobile-app for space-repetition learning. The app is built using Ionic React. Currently, it includes two types of cards: QA(Question & Answer) and MCQ(Multiple Choice Question).

--- Haytham Tang
## Set-Up
**Ionic**: To test the app in your local environment, first follow the [ionic set-up](https://ionicframework.com/docs/intro/environment) to make sure you have installed the packages for ionic and node.js.

**Repo**: Clone the Repo into your local directory by running
```
$ git clone https://github.com/educational-technology-collective/Space-Repetition-Ionic.git
```
## Run
After you have set up the repo in your local directory. Run the following commands to try the app:
```
$ cd Space-Repetition-Ionic
$ ionic serve
```
It should automatically direct you to a local page on your default browser. You can also copy the link into a browser you like. Then use the developer tool to choose your device you can test on web (iPhone 12 Pro is used for development)
## Run on Simulators
If you want to run the app on Ios/Android Simulators, make sure you have the emulators/devices installed in your computer.
Then, run the following commands:
```
$ ionic capacitor run [ios/android]
```
You will be prompted to choose a device.

### XCode: If you want to build the project on Xcode
```
$ npm cap open ios
```
After that, choose a device/ios and run on the simulator.
Everytime you make a change to the code. You need to run the following command first before reopening Xcode:
```
$ ionic capacitor build ios
```
