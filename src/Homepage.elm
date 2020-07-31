module Homepage exposing (..)

import Colors
import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font


edges =
    { top = 0
    , right = 0
    , bottom = 0
    , left = 0
    }


content : Colors.Mode -> Int -> Element msg
content mode short =
    Element.row
        [ Element.width fill
        , Element.paddingEach { edges | left = short // 2, right = short // 2 }
        , Element.spaceEvenly
        , Element.centerX
        ]
        [ Element.el [] <| helloText mode
        , Element.el [] (text "placeholder for img")
        ]


helloText : Colors.Mode -> Element msg
helloText mode =
    Element.textColumn [ spacing 20 ]
        [ el [ Font.bold, Font.color (Colors.getForegroundHighlight mode) ]
            (text "Hi!")
        , Element.paragraph
            [ Font.color (Colors.getForeground mode) ]
            [ el [ Font.italic ] (text "My name is Kien Tuong Truong!") ]
        ]
