import Task from "./Task";


// courses have subtopics, subtopic summaries, and projects w/i each subtopic (hierarchical)
export default class Course extends Task {
    subjects: Any;
}