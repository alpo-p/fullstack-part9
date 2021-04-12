interface CoursePartBase {
  type: string;
  name: string;
  exerciseCount: number;
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseNonProjectPart extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CourseNonProjectPart {
  type: "normal";
}

interface CourseSubmissionPart extends CourseNonProjectPart {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CourseNonProjectPart {
  type: "special";
  requirements: string[];
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;