import TalentLms from '../talentlms-js';
import fetch from 'node-fetch';

jest.mock('node-fetch');

describe('TalentLms', () => {
  let talentLms: TalentLms;
  const mockConfig = {
    apiKey: 'test-api-key',
    domain: 'test-domain',
  };

  beforeEach(() => {
    talentLms = new TalentLms(mockConfig);
    (fetch as jest.MockedFunction<typeof fetch>).mockClear();
  });

  it('should initialize with correct config', () => {
    expect(talentLms).toBeInstanceOf(TalentLms);
  });

  it('should get all users', async () => {
    const mockUsers = [{ id: '1', login: 'user1' }, { id: '2', login: 'user2' }];
    // @ts-ignore
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    } as Response);

    const users = await talentLms.getAllUsers();
    expect(users).toEqual(mockUsers);
    expect(fetch).toHaveBeenCalledWith(
      'https://test-domain.talentlms.com/api/v1/users',
      expect.objectContaining({ method: 'GET' })
    );
  });

  it('should get all courses', async () => {
    const mockCourses = [{ id: '1', name: 'Course 1' }, { id: '2', name: 'Course 2' }];
    // @ts-ignore
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCourses,
    } as Response);

    const courses = await talentLms.getAllCourses();
    expect(courses).toEqual(mockCourses);
    expect(fetch).toHaveBeenCalledWith(
      'https://test-domain.talentlms.com/api/v1/courses',
      expect.objectContaining({ method: 'GET' })
    );
  });

  it('should get user by ID', async () => {
    const mockUser = { id: '1', login: 'user1' };
    // @ts-ignore
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    } as Response);

    const user = await talentLms.getUserById('1');
    expect(user).toEqual(mockUser);
    expect(fetch).toHaveBeenCalledWith(
      'https://test-domain.talentlms.com/api/v1/users/id:1',
      expect.objectContaining({ method: 'GET' })
    );
  });

  it('should get user by email', async () => {
    const mockUser = { id: '1', login: 'user1', email: 'user1@example.com' };
    // @ts-ignore
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    } as Response);

    const user = await talentLms.getUserByEmail('user1@example.com');
    expect(user).toEqual(mockUser);
    expect(fetch).toHaveBeenCalledWith(
      'https://test-domain.talentlms.com/api/v1/users/email:user1@example.com',
      expect.objectContaining({ method: 'GET' })
    );
  });

  it('should get user by phone', async () => {
    const mockUsers = [
      { id: '1', login: 'user1', custom_field_7: '1234567890' },
      { id: '2', login: 'user2', custom_field_8: '0987654321' },
    ];
    // @ts-ignore
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    } as Response);

    const users = await talentLms.getUserByPhone('1234567890');
    expect(users).toEqual([mockUsers[0]]);
    // Add a test for the second user with custom_field_8
    const users2 = await talentLms.getUserByPhone('0987654321');
    expect(users2).toEqual([mockUsers[1]]);
    expect(fetch).toHaveBeenCalledWith(
      'https://test-domain.talentlms.com/api/v1/users',
      expect.objectContaining({ method: 'GET' })
    );
  });

  it('should get course by ID', async () => {
    const mockCourse = { id: '1', name: 'Course 1' };
    // @ts-ignore
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCourse,
    } as Response);

    const course = await talentLms.getCourseById('1');
    expect(course).toEqual(mockCourse);
    expect(fetch).toHaveBeenCalledWith(
      'https://test-domain.talentlms.com/api/v1/courses/id:1',
      expect.objectContaining({ method: 'GET' })
    );
  });

  it('should get course by code', async () => {
    const mockCourses = [
      { id: '1', name: 'Course 1', code: 'C001' },
      { id: '2', name: 'Course 2', code: 'C002' },
    ];
    // @ts-ignore
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCourses,
    } as Response);

    const course = await talentLms.getCourseByCode('C001');
    expect(course).toEqual(mockCourses[0]);
    expect(fetch).toHaveBeenCalledWith(
      'https://test-domain.talentlms.com/api/v1/courses',
      expect.objectContaining({ method: 'GET' })
    );
  });

  it('should get users by course code', async () => {
    const mockCourses = [{ id: '1', name: 'Course 1', code: 'C001' }];
    const mockUsers = [{ id: '1', login: 'user1' }, { id: '2', login: 'user2' }];
    // @ts-ignore
    (fetch as jest.MockedFunction<typeof fetch>)
    // @ts-ignore
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCourses,
      } as Response)
      // @ts-ignore
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockUsers,
      } as Response);

    const users = await talentLms.getUsersByCourseCode('C001');
    expect(users).toEqual(mockUsers);
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenNthCalledWith(
      1,
      'https://test-domain.talentlms.com/api/v1/courses',
      expect.objectContaining({ method: 'GET' })
    );
    expect(fetch).toHaveBeenNthCalledWith(
      2,
      'https://test-domain.talentlms.com/api/v1/courses/id:1/users',
      expect.objectContaining({ method: 'GET' })
    );
  });

  it('should throw an error for non-OK responses', async () => {
    // @ts-ignore
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as Response);

    await expect(talentLms.getAllUsers()).rejects.toThrow('HTTP error! status: 404');
  });

  it('should throw an error when course not found for getUsersByCourseCode', async () => {
    const mockCourses: any[] = [];
    // @ts-ignore
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCourses,
    } as Response);

    await expect(talentLms.getUsersByCourseCode('NONEXISTENT')).rejects.toThrow('Course with code NONEXISTENT not found');
  });
});