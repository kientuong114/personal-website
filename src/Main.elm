module Main exposing (..)

import Browser
import Browser.Events
import Colors
import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Events as Events
import Element.Font as Font
import Homepage
import Html
import Html.Attributes as HtmlAttr
import Html.Events as HtmlEvents


type Msg
    = Resize Int Int Element.Device -- Message for screen resize
    | ChangeColorMode Colors.Mode


type DeviceClass
    = Phone -- Possible devices, used for responsiveness
    | Tablet
    | Desktop
    | BigDesktop


type Orientation
    = Portrait -- Possible orientations
    | Landscape



-- Constant zeroes to be overridden in specific methods


edges =
    { top = 0
    , right = 0
    , bottom = 0
    , left = 0
    }


type alias Flags =
    { width : Int
    , height : Int
    }


type alias Model =
    { size : ( Int, Int ), device : Element.Device, mode : Colors.Mode }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Resize width height device ->
            -- In case of a resize
            ( { model | size = ( width, height ), device = device }
            , Cmd.none
            )

        ChangeColorMode mode ->
            ( { model | mode = mode }
            , Cmd.none
            )


invertColorMode : Colors.Mode -> Colors.Mode
invertColorMode mode =
    case mode of
        Colors.Dark ->
            Colors.Light

        Colors.Light ->
            Colors.Dark


init : Flags -> ( Model, Cmd Msg )
init flags =
    ( Model ( flags.width, flags.height ) (Element.classifyDevice flags) Colors.Dark
    , Cmd.none
    )


view : Model -> Html.Html Msg
view model =
    case model.device.orientation of
        Element.Portrait ->
            Element.layout
                [ height fill
                , width fill
                , Element.inFront <| header model.mode
                ]
                (mobilePageView model.mode (Tuple.second model.size))

        Element.Landscape ->
            Element.layout
                [ height fill
                , width fill
                , Element.inFront <| header model.mode
                , Background.color <| Colors.getBackground model.mode
                ]
                (pageView model.mode (Tuple.first model.size) (Tuple.second model.size))


subscriptions : Model -> Sub Msg
subscriptions model =
    Browser.Events.onResize (\width height -> Resize width height (Element.classifyDevice { width = width, height = height }))


main : Program Flags Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions -- Whenever the browser changes size, call resize
        }


mobilePageView : Colors.Mode -> Int -> Element Msg
mobilePageView mode h =
    column [ height fill, width fill ] [ text "Mobile website in construction!" ]


pageView : Colors.Mode -> Int -> Int -> Element Msg
pageView mode w h =
    column [ height fill, width fill ]
        [ mainContent mode w h ]


getModeAsset mode =
    case mode of
        Colors.Dark ->
            "/images/day-and-night.svg"

        Colors.Light ->
            "/images/day-and-night_light.svg"


header : Colors.Mode -> Element Msg
header mode =
    Element.row
        [ Element.width fill
        , Element.height (px 75)
        , Background.color <| Colors.getBackground mode
        , Homepage.contentFont
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
        , Events.onClick <| ChangeColorMode (invertColorMode mode)
        , Element.centerY
        ]
    <|
        Element.html <|
            Html.img
                [ HtmlAttr.src (getModeAsset mode)
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
            , Homepage.contentFont
            ]
            [ Element.el []
                (text "© 2019-2020 Kien Tuong Truong - Website built in Elm ")
            , Element.el [] <| text "(Source code here)"
            ]


mainContent : Colors.Mode -> Int -> Int -> Element msg
mainContent mode long short =
    Element.column [ scrollbarY, width fill ]
        [ Element.el [ Element.height (px 75) ] Element.none -- Padding for where the header should be
        , Element.el [ Element.height (px 75) ] Element.none -- Padding
        , Homepage.content mode long
        , Element.el [ Element.height (px 120) ] Element.none -- More padding
        , footer mode
        ]
