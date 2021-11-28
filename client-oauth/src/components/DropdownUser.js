import React, { useEffect, useState } from "react";
import '../style/DropDownUser.css'
function DropDownUser ({ userData }) {
  // console.log(userData)
  return (
      <div className="drop-down-user-container">
        <p> {userData.name} </p>
      </div>
  )
}

export default DropDownUser;