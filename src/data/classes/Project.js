import Task from "./Task";

// represents data for courses; includes project category and importance rating (1-5) for sorting
export default class Project extends Task {
    categories: String[];
    importance: String;
    required_course_keys: String[] = ['category', 'importance'];
    categories: String[] = ['SWE', 'ML', 'CyberSec', 'DevOps', 'Game'];

    constructor(data: Any) {
        super(data);
        const course_keys = Object.keys(data);
        if (!this.required_course_keys.every(key => course_keys.includes(key))) {
            throw new Error('Missing required course keys.');
        }

        this.categories = data.categories;
        this.importance = data.importance;
    }
}