
export const CircleBackground = ({ width, height, left = 0, top = 0, right = 0, bottom = 0, backgroundColor = "#A0B5ED" }) => {
    return (
        <div style={{ position: "absolute", width, height, left, top, right, bottom, backgroundColor, borderRadius: width }}>

        </div>
    );
}

export const BackgroundResetPassword = () => {
    return (
        <div className="stack brackground-reset">
            <div className="medium-bar"></div>
            <CircleBackground
                width={100}
                height={100}
                left={60}
                top="60%"
            />
            <CircleBackground
                width={300}
                height={300}
                left="50%"
                top="50%"
            />
            <CircleBackground
                width={200}
                height={200}
                left={-40}
                top="80%"
            />
            <CircleBackground
                width={100}
                height={100}
                left={300}
                top="80%"
            />
            <CircleBackground
                width={100}
                height={100}
                left="80%"
                top="55%"
            />
            <CircleBackground
                width={100}
                height={100}
                left="90%"
                top="80%"
            />
        </div>
    );
}