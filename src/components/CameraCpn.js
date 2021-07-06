import "./Camera.css";
import React, { useState } from "react";
import Webcam from "react-webcam";

export default function CameraCpn() {
    const [result] = useState("Ket qua");
    const [enabled, setEnabled] = useState(false);
    const videoConstraints = {
        width: 500,
        height: 500
    };

    return ( 
        <div>
            <div className = "form-check form-switch m-3" >
                <input onChange = {() => setEnabled((prev) => !prev) }
                className = "form-check-input"
                type = "checkbox"
                id = "toggleCamera" />
                  {enabled ? ( <
                        Webcam audio = { false }
                        videoConstraints = { videoConstraints }
                        className = "webcam" />
                    ) : ( <div className = "webcam" > </div>
                    )
                } 
                </div>

              
            <div className="alert alert-primary">{result}</div>
        </div>
    );
}