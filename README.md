# GitHub Codespaces ♥️ React

Welcome to your shiny new Codespace running React! We've got everything fired up and running for you to explore React.

You've got a blank canvas to work on from a git perspective as well. There's a single initial commit with the what you're seeing right now - where you go from here is up to you!

Everything you do here is contained within this one codespace. There is no repository on GitHub yet. If and when you’re ready you can click "Publish Branch" and we’ll create your repository and push up your project. If you were just exploring then and have no further need for this code then you can simply delete your codespace and it's gone forever.

This project was bootstrapped for you with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

We've already run this for you in the `Codespaces: server` terminal window below. If you need to stop the server for any reason you can just run `npm start` again to bring it back online.

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) in the built-in Simple Browser (`Cmd/Ctrl + Shift + P > Simple Browser: Show`) to view your running application.

Made by NAMAN
https://www.github.com/namannangia

Code logics shortened using AI after proper testing

WORKING MECHANISM

1.  A 300x300 CANVAS IS DRAWN
2.  2 spacing lines horizontally with 100px margin are added using makeBoard function
3.  2 spacing lines vertically with 100px margin are added using makeBoard function
4.  Ranges are specified mapping to 9 different imaginary boxes where symbols will be drawn using drawSymbol function
5.  The draw symbol function checks if it is turn of X or 0 to play and draws symbols accordingly
6.  On Every symbol drawn, a counter is incremented and another function constantly checks for winning combinations
7.  If any combination is found, games stops, overlay is displayed with winning player info along with PLAY AGAIN button
8.  UI indications for the player expected to move that turn
9.  If 9 tries are reached, game ends and a Draw(game Tie) is considered final
10. UI Indications to prevent double entry on a pre-filled box
11. Enteries are stored as a 9-character string in a React state named "Record" starting 'a' to 'i'
12. each digit represents a box starting from zero from top left to 8 in bottom right
13. This string is then processed to find winning combination with 0 marked as Circle or Player 2 and 1 as Cross or Player 1
14. After game ends, resetGame() function can be called that clears the canvas and re-draws the markings and resets all states to default
