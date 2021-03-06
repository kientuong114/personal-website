module Colors exposing (Mode(..), getBackground, getForeground, getForegroundHighlight, getShadow, invertColorMode, toRgbString)

import Element exposing (..)


type Mode
    = Dark
    | Light


gray =
    rgb255 70 70 70


darkGray =
    rgb255 40 40 40


lightGray =
    rgb255 100 100 100


black =
    rgb255 0 0 0


white =
    rgb255 255 255 255


toRgbString color =
    let
        rgbColor =
            toRgb color
    in
    "rgb("
        ++ String.fromInt (round rgbColor.red * 255)
        ++ ","
        ++ String.fromInt (round rgbColor.green * 255)
        ++ ","
        ++ String.fromInt (round rgbColor.blue * 255)
        ++ ")"


invertColorMode : Mode -> Mode
invertColorMode mode =
    case mode of
        Dark ->
            Light

        Light ->
            Dark


getForeground : Mode -> Element.Color
getForeground mode =
    case mode of
        Dark ->
            white

        Light ->
            lightGray


getBackground : Mode -> Element.Color
getBackground mode =
    case mode of
        Dark ->
            darkGray

        Light ->
            white


getForegroundHighlight : Mode -> Element.Color
getForegroundHighlight mode =
    case mode of
        Dark ->
            white

        Light ->
            gray


getShadow : Mode -> Element.Color
getShadow mode =
    case mode of
        Dark ->
            rgba255 0 0 0 0.0

        Light ->
            rgba255 255 255 255 0.4
