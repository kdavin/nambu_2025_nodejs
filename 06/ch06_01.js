const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "sample.db",
});

//모델 생성
const Post = sequelize.define(
  "Post",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
    },
    author: DataTypes.STRING,
  },
  { tableName: "posts" }
);

(async () => {
  //함수는 즉시 실행하는 함수 인데
  //이렇게 하는 이유는 sequelize 는 Promise를 이용해서 작업하는데
  //async/await 를 이용해서 Promise 작업을 하기 위해서 즉시 실행함수 안에서 코딩
  await sequelize.sync({ force: false }); //강제로 테이블을 매번 생성하라

  const post1 = await Post.create({
    title: "오늘은 비가 온대요.",
    content: "퇴근 시작부터 온대요. 저녁에 오길",
    author: "김다빈",
  });
  //console.log(post1);
  //console.log(`post1 created => ${JSON.stringify(post1)}`);
  const post2 = await Post.create({
    title: "오늘 저녁은 머먹지",
    content: "떡볶이와 순대 오뎅이 어떨까요?",
    author: "김다빈",
  });
  const posts = await Post.findAll();
  console.log(`post findAll => ${JSON.stringify(posts)}`);

  //select * from posts where id = 1;
  const post11 = await Post.findByPk(1);
  console.log(`post11 => ${JSON.stringify(post11)}`);

  const post12 = await Post.findOne({
    where: {
      author: "이지훈",
    },
  });
  console.log(`post12 => ${JSON.stringify(post12)}`);

  await Post.update(
    {
      title: "이번주는 ORM을 공부하는 주입니다.",
      content: "이번주는 ORM을 지겹게 공부하는 주입니다.",
    },
    {
      where: {
        id: 1,
      },
    }
  );
  const post13 = await Post.findByPk(1);
  console.log(`post13 => ${JSON.stringify(post13)}`);

  await Post.destroy({
    where: {
      id: 1,
    },
  });
  const post14 = await Post.findByPk(1);
  console.log(`post14 => ${JSON.stringify(post14)}`);
})();
