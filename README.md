# StorMind (Space-Repeition-App)

## Description
This is a mobile-app for space-repetition learning.  
The app is built using Ionic React. Currently, it includes two types of flash cards: QA(Question & Answer) and MCQ(Multiple Choice Question).  
When the user receives a notification, he or she will tap the notification and jump to the cards directly and start reviewing. 

**[<ins>Report Bug</ins>](https://github.com/educational-technology-collective/Space-Repetition-Ionic/issues?q=is%3Aopen+is%3Aissue+label%3Abug)**  |  **[<ins>Feedback for Features</ins>](https://github.com/educational-technology-collective/Space-Repetition-Ionic/issues?q=is%3Aopen+is%3Aissue+label%3Aenhancement)**

—— Haytham Tang

## Set-Up
**Ionic**: To test the app in your local environment, first follow the [ionic set-up](https://ionicframework.com/docs/intro/environment) to make sure you have installed the packages for **ionic** and **node.js**.

**Repo**: Clone the Repo into your local directory by running
```
git clone https://github.com/educational-technology-collective/Space-Repetition-Ionic.git
```

**Install Haptics Plugin**: Haptis Plugin Provided by Capacitor for physical feedback(shaking effect)
```
cd Space-Repetition-Ionic
npm install @capacitor/haptics
npx cap sync
```

**Install Auth0 SDK**: Used for authentication
```
cd Space-Repetition-Ionic
npm install @auth0/auth0-react
```

**Install Capacitor Plugins**: Used for running auth0
```
cd Space-Repetition-Ionic
npm install @capacitor/browser @capacitor/app
```
## Run
After you have set up the repo in your local directory. Run the following commands to try the app:
```
cd Space-Repetition-Ionic
ionic serve
```
It should automatically direct you to a local page on your default browser. You can also copy the link into a browser you like. Then use the developer tool to choose your device you can test on web(iPhone 12 Pro is used for development)

## Run on Simulators
If you want to run the app on Ios/Android Simulators, make sure you have the emulators/devices installed on your computer.
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

## Run on Physical Devices
**Ios**: Connect your devices to the computer. Use Xcode to build and run. You will need an Apple ID account and enable Developer Mode on your phone.

**Android**: After you build your app on Android Studio. Go to ```Build``` -> ```Generate Signed Bundle/APK``` -> ```APK```. Generate an APK file and install it onto your device.

## Interact with Cards

***All cards follow the structure of ```Think``` -> ```Tap``` -> ```Swipe```***

### Think: 
You will be presented with a card (**QA / MCQ**). 

If it's a **QA-Card**, you will be given a question. You will self-evaluate your knowledge retention about QA-Cards. 

If it's an **MCQ-Card**, you will be given a question with 4 options displayed at the bottom. You will have a tested evaluation(by clicking a choice) and self-evaluation(by swiping).

### Tap:
For a **QA-Card**, you can tap the QA Card itself to flip and see the question with the answer. 

For an **MCQ-Card**, you can tap the card without selecting any choices to flip and reveal the correct choice. You can also select the choice you think is correct, and the card will highlight the correct choice with green background color and the incorrect one with red background color.

### Swipe:

#### Before Tapping/Clicking Choice:
* ```Swipe Down```: Indicates that you don't want this card to show up anymore.

#### After Tapping/Clicking Choice:
* ```Swipe Right```: Indicates that you know and are positive about this card.

* ```Swipe Left```: Indicates that you don't know and are negative about this card.

* ```Swipe Up```: Indicates that you want one more card of the same concept.

* ```Swipe Down```: Indicates that you don't want this card to show up anymore in future reviews(because the card is poor designed or you know this fairly well).

## Contact
Yunxuan "Haytham" Tang —— [yunxuant@umich.edu](mailto:yunxuant@umich.edu)

## Acknowledgement
* [Prof. Christopher Brooks —— University of Michigan School of Information](https://www.si.umich.edu/people/christopher-brooks)
* [Educational Technology Collective —— University of Michigan School of Information](https://edtech.labs.si.umich.edu/)
