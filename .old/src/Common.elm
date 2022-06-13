module Common exposing (Msg(..), changeModeButton, contentFont, footer, header)

import Assets
import Colors
import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Events as Events
import Element.Font as Font
import Html
import Html.Attributes as HtmlAttr
import Html.Events as HtmlEvents


type Msg
    = Resize Int Int Element.Device -- Message for screen resize
    | ChangeColorMode Colors.Mode


contentFont =
    Font.family
        [ Font.typeface "Raleway"
        , Font.sansSerif
        ]


header : Colors.Mode -> Element Msg
header mode =
    Element.row
        [ Element.width fill
        , Element.height (px 75)
        , Background.color <| Colors.getBackground mode
        , contentFont
        , Element.paddingXY 100 0
        ]
        [ changeModeButton mode
        , Element.el
            [ Font.color <| Colors.getForegroundHighlight mode
            , Element.centerX
            , Element.centerY
            ]
            (text "Homepage")
        ]


changeModeButton : Colors.Mode -> Element Msg
changeModeButton mode =
    Element.el
        [ Element.alignLeft
        , Element.pointer
        , Events.onClick <| ChangeColorMode (Colors.invertColorMode mode)
        , Element.centerY
        ]
    <|
        Element.html <|
            Html.img
                [ HtmlAttr.src (Assets.modeAsset mode)
                , HtmlAttr.width 50
                , HtmlAttr.height 50
                ]
                []


footer : Colors.Mode -> Element msg
footer mode =
    Element.el [ Element.width fill, Element.height (px 100), Element.padding 10 ] <|
        Element.paragraph
            [ Element.alignBottom
            , Font.color <| Colors.getForegroundHighlight mode
            , Font.size 15
            , Element.alignLeft
            , contentFont
            ]
            [ Element.el []
                (text "© 2019-2020 Kien Tuong Truong - Website built in Elm ")
            , Element.html <|
                Html.a
                    [ HtmlAttr.href "https://github.com/kientuong114/personal-website"
                    , HtmlAttr.style "color" (Colors.toRgbString <| Colors.getForeground mode)
                    ]
                    [ Html.text "(Source code)" ]
            ]
