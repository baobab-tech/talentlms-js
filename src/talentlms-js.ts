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
  
    // Add more methods as needed
  }
  
  export default TalentLms;
  
  export { TalentLms, TalentLMSConfig, User, Course };