module Homepage exposing (..)

import Colors
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


contentFont =
    Font.family
        [ Font.typeface "Raleway"
        , Font.sansSerif
        ]


content : Colors.Mode -> Int -> Element msg
content mode width =
    Element.column
        [ Element.centerX ]
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
        , contentFont
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


assetsDark =
    [ ( "images/github.svg", "https://github.com/kientuong114" )
    , ( "images/twitter.svg", "https://twitter.com/kientuong114" )
    , ( "images/linkedin.svg", "https://www.linkedin.com/in/kien-tuong-t-430306102/" )
    ]


assetsLight =
    [ ( "images/github_light.svg", "https://github.com/kientuong114" )
    , ( "images/twitter_light.svg", "https://twitter.com/kientuong114" )
    , ( "images/linkedin_light.svg", "https://www.linkedin.com/in/kien-tuong-t-430306102/" )
    ]


getAssets mode =
    case mode of
        Colors.Dark ->
            assetsDark

        Colors.Light ->
            assetsLight


socialMediaIcon : ( String, String ) -> Element msg
socialMediaIcon t =
    Element.html <|
        Html.a [ HtmlAttr.href <| Tuple.second t ]
            [ Html.img
                [ HtmlAttr.src <| Tuple.first t
                , HtmlAttr.width 50
                , HtmlAttr.height 50
                ]
                []
            ]


links : Colors.Mode -> Element msg
links mode =
    Element.textColumn
        [ spacing 50
        , contentFont
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
            List.map socialMediaIcon (getAssets mode)
        ]
