import { Focus } from './projects.ts'

export const githubLink = 'https://github.com/paramtully'
export const linkedinLink = 'https://linkedin.com/in/paramtully'
export const emailLink = 'mailto:paramtully.dev@gmail.com'

/** Legacy default path; kept as a copy of the SWE resume for old bookmarks. */
export const resumeLink = '/resume.pdf'

/**
 * Resume served by the Hero button for each project focus.
 * Highlights and Software → SWE. ML & AI → ML (stronger dual signal than the
 * DA resume for both ML and analytics-adjacent roles). DA PDF is hosted at
 * /resumes/ParamTully_DataAnalyst_Resume.pdf for direct use in applications.
 */
export const resumeByFocus: Record<Focus, string> = {
    highlights: '/resumes/ParamTully_SWE_Resume.pdf',
    swe: '/resumes/ParamTully_SWE_Resume.pdf',
    ml: '/resumes/ParamTully_ML_Resume.pdf'
}

export function resumeLinkForFocus(focus: Focus): string {
    return resumeByFocus[focus]
}
