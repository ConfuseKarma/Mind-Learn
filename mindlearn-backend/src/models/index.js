// models/index.js
import { User } from "./User.js";
import { Theme } from "./Theme.js";
import { Lesson } from "./Lesson.js";
import { Question } from "./Question.js";
import { Option } from "./Option.js";
import { Attempt } from "./Attempt.js";
import { Badge } from "./Badge.js";
import { UserBadge } from "./UserBadge.js";
import { Quiz } from "./Quiz.js";
import { AuditLog } from "./AuditLog.js";

// Theme - Lesson
Theme.hasMany(Lesson, { onDelete: "CASCADE" });
Lesson.belongsTo(Theme);

// Teacher que criou a Lesson
User.hasMany(Lesson, {
  as: "LessonsTaught",
  foreignKey: "TeacherId",
  onDelete: "SET NULL",
});
Lesson.belongsTo(User, { as: "Teacher", foreignKey: "TeacherId" });

// Lesson - Question
Lesson.hasMany(Question, { onDelete: "CASCADE" });
Question.belongsTo(Lesson);

// Quiz - Question
Quiz.hasMany(Question, { onDelete: "CASCADE" });
Question.belongsTo(Quiz);

// Teacher que criou o Quiz
User.hasMany(Quiz, {
  as: "QuizzesAuthored",
  foreignKey: "AuthorId",
  onDelete: "SET NULL",
});
Quiz.belongsTo(User, { as: "Author", foreignKey: "AuthorId" });

// Question - Option
Question.hasMany(Option, { onDelete: "CASCADE" });
Option.belongsTo(Question);

// User - Attempt
User.hasMany(Attempt, { onDelete: "CASCADE" });
Attempt.belongsTo(User);

// Lesson - Attempt
Lesson.hasMany(Attempt, { onDelete: "CASCADE" });
Attempt.belongsTo(Lesson);

// Quiz - Attempt
Quiz.hasMany(Attempt, { onDelete: "CASCADE" });
Attempt.belongsTo(Quiz);

// Badges
User.belongsToMany(Badge, { through: UserBadge });
Badge.belongsToMany(User, { through: UserBadge });

UserBadge.belongsTo(User);
UserBadge.belongsTo(Badge);
User.hasMany(UserBadge, { onDelete: "CASCADE" });
Badge.hasMany(UserBadge, { onDelete: "CASCADE" });

// AuditLog
User.hasMany(AuditLog, { foreignKey: "userId", onDelete: "SET NULL" });
AuditLog.belongsTo(User, { foreignKey: "userId" });

export { User, Theme, Lesson, Question, Option, Attempt, Badge, UserBadge, Quiz, AuditLog };
