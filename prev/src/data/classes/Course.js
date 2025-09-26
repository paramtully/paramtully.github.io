import Task from "./Task";


// courses have subtopics, subtopic summaries, and projects w/i each subtopic (hierarchical)
// also grouped with topics that they are relevant to
export default class Course extends Task {
    subjects: String;
}