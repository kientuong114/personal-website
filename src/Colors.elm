module Colors exposing (Mode(..), getBackground, getForeground, getForegroundHighlight, getShadow)

import Element exposing (..)


type Mode
    = Dark
    | Light


gray =
    rgb255 50 50 50


lightGray =
    rgb255 100 100 100


black =
    rgb255 0 0 0


white =
    rgb255 255 255 255


getForeground : Mode -> Element.Color
getForeground mode =
    case mode of
        Dark ->
            white

        Light ->
            gray


getBackground : Mode -> Element.Color
getBackground mode =
    case mode of
        Dark ->
            gray

        Light ->
            white


getForegroundHighlight : Mode -> Element.Color
getForegroundHighlight mode =
    case mode of
        Dark ->
            white

        Light ->
            black


getShadow : Mode -> Element.Color
getShadow mode =
    case mode of
        Dark ->
            rgba255 0 0 0 0.4

        Light ->
            rgba255 255 255 255 0.4
