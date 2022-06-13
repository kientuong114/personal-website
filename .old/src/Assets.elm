module Assets exposing (modeAsset, socialMediaAssets, socialMediaIcon)

import Colors
import Element exposing (..)
import Html
import Html.Attributes as HtmlAttr
import Html.Events as HtmlEvents


modeAsset mode =
    case mode of
        Colors.Dark ->
            "images/day-and-night.svg"

        Colors.Light ->
            "images/day-and-night_light.svg"


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


socialMediaAssets mode =
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
