import Task from "./Task";

export default class Position extends Task {
    position: String;
    required_position_keys = ['position'];

    constructor(data: Any) {
        super(data);
        const position_keys = Object.keys(data);
        if (!this.required_position_keys.every(key => position_keys.includes(key))) {
            throw new Error('Missing required company keys.');
        }

        this.position = data.position;
    }
}