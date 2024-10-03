import React, { useState, useEffect } from "react";
import PhongBan from "./phongban";
import BangCap from "./bangcap";
function ThemNV() {
    return (
        <div className="wrapper p-3">
            <div className="contact-form">
                <div className="row">
                    <div className="form-group col-md-6">
                        <PhongBan />
                    </div>
                    <div className="form-group col-md-6">
                        <BangCap />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ThemNV;
