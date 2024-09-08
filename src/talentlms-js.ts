// talentlms-api.ts

interface TalentLMSConfig {
    apiKey: string;
    domain?: string;
    subdomain?: string;
  }
  
  interface User {
    id: string;
    login: string;
    first_name: string;
    last_name: string;
    email: string;
    // Add other user properties as needed
  }
  
  interface Course {
    id: string;
    name: string;
    code: string;
    // Add other course properties as needed
  }
  
  /**
   * TalentLMS API client class
   * @class
   */
  class TalentLms {
    private apiKey: string;
    private subdomain: string;
    private domain: string;
    private baseUrl: string;
  
    /**
     * Creates an instance of TalentLms.
     * @param {TalentLMSConfig} config - The configuration object for TalentLMS.
     * @throws {Error} If the configuration is invalid.
     */
    constructor(config: TalentLMSConfig) {
      if (!config.apiKey) {
        throw new Error('API key is required');
      }
      this.apiKey = config.apiKey;
      this.subdomain = config.subdomain || '';
      this.domain = config.domain || '';
      if (!this.subdomain && !this.domain) {
        throw new Error('Either subdomain or domain must be provided');
      }
      if (this.subdomain) {
        this.baseUrl = `https://${this.subdomain}.talentlms.com/api/v1`;
      } else {
        this.baseUrl = `https://${this.domain}/api/v1`;
      }
    }
  
    /**
     * Makes an HTTP request to the TalentLMS API.
     * @private
     * @template T
     * @param {string} endpoint - The API endpoint to request.
     * @param {string} [method='GET'] - The HTTP method to use.
     * @param {any} [body] - The request body for POST/PUT requests.
     * @returns {Promise<T>} A promise that resolves with the API response.
     * @throws {Error} If the HTTP request fails or the API returns an error.
     */
    private async request<T>(endpoint: string, method: string = 'GET', body?: any): Promise<T> {
      const url = `${this.baseUrl}/${endpoint}`;
      const headers = {
        'Authorization': `Basic ${this.apiKey}`,
        'Content-Type': 'application/json',
      };
  
      try {
        const response = await fetch(url, {
          method,
          headers,
          body: body ? JSON.stringify(body) : undefined,
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`TalentLMS API error: ${errorData.error.message || response.statusText}`);
        }
  
        return response.json() as Promise<T>;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Request failed: ${error.message}`);
        }
        throw error;
      }
    }
  
    /**
     * Retrieves all users from TalentLMS.
     * @returns {Promise<User[]>} A promise that resolves with an array of User objects.
     */
    async getAllUsers(): Promise<User[]> {
      return this.request<User[]>('users');
    }
  
    /**
     * Retrieves all courses from TalentLMS.
     * @returns {Promise<Course[]>} A promise that resolves with an array of Course objects.
     */
    async getAllCourses(): Promise<Course[]> {
      return this.request<Course[]>('courses');
    }
  
    /**
     * Retrieves a user by their ID.
     * @param {string} userId - The ID of the user to retrieve.
     * @returns {Promise<User>} A promise that resolves with the User object.
     */
    async getUserById(userId: string): Promise<User> {
      return this.request<User>(`users/id:${userId}`);
    }
  
    /**
     * Retrieves a user by their email address.
     * @param {string} email - The email address of the user to retrieve.
     * @returns {Promise<User>} A promise that resolves with the User object.
     */
    async getUserByEmail(email: string): Promise<User> {
      return this.request<User>(`users/email:${email}`);
    }
  
    /**
     * Retrieves users by their phone number.
     * @param {string} phone - The phone number to search for.
     * @param {string} [customFieldName='custom_field_7,custom_field_8'] - The custom field(s) to search in.
     * @returns {Promise<User[]>} A promise that resolves with an array of matching User objects.
     */
    async getUserByPhone(phone: string, customFieldName: string = 'custom_field_7,custom_field_8'): Promise<User[]> {
      const allUsers = await this.getAllUsers();
      const fields = customFieldName.split(',');
      return allUsers.filter(user => 
        fields.some(field => (user as any)[field] === phone) || 
        fields.map(field => (user as any)[field]).join('') === phone
      );
    }
  
    /**
     * Retrieves a course by its ID.
     * @param {string} courseId - The ID of the course to retrieve.
     * @returns {Promise<Course>} A promise that resolves with the Course object.
     */
    async getCourseById(courseId: string): Promise<Course> {
      return this.request<Course>(`courses/id:${courseId}`);
    }
  
    /**
     * Retrieves a course by its code.
     * @param {string} code - The code of the course to retrieve.
     * @returns {Promise<Course | undefined>} A promise that resolves with the Course object or undefined if not found.
     */
    async getCourseByCode(code: string): Promise<Course | undefined> {
      const allCourses = await this.getAllCourses();
      return allCourses.find(course => course.code === code);
    }
  
    /**
     * Retrieves users enrolled in a course by the course code.
     * @param {string} code - The code of the course to retrieve users from.
     * @returns {Promise<User[]>} A promise that resolves with an array of User objects enrolled in the course.
     * @throws {Error} If the course with the given code is not found.
     */
    async getUsersByCourseCode(code: string): Promise<User[]> {
      const course = await this.getCourseByCode(code);
      if (!course) {
        throw new Error(`Course with code ${code} not found`);
      }
      return this.request<User[]>(`courses/id:${course.id}/users`);
    }
  
    // Not yet implemented methods
    async userLogin() {
      // Not yet implemented: /v1/userlogin
    }

    async isUserOnline(userId: string) {
      // Not yet implemented: /v1/isuseronline/user_id:{user_id}
    }

    async userLogout() {
      // Not yet implemented: /v1/userlogout
    }

    async userSignup() {
      // Not yet implemented: /v1/usersignup
    }

    async deleteUser() {
      // Not yet implemented: /v1/deleteuser
    }

    async editUser() {
      // Not yet implemented: /v1/edituser
    }

    async setUserStatus(userId: string, status: string) {
      // Not yet implemented: /v1/usersetstatus/user_id:{userId},status:{status}
    }

    async createCourse() {
      // Not yet implemented: /v1/createcourse
    }

    async deleteCourse() {
      // Not yet implemented: /v1/deletecourse
    }

    async getCategories() {
      // Not yet implemented: /v1/categories
    }

    async getCategoryById(categoryId: string) {
      // Not yet implemented: /v1/categories/id:{categoryId}
    }

    async getGroups() {
      // Not yet implemented: /v1/groups
    }

    async getGroupById(groupId: string) {
      // Not yet implemented: /v1/groups/id:{groupId}
    }

    async createGroup() {
      // Not yet implemented: /v1/creategroup
    }

    async deleteGroup() {
      // Not yet implemented: /v1/deletegroup
    }

    async getBranches() {
      // Not yet implemented: /v1/branches
    }

    async getBranchById(branchId: string) {
      // Not yet implemented: /v1/branches/id:{branchId}
    }

    async createBranch() {
      // Not yet implemented: /v1/createbranch
    }

    async deleteBranch() {
      // Not yet implemented: /v1/deletebranch
    }

    async setBranchStatus(branchId: string, status: string) {
      // Not yet implemented: /v1/branchsetstatus/branch_id:{branchId},status:{status}
    }

    async forgotUsername(email: string, domainUrl: string) {
      // Not yet implemented: /v1/forgotusername/email:{email},domain_url:{domainUrl}
    }

    async forgotPassword(userName: string, domainUrl: string, redirectUrl: string) {
      // Not yet implemented: /v1/forgotpassword/username:{userName},domain_url:{url},redirect_url:{url}
    }

    async addUserToCourse() {
      // Not yet implemented: /v1/addusertocourse
    }

    async removeUserFromCourse(userId: string, courseId: string) {
      // Not yet implemented: /v1/removeuserfromcourse/user_id:{userId},course_id:{courseId}
    }

    async getUserStatusInCourse(courseId: string, userId: string) {
      // Not yet implemented: /v1/getuserstatusincourse/course_id:{courseId},user_id:{userId}
    }

    async resetUserProgress(courseId: string, userId: string) {
      // Not yet implemented: /v1/resetuserprogress/course_id:{courseId},user_id:{userId}
    }

    async addUserToBranch(userId: string, branchId: string) {
      // Not yet implemented: /v1/addusertobranch/user_id:{userId},branch_id:{branchId}
    }

    async removeUserFromBranch(userId: string, branchId: string) {
      // Not yet implemented: /v1/removeuserfrombranch/user_id:{userId},branch_id:{branchId}
    }

    async addCourseToBranch(courseId: string, branchId: string) {
      // Not yet implemented: /v1/addcoursetobranch/course_id:{courseId},branch_id:{branchId}
    }

    async addUserToGroup(userId: string, groupKey: string) {
      // Not yet implemented: /v1/addusertogroup/user_id:{userId},group_key:{groupKey}
    }

    async removeUserFromGroup(userId: string, groupId: string) {
      // Not yet implemented: /v1/removeuserfromgroup/user_id:{userId},group_id:{groupId}
    }

    async addCourseToGroup(courseId: string, groupId: string) {
      // Not yet implemented: /v1/addcoursetogroup/course_id:{courseId},group_id:{groupId}
    }

    async goToCourse(userId: string, courseId: string) {
      // Not yet implemented: /v1/gotocourse/user_id:{userId},course_id:{courseId}
    }

    async getUsersByCustomField(value: string) {
      // Not yet implemented: /v1/getusersbycustomfield/custom_field_value:{value}
    }

    async getCoursesByCustomField(value: string) {
      // Not yet implemented: /v1/getcoursesbycustomfield/custom_field_value:{value}
    }

    async buyCourse() {
      // Not yet implemented: /v1/buycourse
    }

    async buyCategoryCourses() {
      // Not yet implemented: /v1/buycategorycourses
    }

    async getCustomRegistrationFields() {
      // Not yet implemented: /v1/getcustomregistrationfields
    }

    async getCustomCourseFields() {
      // Not yet implemented: /v1/getcustomcoursefields
    }

    async getCategoryLeafsAndCourses(categoryId: string) {
      // Not yet implemented: /v1/categoryleafsandcourses/id:{categoryId}
    }

    async getUsersProgressInUnits(unitId: string, userId: string) {
      // Not yet implemented: /v1/getusersprogressinunits/unit_id:{unitId},user_id:{userId}
    }

    async getTestAnswers(testId: string, userId: string) {
      // Not yet implemented: /v1/gettestanswers/test_id:{testId},user_id:{userId}
    }

    async getSurveyAnswers(surveyId: string, userId: string) {
      // Not yet implemented: /v1/getsurveyanswers/survey_id:{surveyId},user_id:{userId}
    }

    async getIltSessions(iltId: string) {
      // Not yet implemented: /v1/getiltsessions/ilt_id:{iltId}
    }

    async getTimeline() {
      // Not yet implemented: /v1/gettimeline
    }

    async getSiteInfo() {
      // Not yet implemented: /v1/siteinfo
    }

    async getRateLimit() {
      // Not yet implemented: /v1/ratelimit
    }
  }
  
  export default TalentLms;
  
  export { TalentLms, TalentLMSConfig, User, Course };