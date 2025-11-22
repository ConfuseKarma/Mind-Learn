// utils/api.js
const BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000/api/v1";

function getToken() {
  return localStorage.getItem("token");
}

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: "Bearer " + token } : {};
}

async function http(path, { method = "GET", body } = {}) {
  const headers = {
    ...(body ? { "Content-Type": "application/json" } : {}),
    ...authHeaders(),
  };

  const res = await fetch(BASE + path, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = null;
    }
  }

  if (!res.ok) {
    const msg =
      (data && (data.error || data.message)) || res.statusText || text || "Request failed";
    throw new Error(msg);
  }

  return data;
}

export const api = {
  login: (email, password) => http("/auth/login", { method: "POST", body: { email, password } }),
  signup: (name, email, password) =>
    http("/auth/signup", { method: "POST", body: { name, email, password } }),
  me: () => http("/me"),

  themes: () => http("/student/themes"),
  lessonsByTheme: (id) => http(`/student/themes/${id}/lessons`),
  lesson: (id) => http(`/student/lessons/${id}`),
  attempt: (id, answers) =>
    http(`/student/lessons/${id}/attempt`, {
      method: "POST",
      body: { answers },
    }),
  progress: () => http("/student/me/progress"),
  activity: () => http("/student/me/activity"),
  activityDetail: (id) => http(`/student/me/activity/${id}`),
  quizzes: () => http("/student/quizzes"),
  quiz: (id) => http(`/student/quizzes/${id}`),
  attemptQuiz: (id, answers) =>
    http(`/student/quizzes/${id}/attempt`, {
      method: "POST",
      body: { answers },
    }),

  admin: {
    listUsers: () => http("/admin/users"),
    updateUserRole: (id, role) =>
      http(`/admin/users/${id}/role`, {
        method: "PATCH",
        body: { role },
      }),
    deleteUser: (id) =>
      http(`/admin/users/${id}`, {
        method: "DELETE",
      }),

    listThemes: () => http("/admin/themes"),
    createTheme: (name, description) =>
      http("/admin/themes", { method: "POST", body: { name, description } }),
    updateTheme: (id, payload) => http(`/admin/themes/${id}`, { method: "PUT", body: payload }),
    deleteTheme: (id) => http(`/admin/themes/${id}`, { method: "DELETE" }),

    listLessons: () => http("/admin/lessons"),
    getLesson: (id) => http(`/admin/lessons/${id}`),
    createLesson: (payload) => http("/admin/lessons", { method: "POST", body: payload }),
    updateLesson: (id, payload) => http(`/admin/lessons/${id}`, { method: "PUT", body: payload }),
    deleteLesson: (id) => http(`/admin/lessons/${id}`, { method: "DELETE" }),

    listQuizzes: () => http("/admin/quizzes"),
    getQuiz: (id) => http(`/admin/quizzes/${id}`),
    createQuiz: (payload) => http("/admin/quizzes", { method: "POST", body: payload }),
    updateQuiz: (id, payload) => http(`/admin/quizzes/${id}`, { method: "PUT", body: payload }),
    deleteQuiz: (id) => http(`/admin/quizzes/${id}`, { method: "DELETE" }),
  },

  teacher: {
    lessons: () => http("/teacher/lessons"),
    getLesson: (id) => http(`/teacher/lessons/${id}`),
    createLesson: (payload) => http("/teacher/lessons", { method: "POST", body: payload }),
    updateLesson: (id, payload) => http(`/teacher/lessons/${id}`, { method: "PUT", body: payload }),
    deleteLesson: (id) => http(`/teacher/lessons/${id}`, { method: "DELETE" }),

    quizzes: () => http("/teacher/quizzes"),
    getQuiz: (id) => http(`/teacher/quizzes/${id}`),
    createQuiz: (payload) => http("/teacher/quizzes", { method: "POST", body: payload }),
    updateQuiz: (id, payload) => http(`/teacher/quizzes/${id}`, { method: "PUT", body: payload }),
    deleteQuiz: (id) => http(`/teacher/quizzes/${id}`, { method: "DELETE" }),
  },

  adminCreateTheme: (name, description) =>
    http("/admin/themes", { method: "POST", body: { name, description } }),
  adminCreateLesson: (payload) => http("/admin/lessons", { method: "POST", body: payload }),
};
