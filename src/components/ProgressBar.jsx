import React from 'react'

const Progress_bar = ({ bgcolor, progress, height }) => {

    const Parentdiv = {
        display: 'flex',
        width: '100%',
        height: height,
        backgroundColor: 'whitesmoke',
        borderRadius: 40,
        alignItems: 'center',
    }

    const Childdiv = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: bgcolor,
        borderRadius: 40,
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
    }

    const progresstext = {
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif',
    }

    return (
        <div style={Parentdiv}>
            <div style={Childdiv}>
                <span style={progresstext}>{`${progress}%`}</span>
            </div>
        </div>
    )
}

export default Progress_bar;