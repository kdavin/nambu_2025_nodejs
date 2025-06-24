const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "sample2.db",
});

//모델 정의
const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "users",
  }
);

(async () => {
  //1. 모델로 테이블을 만드는 코드를 넣어보세용
  await sequelize.sync({ force: false });
  //2. 사용자를 2명 생성해 주세요 각각 결과를 출력해주세요
  const User1 = await User.create({
    username: "김다빈",
    password: "1234",
    email: "kdavin@example.com",
    birthDate: "1998-06-24",
  });
  const User2 = await User.create({
    username: "name",
    password: "2345",
    email: "name@example.com",
    birthDate: "2025-06-24",
  });

  //3. 사용자 전체를 검색해주세요
  const users = await User.findAll();
  console.log(`user findall=>${JSON.stringify(users)}`);
  //4. 사용자 아이디가 2번인 사람만 출력해주세요
  const user1 = await User.findByPk(2);
  console.log(`user findByPk =>${JSON.stringify(user1)}`);
  //5. 사용자 아이디가 2번인 사람의 email을 jihooni@kakao.com으로 바꾸고 출력해보세요
  await User.update(
    {
      email: "jihooni@kakao.com",
    },
    {
      where: {
        id: 2,
      },
    }
  );
  const user2 = await User.findByPk(2);
  console.log(`user2 => update ${JSON.stringify(user2)}`);
  //6. 사용자 아이디가 2번인 사람을 삭제하고, 2번인 사람을 출력해보세요(null)
  await User.destroy({
    where: {
      id: 2,
    },
  });
  const user21 = await User.findByPk(2);
  console.log(`user21 => destroy ${JSON.stringify(user21)}`);
})();
