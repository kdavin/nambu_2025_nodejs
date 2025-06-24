const { Sequelize, Model, DataTypes, Op, INTEGER } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "posts1.db",
});
//외래키 실습
//1.회원모델 정의
const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 5], //사용자 이름이 2자리부처 5자리까지만 허용
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, //중복 허용 x
      validate: {
        isEmail: true, //이메일 형식이어야지만 들어올 수 있다.
      },
    },
    password: {
      // 단방향 암호화 bcrypt
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 20],
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        max: 150,
      },
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"), //두 글자만 가능//ENUM:미리 정해둔 값만이 들어올 수 있다.
      defaultValue: "active",
    },
  },
  { tableName: "users" }
);

(async () => {
  await sequelize.sync({ force: true });
  const user1 = await User.create({
    username: "홍길동",
    email: "a@example.com",
    password: "1234567",
    age: 20,
  });
  const user2 = await User.create({
    username: "김길동",
    email: "b@example.com",
    password: "1234567",
    age: 30,
  });
  const user3 = await User.create({
    username: "서길동",
    email: "c@example.com",
    password: "1234567",
    age: 40,
  });
  const user14 = await User.create({
    username: "고길동",
    email: "d@example.com",
    password: "1234567",
    age: 50,
  });
  const user5 = await User.create({
    username: "이길동",
    email: "e@example.com",
    password: "1234567",
    age: 60,
  });

  const users1 = await User.findAll({
    where: {
      email: {
        [Op.like]: "%example",
      },
    },
  });
  console.log(
    users1.map((u) => {
      return {
        email: u.email,
        name: u.username,
      };
    })
  );
  const users2 = await User.findAll({
    where: {
      username: {
        [Op.in]: ["홍길동", "박길동"],
      },
    },
  });
  console.log(users2.map((u) => u.username));

  const users3 = await User.findAll({
    where: {
      age: {
        [Op.lt]: 20, //lt less than == '<',gt : greater than '>'
        //lte == '<=' gte == '>='
      },
    },
  });
  console.log(users3);
})();
