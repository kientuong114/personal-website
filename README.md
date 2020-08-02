# Personal Website

My personal website, written in Elm.

## Todo list

- Deploy to a server
- Continuous Deploy w/ TravisCI
- Responsive design
- Other pages

## Build

1. [https://guide.elm-lang.org/install/elm.html](Install Elm)
2. Clone this repository and move to the root directory
```
git clone https://github.com/kientuong114/personal-website.git && cd personal-website
```
3. To generate the javascript file from source, use the following command
```
elm make src/Main.elm --output elm.js
```
4. Open `index.html` in a browser or, if you prefer, in `elm reactor`
