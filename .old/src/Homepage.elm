module Homepage exposing (..)

import Assets
import Colors
import Common
import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font
import Html
import Html.Attributes as HtmlAttr


edges =
    { top = 0
    , right = 0
    , bottom = 0
    , left = 0
    }


content : Colors.Mode -> Int -> Element msg
content mode width =
    Element.column
        [ Element.centerX
        , Element.width fill
        ]
        [ Element.row
            [ Element.width fill
            , Element.paddingEach
                { edges
                    | left = floor (toFloat width / 6)
                    , right = floor (toFloat width / 6)
                }
            , Element.spaceEvenly
            , Element.centerX
            ]
            [ Element.el [] <|
                helloText mode
            , Element.el
                [ Element.behindContent <|
                    Element.el
                        [ Border.color <| Colors.getForegroundHighlight mode
                        , Border.width 3
                        , Element.width (px 300)
                        , Element.height (px 300)
                        , Border.rounded 150
                        , Element.moveRight 150
                        , Border.dotted
                        ]
                        Element.none
                ]
              <|
                Element.image
                    [ Element.centerX
                    , Element.centerY
                    , Element.width (px 300)
                    , Element.height (px 300)
                    , Border.rounded 150
                    , Border.width 5
                    , Border.color <| Colors.getForegroundHighlight mode
                    , Element.clip
                    ]
                    { src = "images/propic.jpg"
                    , description = "Kien Tuong Truong"
                    }
            ]
        , Element.el
            [ Element.height (px 150) ]
            Element.none
        , Element.el [ Element.centerX ] <| links mode
        ]


helloText : Colors.Mode -> Element msg
helloText mode =
    Element.textColumn
        [ spacing 20
        , Common.contentFont
        ]
        [ el [ Font.size 75, Font.bold, Font.color (Colors.getForegroundHighlight mode) ]
            (text "Hi! :)")
        , Element.paragraph
            [ Font.color (Colors.getForeground mode) ]
            [ el []
                (text "I'm ")
            , el [ Font.bold ]
                (text "Kien Tuong Truong")
            , el []
                (text ", a CyberSecurity MSc. student at ETH Zurich with too many interests to list (or to pursue) them all.")
            ]
        , Element.paragraph
            [ Font.color (Colors.getForeground mode) ]
            [ el [] (text "In the future you may find a selection of those on this website, such as music (I have a band called ")
            , el [ Font.bold ] (text "Eigen")
            , el [] (text "), programming (In some kind of hipster-like language, probably) and more.")
            ]
        , el [ Font.italic, Font.color <| Colors.getForeground mode ]
            (text "Over-engineering solutions for the sake of elegance since 1998")
        ]


links : Colors.Mode -> Element msg
links mode =
    Element.textColumn
        [ spacing 50
        , Common.contentFont
        ]
        [ Element.el
            [ Font.bold
            , Font.color <| Colors.getForeground mode
            , Font.size 30
            ]
            (text "Other places in which you can find me:")
        , Element.row
            [ Element.spaceEvenly ]
          <|
            List.map Assets.socialMediaIcon (Assets.socialMediaAssets mode)
        ]
