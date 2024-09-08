/** Configuration for TalentLMS API */
export interface TalentLMSConfig {
    /** API key for authentication */
    apiKey: string;
    /** Domain for the TalentLMS instance */
    domain?: string;
    /** Subdomain for the TalentLMS instance */
    subdomain?: string;
}

/** Represents a user in the TalentLMS system */
export interface User {
    /** Unique identifier for the user */
    id: string;
    /** User's login name */
    login: string;
    /** User's first name */
    first_name: string;
    /** User's last name */
    last_name: string;
    /** User's email address */
    email: string;
    /** Email restriction status */
    restrict_email: string;
    /** Type of user (e.g., learner, instructor) */
    user_type: string;
    /** User's timezone */
    timezone: string;
    /** User's preferred language */
    language: string;
    /** User's account status */
    status: string;
    /** Date when the user was deactivated */
    deactivation_date: string;
    /** User's level in the system */
    level: string;
    /** User's accumulated points */
    points: string;
    /** User's available credits */
    credits: string;
    /** Date when the user was created */
    created_on: string;
    /** Date of the last update to the user's profile */
    last_updated: string;
    /** Timestamp of the last update to the user's profile */
    last_updated_timestamp: string;
    /** URL of the user's avatar */
    avatar: string;
    /** User's biography */
    bio: string | null;
    /** User's login key */
    login_key: string;
    /** List of courses the user is enrolled in */
    courses?: CourseListItem[];
    /** List of branches the user belongs to */
    branches?: Branch[];
    /** List of groups the user is a member of */
    groups?: Group[];
    /** List of certifications earned by the user */
    certifications?: Certification[];
    /** List of badges earned by the user */
    badges?: Badge[];
}

/** Represents a user's enrollment in a course */
export interface CourseUser {
    /** User's ID */
    id: string;
    /** User's name */
    name: string;
    /** User's role in the course */
    role: string;
    /** Date when the user enrolled in the course */
    enrolled_on: string;
    /** Timestamp of when the user enrolled in the course */
    enrolled_on_timestamp: string;
    /** Date when the user completed the course */
    completed_on: string;
    /** Timestamp of when the user completed the course */
    completed_on_timestamp: string;
    /** Percentage of course completion */
    completion_percentage: string;
    /** Date when the course expired for the user */
    expired_on: string;
    /** Timestamp of when the course expired for the user */
    expired_on_timestamp: string;
    /** Total time spent on the course */
    total_time: string;
    /** Total time spent on the course in seconds */
    total_time_seconds: number;
}

/** Represents a unit within a course */
export interface CourseUnit {
    /** Unique identifier for the unit */
    id: string;
    /** Type of the unit */
    type: string;
    /** Name of the unit */
    name: string;
    /** URL associated with the unit */
    url?: string;
    /** Delay time for the unit */
    delay_time?: string;
    /** Aggregated delay time for the unit */
    aggregated_delay_time?: string;
    /** Formatted aggregated delay time for the unit */
    formatted_aggregated_delay_time?: string;
}

/** Represents a prerequisite course */
export interface CoursePrerequisite {
    /** ID of the prerequisite course */
    course_id: string;
    /** Name of the prerequisite course */
    course_name: string;
}

/** Represents a prerequisite rule set for a course */
export interface CoursePrerequisiteRuleSet {
    /** ID of the course the rule set applies to */
    course_id: string;
    /** Name of the course the rule set applies to */
    course_name: string;
    /** Rule set definition */
    rule_set: string;
}

/** Represents a course as it appears in a list of courses 
 * usually when you get all courses
*/
export interface CourseListItem {
    /** Unique identifier for the course */
    id: string;
    /** Name of the course */
    name: string;
    /** Course code */
    code: string;
    /** ID of the category the course belongs to */
    category_id: string;
    /** Description of the course */
    description: string;
    /** Price of the course */
    price: string;
    /** Status of the course */
    status: string;
    /** Date when the course was created */
    creation_date: string;
    /** Date of the last update to the course */
    last_update_on: string;
    /** ID of the course creator */
    creator_id: string;
    /** Whether the course is hidden from the catalog */
    hide_from_catalog: string;
    /** Time limit for completing the course */
    time_limit: string;
    /** Start date and time for the course */
    start_datetime: string | null;
    /** Expiration date and time for the course */
    expiration_datetime: string | null;
    /** Level of the course */
    level: string;
    /** Whether the course is shared */
    shared: string;
    /** URL for the shared course */
    shared_url: string;
    /** URL of the course avatar */
    avatar: string;
    /** URL of the large course avatar */
    big_avatar: string;
    /** Whether the course offers certification */
    certification: string;
    /** Duration of the certification */
    certification_duration: string;
}

/** Represents detailed information about a specific course
 * usually when you get a single course
 */
export interface CourseDetails extends CourseListItem {
    /** List of users enrolled in the course */
    users: CourseUser[];
    /** List of units in the course */
    units: CourseUnit[];
    /** List of rules applied to the course */
    rules: string[];
    /** List of prerequisite courses */
    prerequisites: CoursePrerequisite[];
    /** List of prerequisite rule sets */
    prerequisite_rule_sets: CoursePrerequisiteRuleSet[];
}

/** Alias for CourseDetails, representing a full course object */
export type Course = CourseDetails;

/** Represents a branch in the organization */
export interface Branch {
    /** Unique identifier for the branch */
    id: string;
    /** Name of the branch */
    name: string;
}

/** Represents a group in the system */
export interface Group {
    /** Unique identifier for the group */
    id: string;
    /** Name of the group */
    name: string;
}

/** Represents a certification earned by a user */
export interface Certification {
    /** ID of the course associated with the certification */
    course_id: string;
    /** Name of the course associated with the certification */
    course_name: string;
    /** Unique identifier for the certification */
    unique_id: string;
    /** Date when the certification was issued */
    issued_date: string;
    /** Timestamp of when the certification was issued */
    issued_date_timestamp: number;
    /** Date when the certification expires */
    expiration_date: string;
    /** Timestamp of when the certification expires */
    expiration_date_timestamp: number;
    /** URL to download the certification */
    download_url: string;
    /** Public URL to view the certification */
    public_url: string;
}

/** Represents a badge earned by a user */
export interface Badge {
    /** Name of the badge */
    name: string;
    /** Type of the badge */
    type: string;
    /** URL of the badge image */
    image_url: string;
    /** Criteria for earning the badge */
    criteria: string;
    /** Date when the badge was issued */
    issued_on: string;
    /** Timestamp of when the badge was issued */
    issued_on_timestamp: number;
}
