// talentlms-api.ts

interface TalentLMSConfig {
    apiKey: string;
    domain: string;
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
  
  class TalentLms {
    private apiKey: string;
    private domain: string;
    private baseUrl: string;
  
    constructor(config: TalentLMSConfig) {
      this.apiKey = config.apiKey;
      this.domain = config.domain;
      this.baseUrl = `https://${this.domain}.talentlms.com/api/v1`;
    }
  
    private async request<T>(endpoint: string, method: string = 'GET', body?: any): Promise<T> {
      const url = `${this.baseUrl}/${endpoint}`;
      const headers = {
        'Authorization': `Basic ${Buffer.from(this.apiKey + ':').toString('base64')}`,
        'Content-Type': 'application/json',
      };
  
      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return response.json() as Promise<T>;
    }
  
    async getAllUsers(): Promise<User[]> {
      return this.request<User[]>('users');
    }
  
    async getAllCourses(): Promise<Course[]> {
      return this.request<Course[]>('courses');
    }
  
    async getUserById(userId: string): Promise<User> {
      return this.request<User>(`users/id:${userId}`);
    }
  
    async getUserByEmail(email: string): Promise<User> {
      return this.request<User>(`users/email:${email}`);
    }
  
    async getUserByPhone(phone: string, customFieldName: string = 'custom_field_7,custom_field_8'): Promise<User[]> {
      const allUsers = await this.getAllUsers();
      const fields = customFieldName.split(',');
      return allUsers.filter(user => 
        fields.some(field => (user as any)[field] === phone) || 
        fields.map(field => (user as any)[field]).join('') === phone
      );
    }
  
    async getCourseById(courseId: string): Promise<Course> {
      return this.request<Course>(`courses/id:${courseId}`);
    }
  
    async getCourseByCode(code: string): Promise<Course | undefined> {
      const allCourses = await this.getAllCourses();
      return allCourses.find(course => course.code === code);
    }
  
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