# StorMind (Space-Repeition-App)

## Description
This is a mobile-app for space-repetition learning. The app is built using Ionic React. Currently, it includes two types of cards: QA(Question & Answer) and MCQ(Multiple Choice Question).

—— Haytham Tang

## Set-Up
**Ionic**: To test the app in your local environment, first follow the [ionic set-up](https://ionicframework.com/docs/intro/environment) to make sure you have installed the packages for ionic and node.js.

**Repo**: Clone the Repo into your local directory by running
```
git clone https://github.com/educational-technology-collective/Space-Repetition-Ionic.git
```

**Install Haptics Plugin**: Haptis Plugin Provided by Capacitor for physical feedback
```
npm install @capacitor/haptics
npx cap sync
```
## Run
After you have set up the repo in your local directory. Run the following commands to try the app:
```
cd Space-Repetition-Ionic
ionic serve
```
It should automatically direct you to a local page on your default browser. You can also copy the link into a browser you like. Then use the developer tool to choose your device you can test on web(iPhone 12 Pro is used for development)

## Run on Simulators
If you want to run the app on Ios/Android Simulators, make sure you have the emulators/devices installed in your computer.
Then, run the following commands:
```
ionic capacitor run [ios/android]
```
You will be prompted to choose a device.

### XCode: If you want to build the project on Xcode
```
npx cap open ios
```
After that, choose a device/ios and run on the simulator.
Everytime you make a change to the code. You need to run the following command first before reopening Xcode:
```
ionic capacitor build ios
```
### Android Studio: If you want to build the project on Android Studio
(P.S: Android SDK 33 is the latest supported version)
```
npx cap open android
```
After that, choose a device/ios and run on the simulator.
Everytime you make a change to the code. You need to run the following command first before reopening Xcode:
```
ionic capacitor build android
```

## Run on Devices
**Ios**: Connect your devices to the computer. Use Xcode to build and run. You will need a Apple ID account and enable Developer Mode on your phone.

**Android**: After you build your app on Android Studio. Go to ```Build``` -> ```Generate Signed Bundle/APK``` -> ```APK```. Generate an APK file and install it onto your device.

## Interact with Cards
### QA-Cards:
You can click the QA card itself to flip between the question and answer sides. Then, you can do the following gestures with different indications and move on to next card:

* ```Swipe Right```: Indicates that you know and are positive about this card

* ```Swipe Left```: Indicates that you don't know and are negative about this card

* ```Swipe Up```: Indicates that you want one more card of same concept

* ```Swipe Down```: Indicates that you don't want this card to show up anymore in future reviews

### MCQ-Cards:
You will be given four options for a multiple choice question. You will click the choice you think is correct, and the card will highlight the correct choice with green background color and the incorrect choice with red backrgound color, covering all the other choices. The swiping gestures will be different from the QA Cards:

#### Before Clicking Choice:

* ```Swipe Right```: Indicates that you know and are positive about this card

* ```Swipe Left```: Indicates that you don't know and are negative about this card

* ```Swipe Down```: Indicates that you don't want this card to show up anymore

#### After Clicking Choice: 

* ```Swipe Right```: Indicates that you know and are positive about this card

* ```Swipe Left```: Indicates that you don't know and are negative about this card

* ```Swipe Up```: Indicates that you want one more card of same concept

* ```Swipe Down(Only if you get Correct)```: Indicates that you don't want this card to show up anymore

## Contact
Yunxuan "Haytham" Tang —— [yunxuant@umich.edu](mailto:yunxuant@umich.edu)

## Acknowledgement
* [Prof. Christopher Brooks —— University of Michigan School of Information](https://www.si.umich.edu/people/christopher-brooks)
* [Educational Technology Collective —— University of Michigan School of Information](https://edtech.labs.si.umich.edu/)
