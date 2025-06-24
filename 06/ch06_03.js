//문제 todos
//할일 : task
//할일 설명 : description
//완료 여부 : completed
//우선순위 : priority

//  CREATE TABLE if not exists todos (
//         task VARCHAR(255),
//         description TEXT,
//         completed BOOLEAN DEFAULT 0, --> BOOLEAN
//         priority INTEGER DEFAULT 1
//     )`;

const { Sequelize, Model, DataTypes, Op, INTEGER } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "sample3.db",
});
//문제 1 : Todo 모델, todos 생성
const Todo = sequelize.define(
  "Todo",
  {
    task: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    tableName: "todos",
  }
);
(async () => {
  await sequelize.sync({ force: false });

  //문제 2 : Todo 데이터를 2개 입력
  const todo1 = await Todo.create({
    task: "밥먹기",
    description: "점심 밥을 먹습니다.",
  });
  const todo2 = await Todo.create({
    task: "집가기",
    description: "집에 갑니다.",
  });
  //문제 3 : Todo 데이터를 전체 조회
  const todos = await Todo.findAll();
  console.log(`todos findall =>${JSON.stringify(todos)}`);
  //문제 4 : Todo 아이디가 2번인 항목조회
  const todo21 = await Todo.findByPk(2);
  console.log(`todo21 find2 =>${JSON.stringify(todo21)}`);
  //문제 5 : Todo 아이디가 2번인 항목의 completed를 완료로 바꿈
  await Todo.update(
    {
      completed: 1,
    },
    {
      where: {
        id: 2,
      },
    }
  );
  const todo22 = await Todo.findByPk(2);
  console.log(`todo22 find2 =>${JSON.stringify(todo22)}`);
  //문제 6 : Todo 아이디가 2번인 항목 삭제
  await Todo.destroy({
    where: {
      id: 2,
    },
  });
  const todo23 = await Todo.findByPk(2);
  console.log(`todo23 find2 =>${JSON.stringify(todo23)}`);
})();
