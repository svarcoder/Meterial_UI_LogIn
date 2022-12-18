/** @format */

import { TASK_DETAILS } from "./action.type";
// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
	switch (action.type) {
		case TASK_DETAILS:
			return (state = action.payload);

		default:
			return state;
	}
};
