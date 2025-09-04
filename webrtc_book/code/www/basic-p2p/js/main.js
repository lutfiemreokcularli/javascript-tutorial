/***
 * Excerpted from "Programming WebRTC",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit https://pragprog.com/titles/ksrtc for more book information.
 ***/
"use strict";

/**
 *  Global Variables: $self and $peer
 */

/**
 *  Signaling-Channel Setup
 */

/**
 * =========================================================================
 *  Begin Application-Specific Code
 * =========================================================================
 */

/**
 *  User-Interface Setup
 */
document
  .querySelector("#call-button")
  .addEventListener("click", handleCallButton);

/**
 *  User-Media Setup
 */

/**
 *  User-Interface Functions and Callbacks
 */
function handleCallButton(event) {
  const call_button = event.target;
  if (call_button.className === "join") {
    console.log("Joining the call...");
    call_button.className = "leave";
    call_button.innerText = "Leave Call";
  } else {
    console.log("Leaving the call...");
    call_button.className = "join";
    call_button.innerText = "Join Call";
  }
}

/**
 *  User-Media Functions
 */

/**
 *  Call Features & Reset Functions
 */

/**
 *  WebRTC Functions and Callbacks
 */

/**
 * =========================================================================
 *  End Application-Specific Code
 * =========================================================================
 */

/**
 *  Reusable WebRTC Functions and Callbacks
 */

/**
 *  Signaling-Channel Functions and Callbacks
 */

/**
 *  Utility Functions
 */
