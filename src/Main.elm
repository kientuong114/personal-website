module Main exposing (..)

import Browser
import Browser.Events
import Colors
import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font
import Homepage
import Html


type Msg
    = Resize Int Int Element.Device -- Message for screen resize


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


init : Flags -> ( Model, Cmd Msg )
init flags =
    ( Model ( flags.width, flags.height ) (Element.classifyDevice flags) Colors.Light
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
                (pageView model.mode (Tuple.second model.size))


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


pageView : Colors.Mode -> Int -> Element Msg
pageView mode h =
    column [ height fill, width fill ]
        [ mainContent mode h ]


header : Colors.Mode -> Element msg
header mode =
    Element.el
        [ Element.width fill
        , Element.height (px 75)
        , Background.color <| Colors.getShadow mode
        , Border.shadow
            { offset = ( 0, 0 )
            , size = 0.5
            , blur = 10
            , color = rgb255 10 10 10
            }
        ]
        (Element.el [ Element.centerX, Element.centerY ] (text "Homepage"))


footer : Colors.Mode -> Element msg
footer mode =
    Element.el [ Element.width fill, Element.height (px 150), Element.padding 20 ]
        (Element.el
            [ Element.alignLeft
            , Element.alignBottom
            , Font.color <| Colors.getForegroundHighlight mode
            ]
            (text "© 2019-2020 Kien Tuong Truong - Website built in Elm (source)")
        )


mainContent : Colors.Mode -> Int -> Element msg
mainContent mode short =
    Element.column [ scrollbarY, width fill ]
        [ Element.el [ Element.height (px 75) ] Element.none -- Padding for where the header should be
        , Element.el [ Element.height (px 150) ] Element.none -- Padding
        , Homepage.content mode short
        , footer mode
        ]
