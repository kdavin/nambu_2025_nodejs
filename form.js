// module.exports = (sequelize, DataTypes) => {
//   const Form = sequelize.define(
//     "Form",
//     {
//       title: DataTypes.STRING,
//       description: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//     },
//     {
//       tableName: "forms",
//     }
//   );

//   const Question = sequelize.define(
//     "Question",
//     {
//       content: DataTypes.STRING,
//     },
//     {
//       tableName: "questions",
//     }
//   );
//   const Option = sequelize.define(
//     "Option",
//     {
//       content: DataTypes.STRING,
//     },
//     { tableName: "options" }
//   );

//   const Response = sequelize.define(
//     "Response",
//     {
//       content: DataTypes.STRING,
//     },
//     { tableName: "responses" }
//   );
//   const Answer = sequelize.define(
//     "Answer",
//     {
//       description: DataTypes.STRING,
//     },
//     { tableName: "answers" }
//   );

//   Form.associate = function (models) {
//     models.Form.hasMany(models.Question, {
//       foreignKey: "formId",
//       as: "questions",
//     });
//     models.Form.hasMany(models.Response, {
//       foreignKey: "formId",
//       as: "responses",
//     });
//   };
//   Question.associate = function (models) {
//     models.Question.belongsTo(models.Form, {
//       foreignKey: "formId",
//       as: "forms",
//     });
//     Z;
//     models.Question.hasMany(models.Answer, {
//       foreignKey: "questionId",
//       as: "answers",
//     });
//   };
//   Option.associate = function (models) {
//     models.Option.belongsTo(Question, {
//       foreignKey: "questionId",
//       as: "question",
//     });
//     models.Option.hasMany(Answer, {
//       foreignKey: "optionId",
//       as: "answers",
//     });
//   };
//   Response.associate = function (models) {
//     models.Response.belongsTo(Response, {
//       foreignKey: "responsId",
//       as: "response",
//     });
//   };
//   Response.associate = function (models) {
//     models.Response.belongsTo(Response, {
//       foreignKey: "responsId",
//       as: "",
//     });
//   };
// };
