
// a base class to represent the data for projects and work positions
export default class Task {
    title: String;
    summary: String;
    description: String;
    technologies: String;
    start_date: String | null;
    end_date: String;
    github_url: String | null;
    live_url: String | null;
    org_url: String | null;
    required_keys = ['title', 'summary', 'description', 'technologies', 'end_date'];

    constructor(data: Any) {
        if (!data) throw new Error('Task class failed to init due to invalid input');
        
        const keys = Object.keys(data);
        if (!this.required_keys.every(key => keys.includes(key))) throw new Error('Task class failed to init due to missing required keys');

        this.title = data.title;
        this.summary = data.summary;
        this.description = data.description;
        this.technologies = data.technologies;
        this.start_date = data.start_date ? data.start_date : null;
        this.end_date = data.end_date;
        this.live_url = data.live_url ? data.live_url : null;
        this.org_url = data.org_url ? data.org_url : null;
    }
}