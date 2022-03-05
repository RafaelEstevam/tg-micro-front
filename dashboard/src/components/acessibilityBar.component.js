import react, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Brush, TextFormat, Brightness6, Brightness1 } from '@material-ui/icons';
import { IconButton, Tooltip } from '@material-ui/core';

const StyledAccessibilityBar = styled('div')`
    width: 100%;
    display: flex;
    max-width: max-content;
    justify-content: space-around;
    // position: fixed;
    // top: 0;
    // left: 0;
    // -webkit-backface-visibility: hidden;
    // @media(max-width: 767px){
    //     position: fixed;
    //     bottom: 0px;
    // }
`

export default function AccessibilityBar() {

    const accessibility = useSelector(state => state.accessibility);
    const dispatch = useDispatch();

    const [brightness, setBrightness] = useState(accessibility.brightness);
    const [contrast, setContrast] = useState(accessibility.contrast);
    const [fontSize, setFontSize] = useState(accessibility.fontSize);
    const [nightMode, setNightMode] = useState(accessibility.nightMode);

    function resetAccessibility(action, state) {
        if (state < 3) {
            action(state + 1);
        } else {
            action(0);
        }
    }

    const handleNightMode = () => {
        if (nightMode) {
            setNightMode(false);
        } else {
            setNightMode(true);
        }
    }

    useEffect(() => {
        dispatch({ type: 'SET_BRIGHTNESS', brightness: brightness });
    }, [brightness]);

    useEffect(() => {
        dispatch({ type: 'SET_CONTRAST', contrast: contrast });
    }, [contrast]);

    useEffect(() => {
        dispatch({ type: 'SET_FONTSIZE', fontSize: fontSize });
    }, [fontSize]);

    useEffect(() => {
        dispatch({ type: 'SET_NIGHTMODE', nightMode: nightMode });
    }, [nightMode]);


    return (
        <StyledAccessibilityBar className="main-text">
            {/* <Tooltip title="Contraste">
                <IconButton
                    onClick={() => resetAccessibility(setContrast, contrast)}
                >
                    <Brush />
                </IconButton>
            </Tooltip>
            
            <Tooltip title="Brilho">
                <IconButton
                    onClick={() => resetAccessibility(setBrightness, brightness)}
                >
                    <Brightness6 />
                </IconButton>
            </Tooltip> */}

            <Tooltip title="Fonte">
                <IconButton
                    onClick={() => resetAccessibility(setFontSize, fontSize)}
                >
                    <TextFormat />
                </IconButton>
            </Tooltip>

            <Tooltip title="Modo noturno">
                <IconButton
                    onClick={() => handleNightMode()}
                >
                    <Brightness1 />
                </IconButton>
            </Tooltip>

        </StyledAccessibilityBar>
    )
}