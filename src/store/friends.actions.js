import { guestService } from "../services/async-storage.service dont delete.js";
import { stationServiceNew } from "../services/station.service.js";
import { userService } from "../services/user.service.js";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js';
import { AddToRecentlyPlayed } from "./user.actions.js";



export function setFriendCurrTrack({ track, user }) {
    return async (dispatch) => {
        dispatch(
            {
                type: 'SET_FRIEND_CURR_TRACK',
                track,
                user
            }
        )

    }
}
